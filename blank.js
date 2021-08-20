import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "../fbase";

const Chat = ({ chatObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this chat?");
    if (ok) {
      await dbService.doc(`chats/${chatObj.id}`).delete();
      await storageService.refFromURL(chatObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`chats/${chatObj.id}`).update({
      text: newChat,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
  };

  return (
    <div className="chat">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container chatEdit">
            <input
              type="text"
              placeholder="Edit your chat"
              value={newChat}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update chat" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{chatObj.text}</h4>
          {chatObj.attachmentUrl && (
            <img src={chatObj.attachmentUrl} alt="img" />
          )}
          {isOwner && (
            <div class="chat__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Chat;
