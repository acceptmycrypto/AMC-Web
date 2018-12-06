import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { _resetPassword } from "../../../services/AuthService";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import { handleDropdownChange } from "../../../actions/signUpActions";
import Footer from "../../../components/Layout/Footer";
import Aside from '../Aside';
import Modal from 'react-awesome-modal';
import { openModal, closeModal } from '../../../actions/signInActions';

class ResetPassword extends Component {
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

    let code = e.target.children[0].children[1].value;
    let password1 = e.target.children[1].children[1].value;
    let password2 = e.target.children[2].children[1].value;

    console.log(this.props);
    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (password1!=password2) {
      alert("Passwords do not match!");
    } else {
      return _resetPassword(code, password1, password2).then(res => {
        console.log("message sent from server if success3: ", res);
        //TODO
        //prompt users to check their email
        this.props.openModal();
        document.getElementById('verificationcode').value="";
        document.getElementById('newpassword').value="";
        document.getElementById('confirmpassword').value="";
      });
    }
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
                    <label className="FormField__Label" htmlFor="email">
                    Verification Code
                    </label>
                </div>
                <input
                  type="text"
                  id="verificationcode"
                  className="FormField__Input"
                  placeholder="Enter your verification code from the email"
                  name="verificationcode"
                  required
                />
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label" htmlFor="password">
                    New Password
                    </label>
                </div>
                <input
                  type="password"
                  id="newpassword"
                  className="FormField__Input"
                  placeholder="Enter your new password"
                  name="newpassword"
                  required
                />
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label" htmlFor="password">
                    Confirm Password
                    </label>
                </div>
                <input
                  type="password"
                  id="confirmpassword"
                  className="FormField__Input"
                  placeholder="Confirm your new password"
                  name="confirmpassword"
                  required
                />
              </div>
              <div className="FormField buttonLink">
                <button className="FormField__Button">
                  Reset Password
                </button>
                <Link to="/" className="FormField__Link">
                  back to sign in
                </Link>
              </div>
              <Modal visible={visible} effect="fadeInLeft" onClickAway={() => {this.props.closeModal(); }}>
                <div className="Modal">
                  <h4>Password changed.</h4>
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


export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);


