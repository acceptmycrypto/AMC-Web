import React, { Component } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { _isLoggedIn } from "../../actions/loggedInActions";
import { Link } from "react-router-dom";
import {
  _loadChatSessions,
  _loadChatMessages,
  _addChatMessage,
  onMessageEdit,
  _deleteChatSession
} from "../../actions/chatActions";
import { _loadProfile } from "../../actions/userLoadActions";
import Layout from "../Layout";
import AddMessage from "../../components/Chat/AddMessage";
import UserList from "../../components/Chat/UserList";
import MessageList from "../../components/Chat/MessageList";

class Chat extends Component {
  componentDidMount = async () => {
    //return the param value
    await this.props._isLoggedIn(localStorage.getItem("token"));

    if (await this.props.userLoggedIn) {
      await this.props._loadChatSessions(localStorage.getItem("token"));
      await this.props._loadProfile(localStorage.getItem("token"));
    } else {
      if (this.props.dealItem) {
        await this.props.history.push(
          `/SignIn?redirect=feed/deals/${this.props.dealItem.deal_id}/${
            this.props.dealItem.deal_name
          }`
        );
      } else {
        this.props.history.push("/");
      }
    }
  };

  addMessage = async event => {
    event.preventDefault();
    let chat_session_id = this.props.selected_chat_session[0].chat_session_id;
    let buyer_id = this.props.selected_chat_session[0].buyer_id;
    let seller_id = this.props.selected_chat_session[0].seller_id;
    let user_id = this.props.user_info[0].id;
    let recipientEmailUser_id;

    if (buyer_id === user_id) {
      recipientEmailUser_id = seller_id;
    } else {
      recipientEmailUser_id = buyer_id;
    }

    //add message to the database
    await this.props._addChatMessage(
      localStorage.getItem("token"),
      chat_session_id,
      this.props.chatMessageValue,
      recipientEmailUser_id
    );

    //load the messages
    await this.props._loadChatMessages(
      localStorage.getItem("token"),
      chat_session_id
    );
  };

  deleteChatSession = async event => {
    let chat_session_id = this.props.selected_chat_session[0].chat_session_id;

    await this.props._deleteChatSession(
      localStorage.getItem("token"),
      chat_session_id
    );

    await this.props._loadChatSessions(localStorage.getItem("token"));
  };

  componentDidUpdate() {
    //scroll to bottom of message list
    if (
      this.props.chat_sessions.length > 0 &&
      this.props.selected_chat_session.length > 0
    ) {
      const objDiv = document.getElementById("chat-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  render() {
    const {
      chat_sessions,
      _loadChatSessions,
      chat_messages,
      _loadChatMessages,
      onMessageEdit,
      chatMessageValue,
      user_info,
      history,
      selected_chat_session
    } = this.props;

    return (
      <div>
        <Layout>
          <div className="chat-sessions">
            <section className="chat-session-left">
              {chat_sessions.length > 0 ? (
                <UserList
                  _loadUsersList={_loadChatSessions}
                  usersList={chat_sessions}
                  _fetchMessagesList={_loadChatMessages}
                  userInfo={user_info}
                  chatSessionInfo={selected_chat_session}
                  {...history}
                />
              ) : (
                <div id="empty-chat-session">
                  <div>
                    <div>
                      <i className="far fa-4x fa-envelope" />
                    </div>
                    <strong>You haven't started any conversation yet.</strong>
                    <br />
                    <strong>
                      {" "}
                      Check out these{" "}
                      <Link style={{ textDecoration: "none" }} to={"/"}>
                        DEALS.
                      </Link>
                    </strong>
                  </div>
                </div>
              )}
            </section>

            <section className="chat-session-right">
              {chat_sessions.length > 0 && selected_chat_session.length > 0 ? (
                <div>
                  <div>
                    <MessageList
                      messagesList={chat_messages}
                      chatSessionInfo={selected_chat_session}
                      userInfo={user_info}
                      _deleteChatSession={this.deleteChatSession}
                    />
                  </div>
                  <div>
                    <hr />
                    <div>
                      <AddMessage
                        _createMessage={this.addMessage}
                        handleChatMessage={onMessageEdit}
                        message={chatMessageValue}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div id="select-chat-prompt">
                  <div>
                    <div>
                      <i className="fas fa-7x fa-comments" />
                    </div>
                    <strong>Select a conversation to start the chat</strong>
                  </div>
                </div>
              )}
            </section>
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLoggedIn: state.LoggedIn.userLoggedIn,
  chat_sessions: state.Chat.chat_sessions,
  chat_sessions_loading: state.Chat.chat_sessions_loading,
  chat_messages: state.Chat.chat_messages,
  chatMessageValue: state.Chat.chatMessageValue,
  chat_session_id: state.Chat.chat_session_id,
  user_info: state.UserInfo.user_info,
  selected_chat_session: state.Chat.selected_chat_session,
  dealItem: state.DealItem.dealItem
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _isLoggedIn,
      _loadChatSessions,
      _loadChatMessages,
      _addChatMessage,
      onMessageEdit,
      _loadProfile,
      _deleteChatSession
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Chat);
