import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Chat = ({ chatObj, isOwner }) => {
  // State
  const [editing, setEditing] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);

  // Delete function
  const onDeleteClick = async () => {
    const check = window.confirm("정말로 메세지를 삭제하시겠습니까?");
    if (check) {
      // delete chat
      await dbService.doc(`chats/${chatObj.id}`).delete();
      // delete uploadFile
      await storageService.refFromURL(chatObj.attachmentUrl).delete();
    }
  };

  // Edit function
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`chats/${chatObj.id}`).update({
      text: newChat,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewChat(value);
  };

  return (
    <>
      <div>
        {editing ? (
          <>
            {" "}
            {isOwner && (
              <>
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    placeholder="Edit your Chat"
                    value={newChat}
                    required
                    onChange={onChange}
                  />
                  <input type="submit" value="Update Chat" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
              </>
            )}
          </>
        ) : (
          <>
            <h4>{chatObj.text}</h4>
            {chatObj.attachmentUrl && (
              <img
                src={chatObj.attachmentUrl}
                width="50px"
                height="50px"
                alt="img"
              />
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Chat</button>
                <button onClick={toggleEditing}>Edit Chat</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
