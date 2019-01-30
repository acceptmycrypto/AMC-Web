import React from "react";
import "./UserList.css";

const UserList = props => {
  console.log(props.usersList);
  const {usersList} =  props;
  return (
    <div id="user-session-container">

      {usersList.map((chat_session) => {
        return (
          <div className="user-session">
            <div>
              <i className={'fas py-3 px-4 user-icon-navbar ' + chat_session.buyer_photo}></i>
            </div>
            <div>
              <strong className="buyer-review-name">{chat_session.buyer_name}</strong>
              <div>{chat_session.deal_name}</div>
              <small>{chat_session.chat_session_date}</small>
            </div>
            <div className="deal-item-user-list">
              <img src={chat_session.featured_deal_image} alt="deal_image"/>
            </div>
          </div>
        )
      })}

    </div>
  );
};

export default UserList;
