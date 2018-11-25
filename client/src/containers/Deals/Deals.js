import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadDeals } from "../../actions/dealsActions";
import { resetDealitemState } from "../../actions/dealItemActions";
import CryptoRankings from '../CryptosRanking';
import Layout from "../Layout"
import './Deals.css';
import { _isLoggedIn } from '../../actions/loggedInActions';


class Deals extends Component {

  componentDidMount() {

    this.props._isLoggedIn(localStorage.getItem('token'));
    this.props._loadDeals(localStorage.getItem('token'));
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  handleLongDescription = (description) => {
    let trimmedDescription = description.trim();
    if (trimmedDescription.length > 125) {
      return trimmedDescription.substring(0, trimmedDescription.indexOf(' ', 75)) + "...";
    }
  }

  render() {
    let { error, loading, deals, userLoggedIn } = this.props;  //does this need to be const?? i changed it to let so line 56 will work

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }


    //reset dealItem state when user hit deals route
    this.props.resetDealitemState();


    if (userLoggedIn) {
      console.log("user logged in");
      
    }else{
        this.props.history.push('/');
    }
    
    if (this.props.searchTerm!=""){
        deals = this.props.searchedDeals;
    }

    return (
      <div>
        <Layout>
        <div className="venues-content mb-5">
          <CryptoRankings />

          <div id="right" className="grid">
            {deals != undefined && deals.length > 0 && deals.map(deal => (
              <div key={deal.id} className="deal">
                <Link to={`/feed/deals/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                    <div className="deal-info">
                      <img className="deal-image" src={deal.featured_deal_image} alt="deal"/>
                      <div className="mt-1">{deal.deal_name}</div>
                      <small className="deal-description">{this.handleLongDescription(deal.deal_description)}</small>
                      <div><small>Offered by: {deal.venue_name}</small></div>
                    </div>

                    <div className="deal-price">
                      <div className="price-differ">
                        <div>
                          <div className="purchase-method">Dollar</div>
                          <div>${deal.pay_in_dollar}</div>
                        </div>
                        <div>
                          <div className="purchase-method">Cryptocurrency</div>
                          <strong className="pay_in_crypto">${deal.pay_in_crypto}
                          <small className="discount">{this.convertToPercentage(deal.pay_in_dollar, deal.pay_in_crypto)}% OFF</small>
                          </strong>
                        </div>
                      </div>
                    </div>

                </Link>
              </div>

            ))}
          </div>

        </div>
        </Layout >
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deals: state.matchedDeals.deals,
  loading: state.matchedDeals.loading,
  error: state.matchedDeals.error,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  searchTerm: state.Search.searchTerm,
  searchedDeals: state.Search.searchedDeals
});

const matchDispatchToProps = dispatch =>{

  return bindActionCreators({ _loadDeals, resetDealitemState, _isLoggedIn }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(Deals);
