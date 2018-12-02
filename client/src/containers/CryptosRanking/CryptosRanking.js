import React, { Component } from "react";
import "./CryptosRanking.css";
import { connect } from "react-redux";
import { _loadCryptosRanking } from "../../actions/cryptosRankingActions";

class CryptosRankings extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     venuesView: true
  //   };
  // }
  componentDidMount() {
    this.props.dispatch(_loadCryptosRanking('venues'));
  }

  venueSort = () => {
    alert("venue sort");
    // this.setState({venuesView: true});
    this.props.dispatch(_loadCryptosRanking('venues'));
  }

  transactionSort = () => {
    alert("transaction sort");
    this.props.dispatch(_loadCryptosRanking('transactions'));
  }

  render() {
    console.log(this.props.cryptosSort);
    if(this.props.cryptosSort == 'venues')
    {
      return (
        <div id="left" className="column cryptosRanking">
          <div>
          <button onClick={this.venueSort}>Venues</button>
          <button onClick={this.transactionSort}>Transactions</button>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Venues</th>
                <th scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cryptosRanking.map((crypto, i) => (
                <tr key={crypto+i}>
                  <th scope="row">{i + 1}</th>
                  <td><img src={crypto.crypto_logo} alt="crypto-logo"/> {crypto.crypto_symbol}</td>
                  <td>{crypto.venues_count}</td>
                  <td>{crypto.crypto_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    else
    {
      return (
        <div id="left" className="column cryptosRanking">
          <div>
          <button onClick={this.venueSort}>Venues</button>
          <button onClick={this.transactionSort}>Transactions</button>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Transactions</th>
                <th scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cryptosRanking.map((crypto, i) => (
                <tr key={crypto+i}>
                  <th scope="row">{i + 1}</th>
                  <td><img src={crypto.crypto_logo} alt="crypto-logo"/> {crypto.crypto_symbol}</td>
                  <td>{crypto.total_transactions}</td>
                  <td>{crypto.crypto_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  
  }
}

const mapStateToProps = state => ({
  cryptosRanking: state.Cryptos.cryptos,
  loading: state.Cryptos.loading,
  error: state.Cryptos.error,
  cryptosSort: state.Cryptos.cryptosSort
});

export default connect(mapStateToProps)(CryptosRankings);
