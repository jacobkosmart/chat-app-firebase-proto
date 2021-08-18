import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  // State
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [attachment, setAttachment] = useState();

  // read DB realtime
  useEffect(() => {
    dbService
      .collection("chats")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatArray);
      });
  }, []);

  // Submit Function
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const chatObj = {
      text: chat,
      createAt: Date.now(),
      creatorID: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("chats").add(chatObj);
    // db 에 등록한 후, 다시 초기화 함
    setChat("");
    setAttachment("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setChat(value);
  };

  // fileUpload function
  const onFileChange = (e) => {
    // es6 의 구조분해 할당 target 안에 files 를 event listener 로 받은 값을 files 에 저장
    const {
      target: { files },
    } = e;
    // 배열의 첫번째 파일만 theFile 로 선언하고 fileReader API 를 통해 이미지 파일 읽기
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  // Delete Photo
  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <div>
      <>
        <form onSubmit={onSubmit}>
          <input
            value={chat}
            onChange={onChange}
            type="text"
            placeholder="what's on your mind?"
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="chat" />
          {attachment && (
            <div>
              <img src={attachment} alt="img" width="50px" height="50px" />
              <button onClick={onClearAttachment}>Clear Photo</button>
            </div>
          )}
        </form>
        <div>
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              chatObj={chat}
              isOwner={chat.creatorID === userObj.uid}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;
