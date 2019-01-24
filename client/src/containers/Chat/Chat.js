import React, { Component } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import Layout from "../Layout";
import AddMessage from "./AddMessage";
import UserList from "./UserList";
import MessageList from "./MessageList";

class Chat extends Component {

  componentDidMount() {

  }



  render() {
    <div>
      <Layout>
        <UserList />
        <MessageList />
        <AddMessage />
      </Layout>
    </div>
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Chat);
