import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification";
import { connect } from "react-redux";
import { _loadPhoto } from "../../../actions/navbarActions";


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
            AcceptMyCrypto
        </Link>
          <div className="Search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="Feed">
            {/* <li>
              <Link to="/feed/deals">
                <i className="fas fa-dollar-sign" /> Matched Deals
            </Link>
            </li> */}
          </div>
        </div>
        <div className="Nav">
          <li>
            <Link to="/feed/deals">
              <i className="fas fa-dollar-sign" /> Matched Deals
            </Link>
          </li>
          <li>
            <Notification />
          </li>
          <li>
            <div className="dropdown show m-0 p-0">
              <div className="dropdown-toggle picture-toggle m-0 p-0" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className={'fas mt-1 pt-1 px-2 user-icon-navbar ' + this.props.photo.photo}></i>

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
