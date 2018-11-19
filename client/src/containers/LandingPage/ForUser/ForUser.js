import React, { Component } from 'react';
import './ForUser.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import Select from "react-select";
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { _loadLandingDropdown } from '../../../actions/landingUserActions';
import { handleDropdownChange } from '../../../actions/signUpActions';
import { _addUserCryptoVotes } from '../../../services/landingUserService';



class ForUser extends Component {
  componentDidMount() {
    this.props._loadLandingDropdown();
  }

  handleDropdownSubmit = (e) => {
    e.preventDefault();

    let email = e.target.children[0].children[1].value
    let cryptoProfile = this.props.selectedCryptos;
  
    if (!email || !cryptoProfile) {
      alert("Please enter in the required field!");
    } else {
      return _addUserCryptoVotes(email, cryptoProfile).then(res => {
        console.log("message sent from server if success: ", res);

      });
    }
  }
  render() {
    const { error, loading, landingCryptoOptions, selectedCryptos } = this.props;

    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <div className="App__Aside">
          <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
          <h1 className="text-uppercase mb-0">AcceptMyCrypto</h1>
          <hr className="star-light"></hr>
          <h2>
            <ul className="text-uppercase font-weight-light" >
              <li><i className="homepage-icons fab fa-bitcoin"></i>
                Spend Cryptocurrencies You Support
              </li>
              <br />
              <li><i className="homepage-icons fas fa-dollar-sign" aria-hidden="true"></i>
                Find Deals for purchase with Cryptocurrencies
              </li>
              <br />
              <li><i className="homepage-icons fas fa-chart-area" aria-hidden="true"></i>
                Read Market Trend based on crypto purchase transactions
              </li>
            </ul>
          </h2>
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">For User</NavLink>
            <NavLink exact to="/vendor" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">For Vendor</NavLink>
          </div>
          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleDropdownSubmit}>

              <div className="FormField">

                <label className="FormField__Label_landing" htmlFor="email">E-Mail Address:</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" required />
                
                <label className="FormField__Label_landing pt-3" htmlFor="landing_cryptos">Enter the Cryptocurrencies are you interested in spending online:</label>
                <Select
                  id="landing_cryptos"
                  required
                  onChange={this.props.handleDropdownChange}
                  options={landingCryptoOptions}
                  isMulti={true}
                  autoBlur={false}

                />


              </div>

              <div className="FormField">

                <button className="FormField__Button mr-10">Submit</button>

              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  landingCryptoOptions: state.LandingCryptos.landingCryptoOptions,
  loading: state.LandingCryptos.loading,
  error: state.LandingCryptos.error, 
  selectedCryptos: state.CryptoSelected.selectedCryptos

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _loadLandingDropdown, handleDropdownChange }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ForUser);

