import React, { Component } from 'react';
import './ForVendor.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { _LandingVendorService } from "../../../services/LandingVendorService";
import Footer from '../../../components/Layout/Footer';

class ForVendor extends Component {

  handleGetListed = (event) => {
    event.preventDefault();

    let vendor_email = document.getElementById('vendor_email').value;

    return _LandingVendorService(vendor_email).then(res => {
      document.getElementById("vendor-submit-success").innerHTML = res.message;
      document.getElementById("vendor_email").value = "";
    });
  }

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
                <span>Accept Cryptocurrencies You Support</span>
                </li>
              <br></br>

              <li><i className="homepage-icons fas fa-store" aria-hidden="true"></i>
              <span>UNCOVER NEW BUYERS POTENTIAL IN THE CRYPTO MARKET</span>
              </li>
              <br></br>
              <li><i className="homepage-icons fas fa-tag" aria-hidden="true"></i>
              <span>Raise brand awareness through promotional deals</span>
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
                  <i className="fas fa-star"></i>
                  <p>List a discount item or service for purchase with cryptocurrencies</p>
                </div>
                <div className="vendor-list-feaures">
                  <i className="fas fa-star"></i>
                  <p>Select your choices of cryptos to be accepted</p>
                </div>
                <div className="vendor-list-feaures">
                  <i className="fas fa-star"></i>
                  <p>Receive payment in cryptos or USD</p>
                </div>
              </div>
            </div>

            <form onSubmit={this.handleGetListed}>
              <input
                  type="email"
                  id="vendor_email"
                  className="getListed_input"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
                <button className="getListed_button mr-20">
                  Get Listed
                </button>
            </form>

            <div id="vendor-submit-success"></div>
            
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default ForVendor;
