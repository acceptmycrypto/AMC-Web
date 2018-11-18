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
            <ul className="text-uppercase font-weight-light">
              <li><i className="homepage-icons fab fa-bitcoin"></i>
                Accept Cryptocurrencies You Support
                </li>
              <br></br>

              <li><i className="homepage-icons fas fa-store" aria-hidden="true"></i>
                Get access to new buyers in the crypto market
              </li>
              <br></br>
              <li><i className="homepage-icons fas fa-tag" aria-hidden="true"></i>
              Raise your brand awareness through promotional deals
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
              For User
            </NavLink>
            <NavLink
              to="/vendor"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              For Vendor
            </NavLink>
          </div>

          <div className="lp-vendor">
            <div id="how-it-work">
              <h5>
                How it works
              </h5>
              <div>
                <div className="vendor-list-feaures">
                  <i class="fas fa-star"></i>
                  <p>List a discount item or service for purchase with cryptocurrencies</p>
                </div>
                <div className="vendor-list-feaures">
                  <i class="fas fa-star"></i>
                  <p>Select your choices of cryptos to be accepted</p>
                </div>
                <div className="vendor-list-feaures">
                  <i class="fas fa-star"></i>
                  <p>Receive payment in cryptos or USD</p>
                </div>
              </div>
            </div>

            <form>
              <input
                  type="email"
                  id="vendor_email"
                  className="getListed_input"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
                <button className="getListed_button mr-10">
                  Get Listed
                </button>
              </form>

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


