import React from "react";
import "./UserList.css";
import Timestamp from 'react-timestamp';

const UserList = props => {
  console.log("userlist", props);
  const { usersList, _fetchMessagesList, userInfo } = props;
  return (
    <div id="user-session-wrapper">
      <div id="user-session-header"><i onClick={props.goBack} class="fas fa-lg fa-arrow-left"></i>  <hr/> </div>
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
          <div className="user-session-left">
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
              <strong>
                {userInfo.length > 0 &&
                chat_session.seller_id === userInfo[0].id
                  ? chat_session.buyer_name
                  : chat_session.seller_name}
              </strong>
              <div>{chat_session.deal_name}</div>
              <small><Timestamp time={chat_session.chat_session_date} precision={1} /></small>
            </div>
          </div>
            <div className="deal-item-user-list">
              <img src={chat_session.featured_deal_image} alt="deal_image" />
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default UserList;
