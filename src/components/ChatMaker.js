import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatMaker = ({ userObj }) => {
  // State
  const [chat, setChat] = useState("");
  const [attachment, setAttachment] = useState("");

  // Submit Function
  const onSubmit = async (e) => {
    if (chat === "") {
      return;
    }
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

    // 사용자 마다 collection 만들기 예시
    // await dbService.collection(`${userObj.uid}`).add(chatObj);
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
    setAttachment("");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="makerForm">
        <div className="makerInput__container">
          <input
            value={chat}
            onChange={onChange}
            type="text"
            placeholder="당신의 생각을 적어주세요"
            maxLength={120}
            className="makerInput__input"
          />
          <input type="submit" value="&rarr;" className="makerInput__arrow" />
        </div>
        <label for="attach-file" className="makerInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="makerForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
              alt="img"
            />
            <div onClick={onClearAttachment} className="makerForm__clear">
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ChatMaker;
