import "./SignUp.css";
import "./SignUpMobile.css";
import "../../../components/UI/Modal/ModalMobile.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Modal from "react-awesome-modal";
import Select from "react-select";
import { _signUp } from "../../../services/AuthService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import {
  handleDropdownChange,
  openModal,
  closeModal,
  resetSelectedCryptos
} from "../../../actions/signUpActions";

import Footer from "../../../components/Layout/Footer";
import Aside from "../Aside";

import Modal from 'react-awesome-modal';

class SignUp extends Component {
  componentDidMount = () => {
    this.props._loadCryptocurrencies();
  };

  //function to handle when user clicks submit button to register
  handleSubmit = e => {
    e.preventDefault();

    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.props.selectedCryptos;

    let hasAgreed = e.target.children[4].children[0].children[0].checked;

    if (cryptoProfile.length < 1) {
      document.querySelector("#selectCryptoError").innerHTML =
        "Select Cryptocurrencies";
    } else {
      if (!username || !email || !password) {
        alert("Please enter in the required field!");
      } else {
        return _signUp(username, email, password, cryptoProfile).then(res => {
          if (res.emailError || res.usernameError || res.passwordError) {
            if (res.emailError) {
              document.querySelector("#emailError").innerHTML = res.emailError;
            }
            if (res.usernameError) {
              document.querySelector("#usernameError").innerHTML =
                res.usernameError;
            }
            if (res.passwordError) {
              document.querySelector("#passwordError").innerHTML =
                res.passwordError;
            }
          } else {
            this.props.openModal();
            this.props.resetSelectedCryptos();
          }
        });
      }
    }
  };

  clearErrorMessage = id => {
    document.querySelector(id).innerHTML = "";
  };

  handleMobModal = () => {
    const { visible } = this.props;
    return (
      <Modal visible={visible} effect="fadeInUp" width="85%" height="70%">
        <div className="mob-modal">
          <h4 className="mob-modal-header">
            You have successfully registered!{" "}
          </h4>
          <div className="mob-modal-body">
            Please check your Email and follow the instructions for Email
            verification.
          </div>
          <div className="mob-modal-buttons">
            <button
              clbuttonssName="a-link"
              href="javascript:void(0);"
              onClick={() => {
                this.props.closeModal();
                this.props.history.push("/SignIn");
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    const mobileScreenSize = window.matchMedia("(max-width: 640px)")
    const { error, cryptoOptions, visible } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div className="App">
        <Aside />
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink
              exact
              to="/SignIn"
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
                  onChange={() => {
                    this.clearErrorMessage("#usernameError");
                  }}
                  required
                />
                <div id="usernameError" class="mt-1 orangeText" />
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
                  onChange={() => {
                    this.clearErrorMessage("#emailError");
                  }}
                  required
                />
                <div id="emailError" class="mt-1 orangeText" />
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
                  onChange={() => {
                    this.clearErrorMessage("#passwordError");
                  }}
                  required
                />
                <div id="passwordError" class="mt-1 orangeText" />
              </div>

              <div className="FormField">
                <div>
                  <label className="FormField__Label" htmlFor="cryptoProfile">
                    Your Cryptocurrency Portfolio
                  </label>
                </div>

                <Select
                  className="dropdown"
                  required
                  onChange={this.props.handleDropdownChange}
                  options={cryptoOptions}
                  isMulti={true}
                  autoBlur={false}
                />
                <div id="selectCryptoError" class="mt-1 orangeText" />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox mr-2"
                    required
                    type="checkbox"
                    name="hasAgreed"
                    required
                    // value={this.state.hasAgreed}
                    // onChange={this.handleChange}
                  />
                  I agree to all statements in
                  <a href="#" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="FormField buttonLink">
                <button className="FormField__Button">Sign Up</button>
                <Link to="/SignIn" className="FormField__Link">
                  I'm already member
                </Link>
              </div>

              {/* If media query matches  on mobile */}
              {mobileScreenSize.matches ? this.handleMobModal() :
              <Modal
                visible={visible}
                effect="fadeInLeft"
                onClickAway={() => {
                  this.props.closeModal();
                }}
              >
                <div className="Modal">
                  <h4>You have successfully registered! </h4>
                  <h4>
                    Please check your Email and follow the instructions for
                    Email verification.
                  </h4>
                  <a
                    className="a-link"
                    href="javascript:void(0);"
                    onClick={() => {
                      this.props.closeModal();
                      this.props.history.push("/SignIn");
                    }}
                  >
                    Ok
                  </a>
                </div>
              </Modal> }
            </form>
          </div>
          <Footer />
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

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      openModal,
      closeModal,
      handleDropdownChange,
      _loadCryptocurrencies,
      resetSelectedCryptos
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(SignUp);
