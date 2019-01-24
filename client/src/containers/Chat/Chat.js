import React, { Component } from "react";
import "./Chat.css";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _isLoggedIn } from '../../actions/loggedInActions';
import Layout from "../Layout";
import AddMessage from "./AddMessage";
import UserList from "./UserList";
import MessageList from "./MessageList";

class Chat extends Component {
  componentDidMount() {
    this.props._isLoggedIn(localStorage.getItem('token'));

    if (this.props.userLoggedIn) {
      // this.props._loadDeals(localStorage.getItem('token'));
      console.log("user is login")
    }else{
        // localStorage.removeItem('token');
        this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Layout>
          <UserList />
          <MessageList />
          <AddMessage />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _isLoggedIn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Chat);
