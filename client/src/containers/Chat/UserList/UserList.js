import React from "react";
import "./UserList.css";

const UserList = props => {
  console.log(props.usersList);
  const { usersList, _fetchMessagesList, userInfo } = props;
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
                  userInfo.length > 0 &&
                  chat_session.seller_id === userInfo[0].id
                    ? "fas py-3 px-4 user-icon-navbar " +
                      chat_session.buyer_photo
                    : "fas py-3 px-4 user-icon-navbar " +
                      chat_session.seller_photo
                }
              />
            </div>
            <div>
              <strong className="buyer-review-name">
                {userInfo.length > 0 &&
                chat_session.seller_id === userInfo[0].id
                  ? chat_session.buyer_name
                  : chat_session.seller_name}
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
