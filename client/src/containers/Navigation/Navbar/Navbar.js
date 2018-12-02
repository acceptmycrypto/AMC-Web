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
            <div className="font-17 color-deepBlue">
              <img className="navbar_logo" src="https://s3-us-west-1.amazonaws.com/acceptmycrypto/logo.png" alt="logo"/>
            </div>
          </Link>
          {window.location.pathname == "/feed/deals" ?
            <div className="dropdown show mx-4">
              <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#">Electronics</a>
                <a className="dropdown-item" href="#">Toys</a>
                <a className="dropdown-item" href="#">Donations</a>
              </div>
            </div> : null
          }

          { window.location.pathname == "/feed/deals"
              ?  <SearchBar />
              : null
            }

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
            { window.location.pathname == "/feed/deals"
              ? <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17 teal-underline">Deals</h7></i>
              : <i className="fas fa-dollar-sign fa-lg"> <h7 className="color-deepBlue font-17">Deals</h7></i>
            }
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
