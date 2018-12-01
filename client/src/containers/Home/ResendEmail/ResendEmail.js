import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { _resendEmail } from "../../../services/AuthService";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadCryptocurrencies } from "../../../actions/loadCryptoActions";
import { handleDropdownChange } from "../../../actions/signUpActions";
import Footer from "../../../components/Layout/Footer";
import Aside from '../Aside/Aside';

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
        document.getElementById('email').value="";
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

    // console.log("This.props" , this.props);

    // if (localStorage.getItem('token')) {
    //   this.props.history.push('/feed/deals');
    // }
    return (
      <div className="App">
        <Aside />
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
              <div className="FormField buttonLink">
                <button className="FormField__Button">
                  Resend Email
                </button>
                <Link to="/" className="FormField__Link">
                  back to sign in
                </Link>
              </div>
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
  selectedCryptos: state.CryptoSelected.selectedCryptos

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({handleDropdownChange, _loadCryptocurrencies}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ResendEmail);


