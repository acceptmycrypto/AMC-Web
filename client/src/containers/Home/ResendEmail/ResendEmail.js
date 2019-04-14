import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import { handleDropdownChange } from "../../../actions/signUpActions";
import Footer from "../../../components/Layout/Footer";
import Aside from '../Aside';
import Modal from 'react-awesome-modal';
import { openModal, closeModal, _resendEmail } from '../../../actions/signInActions';

class ResendEmail extends Component {
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


    let email = e.target.children[0].children[1].value;
    console.log(this.props);
    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (!email) {
      alert("Please enter in the required field!");
    } else {
      return _resendEmail(email).then(res => {
        console.log("message sent from server if success1: ", res);
        //TODO
        //prompt users to check their email
        this.props.openModal();
        document.getElementById('email').value="";
      });
    }
  }

  render() {
    //If media query matches
    const mobileScreenSize = window.matchMedia("(max-width: 640px)")

    const { error, loading, cryptoOptions, visible } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div className="App">
        <Aside />
        <div className="App__Form">
          <div className="PageSwitcher" style={{visibility: "hidden"}}>
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
                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                </div>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>
              <div className="FormField buttonLink">
                <button className="FormField__Button">
                  Resend Email
                </button>
                <Link to="/" className="FormField__Link">
                  back to sign in
                </Link>
              </div>
              <Modal visible={visible} width={mobileScreenSize.matches && "85%"}  effect="fadeInLeft" onClickAway={() => {this.props.closeModal(); }}>
                <div className={mobileScreenSize.matches ? "mob-modal" : "Modal"}>
                  <h4>Please check your email to confirm registration.</h4>
                  <a className="a-link" href="javascript:void(0);" onClick={() => {this.props.closeModal(); }}>Ok</a>

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
  cryptoOptions: state.LoadCrypto.cryptoOptions,
  loading: state.LoadCrypto.loading,
  error: state.LoadCrypto.error,
  selectedCryptos: state.CryptoSelected.selectedCryptos,
  visible: state.SignInModal.visible,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({openModal, closeModal, handleDropdownChange, _loadCryptocurrencies}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ResendEmail);


