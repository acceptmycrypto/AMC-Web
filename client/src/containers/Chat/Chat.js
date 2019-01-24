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

  componentDidMount = async () => {
    //return the param value
    await this.props._isLoggedIn(localStorage.getItem('token'));

    if (await this.props.userLoggedIn) {
      console.log("user is login")
    }else{
        // localStorage.removeItem('token');
        await this.props.history.push('/');
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

const mapStateToProps = state => ({
  userLoggedIn: state.LoggedIn.userLoggedIn,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _isLoggedIn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Chat);
