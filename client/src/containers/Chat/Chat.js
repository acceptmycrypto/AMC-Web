import React, { Component } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { _isLoggedIn } from "../../actions/loggedInActions";
import {
  _loadChatSessions,
  _loadChatMessages,
  _addChatMessage,
  onMessageEdit
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
      await this.props._loadProfile(localStorage.getItem('token'));
    } else {
      // localStorage.removeItem('token');
      await this.props.history.push("/");
    }
  };

  addMessage = async event => {
    event.preventDefault();
    let chat_session_id = this.props.chat_messages[0].chat_session_id;

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

  componentDidUpdate() {
    //scroll to bottom of message list
    const objDiv = document.getElementById("chat_messages_container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const {
      chat_sessions,
      chat_messages,
      _loadChatMessages,
      onMessageEdit,
      chatMessageValue,
      user_info
    } = this.props;

    return (
      <div>
        <Layout>
          <div className="chat-sessions">
            <section className="chat-session-left">
              <UserList
                usersList={chat_sessions}
                _fetchMessagesList={_loadChatMessages}
                userInfo={user_info}
              />
            </section>

            <section className="chat-session-right">
              <div>
                <MessageList messagesList={chat_messages} />
              </div>
              <hr />
              <div>
                <AddMessage
                  _createMessage={this.addMessage}
                  handleChatMessage={onMessageEdit}
                  message={chatMessageValue}
                />
              </div>
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
  user_info: state.UserInfo.user_info
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _isLoggedIn,
      _loadChatSessions,
      _loadChatMessages,
      _addChatMessage,
      onMessageEdit,
      _loadProfile
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Chat);
