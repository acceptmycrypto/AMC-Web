import "./SignUp.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Modal from 'react-awesome-modal'
import Select from "react-select";
import { _signUp } from "../../../services/AuthService";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import { handleDropdownChange, openModal, closeModal, resetSelectedCryptos } from "../../../actions/signUpActions";

import Footer from "../../../components/Layout/Footer";


class SignUp extends Component {

  componentDidMount =() => {
    this.props._loadCryptocurrencies();
  }


  //function to handle when user clicks submit button to register
  handleSubmit = (e) => {
    e.preventDefault();

    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.props.selectedCryptos;
    console.log(this.props);
    console.log("crypto to submit:", cryptoProfile);
    let hasAgreed = e.target.children[4].children[0].children[0].checked;
    
    if(cryptoProfile.length < 1){
      document.querySelector("#selectCryptoError").innerHTML = "Select Cryptocurrencies";

    }else{

      if (!username || !email || !password) {
        alert("Please enter in the required field!");
      } else {
        return _signUp(username, email, password, cryptoProfile).then(res => {
          console.log("message sent from server if success: ", res);
          if(res.emailError || res.usernameError || res.passwordError){
            if(res.emailError){
              document.querySelector("#emailError").innerHTML = res.emailError;
            }
            if(res.usernameError){
              document.querySelector("#usernameError").innerHTML = res.usernameError;
            }
            if(res.passwordError){
              document.querySelector("#passwordError").innerHTML = res.passwordError;            
            }
          }else{
            this.props.openModal();
            this.props.resetSelectedCryptos();
          }
        });
      }
    }
  }

  clearErrorMessage = (id) =>{
    document.querySelector(id).innerHTML = ""; 
  }

  render() {

    const { error, loading, cryptoOptions, visible } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    // console.log("This.props" , this.props);

    // if (localStorage.getItem('token')) {
    //   this.props.history.push('/feed/deals');
    // }
    return (
      <div className="App">
        <div className="App__Aside">
          <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
          <h1 className="text-uppercase mb-0 ">Accept My Crypto</h1>
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
                <div>
                    <label className="FormField__Label" htmlFor="username">
                    UserName
                    </label>
                </div>
                <input
                  type="username"
                  id="username"
                  className="FormField__Input"
                  placeholder="Enter your desired User Name"
                  name="username"
                  onChange={()=>{this.clearErrorMessage("#usernameError")}}
                  required
                />
                <div id="usernameError" class="mt-1 orangeText"></div>
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label" htmlFor="email">
                    E-Mail Address
                    </label>
                </div>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email"
                  name="email"
                  onChange={()=>{this.clearErrorMessage("#emailError")}}
                  required
                />
                <div id="emailError" class="mt-1 orangeText"></div>
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label" htmlFor="password">
                    Password
                    </label>
                </div>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  onChange={()=>{this.clearErrorMessage("#passwordError")}}
                  required
                />
                <div id="passwordError" class="mt-1 orangeText"></div>
              </div>

              <div className="FormField">
                <div>
                    <label className="FormField__Label" htmlFor="cryptoProfile">
                    Your Cryptocurrency Portfolio
                    </label>
                </div>

                {/* <input type="text" id="cryptoProfile" className="FormField__Input" placeholder="Your Crypto Profile" name="email" value={this.state.cryptoProfile} onChange={this.handleChange} /> */}
                <Select
                  className = "dropdown"
                  required
                  onChange={this.props.handleDropdownChange}
                  options={cryptoOptions}
                  isMulti={true}
                  autoBlur={false}

                />
                <div id="selectCryptoError" class="mt-1 orangeText"></div>
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox mr-2"
                    required
                    type="checkbox"
                    name="hasAgreed"
                  />
                  I agree to all statements in
                  <a href="#" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="FormField buttonLink">
                <button className="FormField__Button">
                  Sign Up
                </button>
                <Link to="/SignIn" className="FormField__Link">
                  I'm already member
                </Link>
              </div>
              <Modal visible={visible} effect="fadeInLeft" onClickAway={() => {this.props.closeModal();}}>
                <div className="Modal">
                  <h4>You have successfully registered! </h4>
                  <h4>Please check your Email and follow the instructions for Email verification.</h4>
                  <a className="a-link" href="javascript:void(0);" onClick={() => {this.props.closeModal(); this.props.history.push("/SignIn")}}>Ok</a>
                </div>
              </Modal>

            </form>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.SignInModal.visible,
  cryptoOptions: state.LoadCrypto.cryptoOptions,
  loading: state.LoadCrypto.loading,
  error: state.LoadCrypto.error,
  selectedCryptos: state.CryptoSelected.selectedCryptos

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({openModal, closeModal, handleDropdownChange, _loadCryptocurrencies, resetSelectedCryptos}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SignUp);


