import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
// import { _resetPassword } from "../../../services/AuthService";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { validatePWToken, resetPassword } from "../../../actions/signUpActions";
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
    this.props.validatePWToken(this.props.match.params.token);
  }



  //function to handle when user clicks submit button to register
  async handleSubmit(e) {
    e.preventDefault();

    let password1 = e.target.children[0].children[1].value;
    let password2 = e.target.children[1].children[1].value;

      await this.props.resetPassword(this.props.match.params.token, password1, password2);
        //TODO
        //prompt users to check their email
        await this.props.openModal();
        if (this.props.validity=="valid"){
            document.getElementById('newpassword').value="";
            document.getElementById('confirmpassword').value="";
        }
  }

  render() {
    //If media query matches
    const mobileScreenSize = window.matchMedia("(max-width: 640px)")
    const { error, loading, visible , validity} = this.props;

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
          {validity=="valid" && <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
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
                <Link to="/SignIn" className="FormField__Link">
                  back to sign in
                </Link>
              </div>
              <Modal width={mobileScreenSize.matches && "85%"} visible={visible} effect="fadeInLeft" onClickAway={() => {this.props.closeModal(); }}>
                <div className={mobileScreenSize.matches ? "mob-modal" : "Modal"}>
                  <h4>{this.props.error_message}</h4>
                  <a className="a-link" href="javascript:void(0);" onClick={() => {this.props.closeModal(); }}>Ok</a>

                </div>
              </Modal>
            </form>
          </div>
            }
          {validity=="expired" && <div className="FormCenter">
            <form className="FormFields">
              <div className="FormField">
                <div>
                    <label className="FormField__Label">
                    Your request to reset password has expired...
                    </label>
                </div>
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label">
                    Please follow the link below to reset your password
                    </label>
                </div>
              </div>
              <div className="FormField buttonLink">
                <Link to="/ResetPasswordEmail" className="FormField__Link">
                  try again
                </Link>
              </div>
            </form>
          </div>
            }
            {validity=="invalid" && <div className="FormCenter">
            <form className="FormFields">
              <div className="FormField">
                <div>
                    <label className="FormField__Label">
                    Something weird occured...
                    </label>
                </div>
              </div>
              <div className="FormField">
                <div>
                    <label className="FormField__Label">
                    Please follow the link below to reset your password
                    </label>
                </div>
              </div>
              <div className="FormField buttonLink">
                <Link to="/ResetPasswordEmail" className="FormField__Link">
                  try again
                </Link>
              </div>
            </form>
          </div>
            }
          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.LoadCrypto.loading,
  error: state.LoadCrypto.error,
  visible: state.SignInModal.visible,
    validity: state.PasswordReset.pw_token_validity,
    error_message: state.PasswordReset.error_message
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({openModal, closeModal, validatePWToken, resetPassword}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);


