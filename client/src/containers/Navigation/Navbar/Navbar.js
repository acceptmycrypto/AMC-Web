import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification";
import { connect } from "react-redux";
import { _loadPhoto } from "../../../actions/navbarActions";
import SearchBar from "./Searchbar";

class Navbar extends Component {

  logOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.dispatch(_loadPhoto(localStorage.getItem('token')));
  }

  render() {
    return (
      <header className="Toolbar">
        <div className="nav-left">
          <Link to="/feed/deals" className="Logo">
            <div className="font-17 color-deepBlue">AcceptMyCrypto</div>
        </Link>
          {/* <div className="Search d-flex flex-row align-items-center">
            <i class="fas fa-search fa-lg mx-2"></i>
            <input type="text" placeholder="Search" />
          </div> */}
        <SearchBar />
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
            <Link to="/feed/deals">
              <i className="fas fa-dollar-sign fa-lg" /> <h7 className="color-deepBlue font-17">Matched Deals</h7>
            </Link>
          </li>
          <li>
            {/* <Notification /> */}
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


export default connect(mapStateToProps)(Navbar);
