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


class Navbar extends Component {

  logOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }


  componentDidMount = async() => {

    await this.props._isLoggedIn(localStorage.getItem('token'));
    if (this.props.userLoggedIn) {
      this.props._loadPhoto(localStorage.getItem('token'));
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

 

  render() {
    console.log("user", this.props.userLoggedIn);
    return (
      <header className="Toolbar">
        <div className="nav-left">
          <Link onClick={this.resetNavbar} to="/" className="Logo">
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
            ? <li>
              <Link onClick={this.props.resetNavbar} to="/listdeal">
                {window.location.pathname == "/listdeal"
                  ? <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">Create a Deal</h7></i>
                  : <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17">Create a Deal</h7></i>
                }
              </Link>
            </li>
            : <li>
                <Link onClick={this.props.resetNavbar} to="/SignIn">
                  {window.location.pathname == "/SignIn"
                    ? <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">Create a Deal</h7></i>
                    : <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17">Create a Deal</h7></i>
                  }
                </Link>
            </li>

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
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _isLoggedIn, _loadPhoto, resetNavbar }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
