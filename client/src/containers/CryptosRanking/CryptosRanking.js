import React, { Component } from "react";
import "./CryptosRanking.css";
import { connect } from "react-redux";
import { _loadCryptosRanking } from "../../actions/cryptosRankingActions";

class CryptosRankings extends Component {

  componentDidMount() {
    this.props.dispatch(_loadCryptosRanking('venues'));
  }

  venueSort = () => {
    this.props.dispatch(_loadCryptosRanking('venues'));
  }

  transactionSort = () => {
    this.props.dispatch(_loadCryptosRanking('transactions'));
  }

  render() {
    console.log(this.props.cryptosSort);
    if(this.props.cryptosSort == 'venues')
    {
      return (
        <div id="left" className="col-cryptos cryptosRanking">
          
          <button className='sortButtonActive' onClick={this.venueSort}>Venues</button>
          <button className='sortButton' onClick={this.transactionSort}>Transactions</button>
         
          
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Venues</th>
                <th className='text-align' scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cryptosRanking.map((crypto, i) => (
                <tr key={crypto+i}>
                  <th scope="row">{i + 1}</th>
                  <td className='text-align'><img src={crypto.crypto_logo} alt="crypto-logo"/> {crypto.crypto_symbol}</td>
                  <td className='text-align'>{crypto.venues_count}</td>
                  <td className='text-align'>{crypto.crypto_price}</td>
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
        <div id="left" className="col-cryptos cryptosRanking">
          <div>
          <button className='sortButton' onClick={this.venueSort}>Venues</button>
          <button className='sortButtonActive' onClick={this.transactionSort}>Transactions</button>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Transactions</th>
                <th className='text-align' scope="col">Price $</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cryptosRanking.map((crypto, i) => (
                <tr key={crypto+i}>
                  <th scope="row">{i + 1}</th>
                  <td className='text-align'><img src={crypto.crypto_logo} alt="crypto-logo"/> {crypto.crypto_symbol}</td>
                  <td className='text-align'>{crypto.total_transactions}</td>
                  <td className='text-align'>{crypto.crypto_price}</td>
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
