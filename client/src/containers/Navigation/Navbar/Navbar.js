import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { _loadPhoto } from "../../../actions/navbarActions";
import SearchBar from "./Searchbar";
import Category from "./Category";
import { resetNavbar } from "../../../actions/navbarActions";

class Navbar extends Component {

  logOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  resetNavbar = () => {
      document.querySelector('#searchbarinput').value = '';
      this.props.resetNavbar();
  }

  componentDidMount() {
    this.props._loadPhoto(localStorage.getItem('token'));
  }

  render() {
    return (
      <header className="Toolbar">
        <div className="nav-left">
          <Link onClick={this.resetNavbar} to="/feed/deals" className="Logo">
            <div className="font-17 color-deepBlue">
              <img className="navbar_logo" src="https://s3-us-west-1.amazonaws.com/acceptmycrypto/logo.png" alt="logo"/>
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
          <li>
            <Link onClick={this.props.resetNavbar} to="/listdeal">
              { window.location.pathname == "/listdeal"
                ? <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">Create a Deal</h7></i>
                : <i className="fas fa-store fa-lg"> <h7 className="color-deepBlue font-17">Create a Deal</h7></i>
              }
            </Link>
          </li>
          <li>
            <Link onClick={this.props.resetNavbar} to="/feed/deals">
            { window.location.pathname == "/feed/deals"
              ? <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">All Deals</h7></i>
              : <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17">All Deals</h7></i>
            }
            </Link>
          </li>
          <li>
            <div className="dropdown show m-0 p-0">
              <div className="dropdown-toggle picture-toggle m-0 p-0" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={'fas my-1 py-2 px-3 user-icon-navbar ' + this.props.photo.photo}></i>

              </div>

              <div className="dropdown-menu m-0" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <Link className="dropdown-item" to="/settings">Settings</Link>
                <Link className="dropdown-item" to="/" onClick={this.logOut} >Logout</Link>
              </div>
            </div>

          </li>
        </div>
      </header>
    );
  };
}

const mapStateToProps = state => ({
  photo: state.Photo,
  loading: state.Photo.loading,
  error: state.Photo.error
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _loadPhoto, resetNavbar }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
