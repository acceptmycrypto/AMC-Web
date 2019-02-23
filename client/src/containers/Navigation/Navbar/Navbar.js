import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { _loadPhoto } from "../../../actions/navbarActions";
import SearchBar from "./Searchbar";
import Category from "./Category";
import { resetNavbar } from "../../../actions/navbarActions";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { _loadChatSessions } from "../../../actions/chatActions";
import {resetDealitemState} from "../../../actions/dealItemActions"



class Navbar extends Component {

  logOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }


  componentDidMount = async() => {

    await this.props._isLoggedIn(localStorage.getItem('token'));
    if (this.props.userLoggedIn) {
      this.props._loadPhoto(localStorage.getItem('token'));
      this.props._loadChatSessions(localStorage.getItem("token"));
    }
    // else {

    // }
    // let isLoggedIn = await this.props._isLoggedIn(localStorage.getItem('token'));
    // if(isLoggedIn.message == "WrongToken"){

    // }
    //

    // console.log(this.props.photo.photo);

  }

  resetNavbar = () => {
      document.querySelector('#searchbarinput').value = '';
      this.props.resetNavbar();
  }

  handleMessageNotification = () => {
    if (this.props.chat_sessions.length > 0) {
      for (let i in this.props.chat_sessions) {
        if (this.props.chat_sessions[i].message_read == 0) {
          //there's at lease one message that has not read
          return true;
        } else {
          //all messages have read
          return false;
        }
      }
    }

  }

  render() {
    return (
      <header className="Toolbar">
        <div className="nav-left">
          <Link onClick={() => {this.resetNavbar(); this.props.resetDealitemState();}} to="/" className="Logo">
            <div className="font-17 color-deepBlue">
              <img className="navbar_logo" src="https://s3-us-west-1.amazonaws.com/acceptmycrypto/logo.png" alt="logo" />
              <span className="ml-2">
                AcceptMyCrypto
              </span>
            </div>
          </Link>
            <SearchBar />
            <Category/>

          <div className="Feed">
            {/* <li>
              <Link to="/feed/deals">
                <i className="fas fa-dollar-sign" /> Matched Deals
            </Link>
            </li> */}
          </div>
        </div>
        <div className="Nav d-flex flex-row align-items-center">
        {this.props.userLoggedIn
            ?
            <div>
              <li>
                <Link onClick={() => {this.resetNavbar(); this.props.resetDealitemState(); }} to="/listdeal">
                  {window.location.pathname == "/listdeal"
                    ? <i className="fas fa-store fa-lg"> <span className="color-deepBlue font-17 teal-underline font-family-roboto">Create a Deal</span></i>
                    : <i className="fas fa-store fa-lg"> <span className="color-deepBlue font-17 font-family-roboto">Create a Deal</span></i>
                  }
                </Link>
              </li>
              <li>
                <Link onClick={() => {this.resetNavbar(); this.props.resetDealitemState();}} to="/chat">
                  {this.handleMessageNotification() && <div className="message-notification"></div>}
                  <i className="fas fa-comments fa-lg"></i>
                </Link>
              </li>
            </div>

            : <div>
                <li>
                  <Link onClick={() => {this.resetNavbar(); this.props.resetDealitemState();}} to="/listdeal">
                    {window.location.pathname == "/listdeal"
                      ? <i className="fas fa-store fa-lg"> <span className="color-deepBlue font-17 teal-underline font-family-roboto">Create a Deal</span></i>
                      : <i className="fas fa-store fa-lg"> <span className="color-deepBlue font-17 font-family-roboto">Create a Deal</span></i>
                    }
                  </Link>
                </li>
            </div>

        }
          {/* <li>

            <Link onClick={this.props.resetNavbar} to="/feed/deals">
              {window.location.pathname == "/feed/deals"
                ? <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">All Deals</h7></i>
                : <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17">All Deals</h7></i>
              }
            </Link>
          </li> */}
          <li>
            {this.props.photo.photo
              ? <div className="dropdown show m-0 p-0">
                <div className="dropdown-toggle picture-toggle m-0 p-0" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className={'fas my-1 py-2 px-3 user-icon-navbar ' + this.props.photo.photo}></i>
                </div>
                <div className="dropdown-menu m-0" aria-labelledby="dropdownMenuLink">
                  <Link className="dropdown-item" to="/profile">Profile</Link>
                  <Link className="dropdown-item" to="/settings">Settings</Link>
                  <Link className="dropdown-item" to="/" onClick={this.logOut} >Logout</Link>
                </div>
              </div>
              : <div className="d-flex flex-row align-items-center">
                <Link to="/SignIn"><p className="navbar-login" id="nav-link-sign-in">Sign In</p></Link>
                <div><p className="clear-text-decoration" id="nav-vertical-divider"> | </p></div>
                <Link to="/SignUp"><p className="navbar-login" id="nav-link-sign-up">Sign Up</p> </Link>
              </div>
            }
          </li>
        </div>
      </header>
    );
  };
}

const mapStateToProps = state => ({
  photo: state.Photo,
  loading: state.Photo.loading,
  error: state.Photo.error,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  chat_sessions: state.Chat.chat_sessions
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _isLoggedIn, _loadPhoto, resetNavbar, _loadChatSessions, resetDealitemState }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
