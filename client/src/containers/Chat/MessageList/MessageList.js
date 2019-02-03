import React from "react";
import "./MessageList.css";
import Timestamp from "react-timestamp";
import { Link } from "react-router-dom";
import { handleLongDescription } from '../../../utils/helper_functions';

const MessageList = props => {
  const { messagesList, chatSessionInfo, userInfo, _deleteChatSession } = props;

  return (
    <div id="chat_messages_container">
      <div id="chat_messages-header">
        <div>
          {chatSessionInfo.length > 0 &&
            chatSessionInfo.map(chatSession => {
              return (
                <div>
                  <div className="deal-item-messages-list">
                    <div className="message-list-profile-header">
                      <div>
                        <i
                          className={
                            userInfo.length > 0 &&
                            chatSession.seller_id === userInfo[0].id
                              ? "fas py-3 px-4 user-icon-navbar " +
                                chatSession.buyer_photo
                              : "fas py-3 px-4 user-icon-navbar " +
                                chatSession.seller_photo
                          }
                        />
                      </div>
                      <div>
                        <strong>
                          {userInfo.length > 0 &&
                          chatSession.seller_id === userInfo[0].id
                            ? chatSession.buyer_name
                            : chatSession.seller_name}
                        </strong>
                      </div>
                    </div>

                    <div className="message-list-deal-header">
                      <div className="message-list-deal-name-price">
                        <Link to={`/feed/deals/${chatSession.deal_id}/${chatSession.deal_name}`} className="message-list-deal-name">
                          {handleLongDescription(chatSession.deal_name, 50, 30)}
                        </Link>
                        <div>
                          Pay in Dollar: ${chatSession.pay_in_dollar.toFixed(2)}
                        </div>
                        <div>
                          Pay in Crypto: ${chatSession.pay_in_crypto.toFixed(2)}
                        </div>
                      </div>
                      <Link to={`/feed/deals/${chatSession.deal_id}/${chatSession.deal_name}`}>
                        <div className="message-list-deal-image">
                          <img
                            src={chatSession.featured_deal_image}
                            alt="deal-image"
                          />
                        </div>
                      </Link>

                      <div onClick={_deleteChatSession} className="trash-icon">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <hr />
      </div>
      <div id="chat-messages">
        {messagesList.length > 0 ?
          messagesList.map(msg => {
            return (
              <div
                className={
                  msg.message_owner_id === userInfo[0].id
                    ? "chat-message user-message-right"
                    : "chat-message non-owner-message-left"
                }
              >
                <div>{msg.message}</div>
                <small>
                  <Timestamp time={msg.date_message_sent} precision={1} />
                </small>
              </div>
            );
          }) :
          chatSessionInfo[0].seller_id === userInfo[0].id ?
          <div className="chat-message non-owner-message-left">Buyer has shown interest in your listing, start a conversation with the buyer.</div> :
          <div className="chat-message non-owner-message-left">Ask the seller something</div>
        }
      </div>
    </div>
  );
};

export default MessageList;
