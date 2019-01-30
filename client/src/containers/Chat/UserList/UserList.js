import React from "react";
import "./UserList.css";

const UserList = props => {
  console.log(props.usersList);
  const { usersList, _fetchMessagesList } = props;
  return (
    <div id="user-session-container">
      {usersList.map(chat_session => {
        return (
          <div
            onClick={() =>
              _fetchMessagesList(
                localStorage.getItem("token"),
                chat_session.chat_session_id
              )
            }
            className="user-session"
          >
            <div>
              <i
                className={
                  "fas py-3 px-4 user-icon-navbar " + chat_session.buyer_photo
                }
              />
            </div>
            <div>
              <strong className="buyer-review-name">
                {chat_session.buyer_name}
              </strong>
              <div>{chat_session.deal_name}</div>
              <small>{chat_session.chat_session_date}</small>
            </div>
            <div className="deal-item-user-list">
              <img src={chat_session.featured_deal_image} alt="deal_image" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
