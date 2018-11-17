import React, { Component } from 'react';
import './ForUser.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";

class ForUser extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__Aside">
          <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
          <h1 className="text-uppercase mb-0">AcceptMyCrypto</h1>
          <hr className="star-light"></hr>
          <h2>
            <ul className="text-uppercase font-weight-light" >
              <li><i className="homepage-icons fab fa-bitcoin"></i>
                Spend Cryptocurrencies You Support
              </li>
              <br/>
              <li><i className="homepage-icons fas fa-dollar-sign" aria-hidden="true"></i>
                Find Deals from a variety of matching Vendors
              </li>
              <br/>
              <li><i className="homepage-icons fas fa-chart-area" aria-hidden="true"></i>
                Read Market Trend based on crypto purchase transactions
              </li>
            </ul>
          </h2>
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">For User</NavLink>
            <NavLink exact to="/vendor" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">For Vendor</NavLink>
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


export default connect(mapStateToProps, matchDispatchToProps)(ForUser);
