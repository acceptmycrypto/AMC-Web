import React, { Component } from 'react';
import './SignIn.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { _login } from '../../../services/AuthService';
import Modal from 'react-awesome-modal';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { openModal, closeModal } from '../../../actions/signInActions';
import { _loadProfile } from "../../../actions/userLoadActions";


class SignIn extends Component {
  constructor() {
    super();


    this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin(e) {
    e.preventDefault();
    let email = e.target.children[0].children[1].value;
    let password = e.target.children[1].children[1].value;

    if (!email || !password) {
      alert("please enter in the required fields");
    } else {
      return _login(email, password).then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.log(res.token);
          // alert("You've successfully logged in");
          //redirect user to the feed/deals

        } else {
          console.log("Login error: ", res);
          alert(res.err);
        }
      });

    }
  }

  render() {

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
            <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink exact to="/SignUp" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>

          <div className="FormCenter">
            <form onSubmit={this.handleLogin} className="FormFields">

              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" required />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" required />
              </div>

              <div className="FormField">

                <button className="FormField__Button mr-10" onClick={() => this.props.openModal()}>Sign In</button>
                <Link to="/" className="FormField__Link">Create an account</Link>

              </div>
              <Modal visible={this.props.visible} effect="fadeInLeft" onClickAway={() => {this.props.closeModal(); this.props._loadProfile(localStorage.getItem('token')); }}>
                <div className="Modal">
                  <h4>You have successfully logged in</h4>
                  <p>From the team at Accept My Crypto, welcome back!</p>
                  <a className="a-link" href="javascript:void(0);" onClick={() => {this.props.closeModal(); this.props._loadProfile(localStorage.getItem('token')); }}>Ok</a>
                </div>
              </Modal>
            </form>
          </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => ({
  visible: state.SignInModal.visible

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({openModal, closeModal, _loadProfile}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SignIn);
