import React from "react";
import "./MessageList.css";

const MessageList = props => {
  const { messagesList } = props;
  return (
    <div id="chat_messages_container">List of messages
      <div>
      {messagesList.map(msg => {
        return (
          <div className="chat-message">
            {msg.message}
            <small>{msg.date_message_sent}</small>
          </div>
        )
      })}
      </div>
    </div>
  );
};

export default MessageList;