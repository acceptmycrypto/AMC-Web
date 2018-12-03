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
import { _isLoggedIn } from '../../../actions/loggedInActions';
import Footer from '../../../components/Layout/Footer';
import Aside from '../Aside';


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
          this.props.history.push('/feed/deals');

        } else {
          console.log("Login error: ", res);
          // alert(res.err);
          this.props.openModal();
        }
      });

    }
  }

  componentDidMount = async () =>{
    await this.props._isLoggedIn(localStorage.getItem('token'));

    if (await this.props.userLoggedIn) {
      await this.props.history.push('/feed/deals');
    }
  }

  render() {
    const { error, loading, userLoggedIn, visible } = this.props;
    // console.log(userLoggedIn);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    
    return (
      <div className="App">
        <Aside />
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

              <div className="FormField buttonLink">

                <button className="FormField__Button" >Sign In</button>
                <Link to="/SignUp" className="FormField__Link">Create an account</Link>
                <Link to="/ResendEmail" className="FormField__Link">
                  Resend my verification email
                </Link>

              </div>

              <Modal visible={visible} effect="fadeInLeft" onClickAway={() => {this.props.closeModal(); }}>
                <div className="Modal">
                  <h4>Your Your Email or Password was Invalid</h4>
                  {/* <p>From the team at Accept My Crypto, welcome back!</p> */}
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
  visible: state.SignInModal.visible,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  error: state.LoggedIn.error,
  loading: state.LoggedIn.loading

});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({openModal, closeModal, _loadProfile, _isLoggedIn}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SignIn);
