import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";
import "./NavbarMobile.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { _loadPhoto } from "../../../actions/navbarActions";
import SearchBar from "./Searchbar";
import Category from "./Category";
import {
  resetNavbar,
  openSideBarOnMobile,
  closeSideBarOnMobile
} from "../../../actions/navbarActions";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { _loadChatSessions } from "../../../actions/chatActions";
import { resetDealitemState } from "../../../actions/dealItemActions";

class Navbar extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.history.go("/");
  };

  componentDidMount = async () => {
    await this.props._isLoggedIn(localStorage.getItem("token"));
    if (this.props.userLoggedIn) {
      this.props._loadPhoto(localStorage.getItem("token"));
      this.props._loadChatSessions(localStorage.getItem("token"));
    }
  };

  resetNavbar = () => {
    document.querySelector("#searchbarinput").value = "";
    this.props.resetNavbar();
  };

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
  };

  render() {
    const {
      sideBarOpened,
      openSideBarOnMobile,
      closeSideBarOnMobile
    } = this.props;

    return (
      <header
        id={sideBarOpened ? "mob-nav-sidebar-gradient" : undefined}
        className="Toolbar mob-Toolbar"
      >
        <div className="nav-left mob-nav-left">
          <div className="Logo mob-nav-header">
            <Link
              className={sideBarOpened ? "mob-nav-header-invisible" : undefined}
              onClick={() => {
                this.resetNavbar();
                this.props.resetDealitemState();
              }}
              to="/"
            >
              <div className="font-17 color-deepBlue mob-nav-sidebar-lightBlue">
                <img
                  className="navbar_logo"
                  src="https://s3-us-west-1.amazonaws.com/acceptmycrypto/logo.png"
                  alt="logo"
                />
                <span className="ml-2">AcceptMyCrypto</span>
                <small className="beta">beta</small>
              </div>
            </Link>
            {sideBarOpened ? (
              <div onClick={closeSideBarOnMobile} className="mob-nav-bar">
                <i class="fas fa-times fa-2x" />
              </div>
            ) : (
              <div onClick={openSideBarOnMobile} className="mob-nav-bar">
                <i className="fas fa-bars fa-2x" />
              </div>
            )}
          </div>
          <div className="mob-nav-searchBar">
            <SearchBar />
          </div>
          <div className="mob-nav-category">
            <Category />
          </div>
        </div>

        <div className="Nav d-flex flex-row align-items-center">
          {this.props.userLoggedIn ? (
            <div>
              <li
                id={
                  this.props.location.pathname === "/" && !sideBarOpened
                    ? "mob-nav-createDeal"
                    : "mob-create-deal-hidden"
                }
              >
                <Link
                  onClick={() => {
                    this.resetNavbar();
                    this.props.resetDealitemState();
                  }}
                  to="/listdeal"
                >
                  {window.location.pathname == "/listdeal" ? (
                    <i className="fas fa-store fa-lg">
                      {" "}
                      <span className="color-deepBlue font-17 teal-underline font-family-roboto">
                        Create a Deal
                      </span>
                    </i>
                  ) : (
                    <i className="fas fa-store fa-lg">
                      {" "}
                      <span className="color-deepBlue font-17 font-family-roboto">
                        Create a Deal
                      </span>
                    </i>
                  )}
                </Link>
              </li>
              <li className="mob-nav-chat">
                <Link
                  onClick={() => {
                    this.resetNavbar();
                    this.props.resetDealitemState();
                  }}
                  to="/chat"
                >
                  {this.handleMessageNotification() && (
                    <div className="message-notification" />
                  )}
                  <i className="fas fa-comments fa-lg" />
                </Link>
              </li>
            </div>
          ) : (
            <div>
              <li
                id={
                  this.props.location.pathname === "/" && !sideBarOpened
                    ? "mob-nav-createDeal"
                    : "mob-create-deal-hidden"
                }
              >
                <Link
                  onClick={() => {
                    this.resetNavbar();
                    this.props.resetDealitemState();
                  }}
                  to="/listdeal"
                >
                  {window.location.pathname == "/listdeal" ? (
                    <i className="fas fa-store fa-lg">
                      {" "}
                      <span className="color-deepBlue font-17 teal-underline font-family-roboto">
                        Create a Deal
                      </span>
                    </i>
                  ) : (
                    <i className="fas fa-store fa-lg">
                      {" "}
                      <span className="color-deepBlue font-17 font-family-roboto">
                        Create a Deal
                      </span>
                    </i>
                  )}
                </Link>
              </li>
            </div>
          )}
          <li>
            {this.props.photo.photo ? (
              <div
                className={
                  sideBarOpened
                    ? "mob-nav-photo-visible"
                    : "dropdown show m-0 p-0 mob-nav-photo-hidden"
                }
              >
                <div
                  className="dropdown-toggle picture-toggle m-0 p-0"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className={
                      "fas my-1 py-2 px-3 user-icon-navbar " +
                      this.props.photo.photo
                    }
                  />
                </div>
                <div
                  className="dropdown-menu m-0"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                  <Link className="dropdown-item" to="/" onClick={this.logOut}>
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className={
                  sideBarOpened
                    ? "mob-nav-sidebar-signIn"
                    : "d-flex flex-row align-items-center mob-nav-signIn"
                }
              >
                <Link to="/SignIn">
                  <p className="navbar-login" id="nav-link-sign-in">
                    Sign In
                  </p>
                </Link>
                <div>
                  <p
                    className="clear-text-decoration"
                    id="nav-vertical-divider"
                  />
                </div>
                <Link to="/SignUp">
                  <p className="navbar-login" id="nav-link-sign-up">
                    Sign Up
                  </p>
                </Link>
              </div>
            )}
          </li>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  _isLoggedIn: PropTypes.func,
  _loadPhoto: PropTypes.func,
  _loadChatSessions: PropTypes.func,
  chat_sessions: PropTypes.arrayOf(
    PropTypes.shape({
      message_read: PropTypes.number
    })
  ),
  sideBarOpened: PropTypes.bool,
  openSideBarOnMobile: PropTypes.func,
  closeSideBarOnMobile: PropTypes.func,
  resetDealitemState: PropTypes.func,
  photo: PropTypes.shape({
    photo: PropTypes.string
  })
};

const mapStateToProps = state => ({
  photo: state.Photo,
  loading: state.Photo.loading,
  error: state.Photo.error,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  chat_sessions: state.Chat.chat_sessions,
  sideBarOpened: state.Category.sideBarOpened
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _isLoggedIn,
      _loadPhoto,
      resetNavbar,
      _loadChatSessions,
      resetDealitemState,
      openSideBarOnMobile,
      closeSideBarOnMobile
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Navbar)
);
