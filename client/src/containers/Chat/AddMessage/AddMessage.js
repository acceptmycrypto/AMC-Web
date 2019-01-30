import React from "react";
import "./AddMessage.css";

const AddMessage = props => {
  const {
    handleChatMessage,
    _createMessage,
    message
  } = props;
  console.log("add message", props);
  return (
    <form
      id="add-message-form"
      onSubmit={_createMessage}
    >
      <input
        id="chat-message-input"
        type="text"
        onKeyPress={e => {
          if (e.key === "Enter") {
            return _createMessage
          }
        }}
        onChange={handleChatMessage}
        placeholder="Type your message here"
        value={message}
        required
        autocomplete="off"
      />
      <button>Send</button>
    </form>
  );
};

export default AddMessage;
