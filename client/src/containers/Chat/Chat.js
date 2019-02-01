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
import AddMessage from "./AddMessage";
import UserList from "./UserList";
import MessageList from "./MessageList";

class Chat extends Component {
  componentDidMount = async () => {
    //return the param value
    await this.props._isLoggedIn(localStorage.getItem("token"));

    if (await this.props.userLoggedIn) {
      await this.props._loadChatSessions(localStorage.getItem("token"));
      await this.props._loadProfile(localStorage.getItem("token"));
    } else {
      // localStorage.removeItem('token');
      await this.props.history.push("/");
    }
    debugger;
  };

  addMessage = async event => {
    event.preventDefault();
    let chat_session_id = this.props.selected_chat_session[0].chat_session_id;

    await this.props._addChatMessage(
      localStorage.getItem("token"),
      chat_session_id,
      this.props.chatMessageValue
    );

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

    // await this.props._loadChatMessages(
    //   localStorage.getItem("token"),
    //   chat_session_id
    // );
  };

  componentDidUpdate() {
    //scroll to bottom of message list
    if (this.props.selected_chat_session.length > 0) {
      const objDiv = document.getElementById("chat_messages_container");
      objDiv.scrollTop = objDiv.scrollHeight;
    }

  }

  render() {
    const {
      chat_sessions,
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
            {chat_sessions.length > 0 ?
              <UserList
                usersList={chat_sessions}
                _fetchMessagesList={_loadChatMessages}
                userInfo={user_info}
                {...history}
              /> :
              <div id="empty-chat-session">
                <div>
                  <div><i className="far fa-4x fa-envelope"></i></div>
                  <strong>You haven't started any conversation yet.</strong>
                  <br/>
                  <strong> Check out these <Link to={"feed/deals"}>DEALS.</Link></strong>
                </div>
              </div>
            }
            </section>

            <section className="chat-session-right">
            {selected_chat_session.length > 0 ?
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
            </div> :
            <div id="select-chat-prompt">
              <div>
                <div><i class="fas fa-7x fa-comments"></i></div>
                <strong>Select a conversation to start the chat</strong>
              </div>
            </div>
            }
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
  chat_messages: state.Chat.chat_messages,
  chatMessageValue: state.Chat.chatMessageValue,
  chat_session_id: state.Chat.chat_session_id,
  user_info: state.UserInfo.user_info,
  selected_chat_session: state.Chat.selected_chat_session
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
