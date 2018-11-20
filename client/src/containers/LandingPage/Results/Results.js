import React, { Component } from 'react';
import './Results.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import Select from "react-select";
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { _loadCryptoResults } from '../../../actions/landingResultsActions';





class Results extends Component {
  componentDidMount() {
    this.props._loadCryptoResults();
  }


  render() {
    const { error, loading, cryptoResults } = this.props;

    
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
          <div className="FormField__Label_landing pb-3">Top Ten Cryptocurrencies Users are Interested In:</div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cryptocurrencies</th>
                <th scope="col">Votes</th>
              </tr>
            </thead>
            <tbody>
              {cryptoResults.map((result, i) =>(
                <tr>
                <th scope="row">{i+1}</th>
                <td>{result.crypto_name}</td>
                <td>{result.Count}</td>
              </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cryptoResults: state.CryptoResults.cryptoResults,
  loading: state.CryptoResults.loading,
  error: state.CryptoResults.error, 

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({_loadCryptoResults}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Results);

