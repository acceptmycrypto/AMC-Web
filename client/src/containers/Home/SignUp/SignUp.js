import "./SignUp.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { _signUp } from "../../../services/AuthService";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import { handleDropdownChange } from "../../../actions/signUpActions";


class SignUp extends Component {
  constructor() {
    super();

  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props._loadCryptocurrencies();
  }



  //function to handle when user clicks submit button to register
  handleSubmit(e) {
    e.preventDefault();


    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.props.selectedCryptos;
    console.log(this.props);
    console.log("crypto to submit:", cryptoProfile);
    let hasAgreed = e.target.children[4].children[0].children[0].checked;

    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (!username || !email || !password) {
      alert("Please enter in the required field!");
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log("message sent from server if success: ", res);
        //TODO
        //prompt users to check their email
      });
    }
  }



  render() {

    const { error, loading, cryptoOptions } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }


    if (localStorage.getItem('token')) {
      this.props.history.push('/feed/deals');
    }
    return (
      <div className="App">
        <div className="App__Aside">
          <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
          <h1 className="text-uppercase mb-0">Accept My Crypto</h1>
          <hr className="star-light"></hr>
          <h2 className="font-weight-light mb-0">
            <ul>
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
              Sign In
            </NavLink>
            <NavLink
              to="/SignUp"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign Up
            </NavLink>
          </div>
          <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="username"
                  id="username"
                  className="FormField__Input"
                  placeholder="Enter your desired User Name"
                  name="username"
                  required
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  required
                />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="cryptoProfile">
                  Your Cryptocurrency Portfolio
                </label>

                {/* <input type="text" id="cryptoProfile" className="FormField__Input" placeholder="Your Crypto Profile" name="email" value={this.state.cryptoProfile} onChange={this.handleChange} /> */}
                <Select
                  className = "dropdown"
                  required
                  onChange={this.props.handleDropdownChange}
                  options={cryptoOptions}
                  isMulti={true}
                  autoBlur={false}

                />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox"
                    type="checkbox"
                    name="hasAgreed"
                  />
                  I agree all statements in
                  <a href="#" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="FormField">
                <button className="FormField__Button mr-10">
                  Sign Up
                </button>
                <Link to="/" className="FormField__Link">
                  I'm already member
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cryptoOptions: state.LoadCrypto.cryptoOptions,
  loading: state.LoadCrypto.loading,
  error: state.LoadCrypto.error,
  selectedCryptos: state.CryptoSelected.selectedCryptos

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({handleDropdownChange: handleDropdownChange, _loadCryptocurrencies: _loadCryptocurrencies}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SignUp);


