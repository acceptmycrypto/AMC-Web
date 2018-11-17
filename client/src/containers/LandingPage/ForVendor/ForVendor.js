import React, { Component } from 'react';
import './ForVendor.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";

class ForVendor extends Component {


  render() {
    return (
      <div className="App">
        <div className="App__Aside">
          <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
          <h1 className="text-uppercase mb-0 ">AcceptMyCrypto</h1>
          <hr className="star-light"></hr>
          <h2 className="font-weight-light mb-0">
            <ul className="">
              <br></br>
              <li><i className="homepage-icons fas fa-dollar-sign"></i>
                Grab Deals for Purchase with Cryptocurrency
                </li>
              <br></br>

              <li><i className="homepage-icons fa fa-user" aria-hidden="true"></i>
                Find Friends with Matching Currencies
              </li>
              <br></br>
              <li><i className="homepage-icons fa fa-users" aria-hidden="true"></i>
                Engage with Your Crypto Community
              </li>
            </ul>
          </h2>
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink
              exact
              to="/"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              ForUser
            </NavLink>
            <NavLink
              to="/vendor"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              ForVendor
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ForVendor);


