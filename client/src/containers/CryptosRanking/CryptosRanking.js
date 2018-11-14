import React, { Component } from "react";
import "./CryptosRanking.css";
import { connect } from "react-redux";
import { _loadCryptosRanking } from "../../actions/cryptosRankingActions";

class CryptosRankings extends Component {

  componentDidMount() {
    this.props.dispatch(_loadCryptosRanking());
  }

  render() {

    return (
      <div id="left" className="column cryptosRanking">
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
}

const mapStateToProps = state => ({
  cryptosRanking: state.Cryptos.cryptos,
  loading: state.Cryptos.loading,
  error: state.Cryptos.error
});

export default connect(mapStateToProps)(CryptosRankings);
