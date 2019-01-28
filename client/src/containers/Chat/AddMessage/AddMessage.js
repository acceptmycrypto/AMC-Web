import React from "react";
import "./AddMessage.css";

const AddMessage = props => {
  return (
    <div>
      <input type="text"
      onKeyPress={(e) => {
        if(e.key === "Enter") {
          this.handleMessageSent();
        }
      }}
      />
    </div>
  );
};

export default AddMessage;
