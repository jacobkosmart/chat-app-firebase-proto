import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import ChatMaker from "../components/ChatMaker";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [chats, setChats] = useState([]);
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
  return (
    <div className="container">
      <ChatMaker userObj={userObj} />
      <div style={{ marginTop: 20 }}>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={chat.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
