import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadDeals } from "../../actions/dealsActions";
import { resetDealitemState } from "../../actions/dealItemActions";
import Layout from "../Layout"
import './Deals.css';
import { _isLoggedIn } from '../../actions/loggedInActions';
import { handleLongDescription } from '../../utils/helper_functions';

class Deals extends Component {

  componentDidMount = async () => {

    await this.props._isLoggedIn(localStorage.getItem('token'));

    if (await this.props.userLoggedIn) {
      await this.props._loadDeals(localStorage.getItem('token'));
    }else{
        // localStorage.removeItem('token');
        await this.props.history.push('/');
    }
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  // handleLongDescription = (description, char, index) => {
  //   let trimmedDescription = description.trim();
  //   if (trimmedDescription.length > char) {
  //     return trimmedDescription.substring(0, trimmedDescription.indexOf(' ', index)) + "...";
  //   }
  // }

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

    //filter deals by search
    if (this.props.searchTerm!=""){
        deals = this.props.searchedDeals;
    }

    //filter deals by category
    if (this.props.category){
      deals = this.props.categorizedDeals;
    }

    return (
      <div>
        <Layout>
        <div className="venues-content mb-5">

          {/* remove the cryptoranking table on the deals page until further notice
          <CryptoRankings /> */}

          <div id="right" className="grid mx-4">
            {deals != undefined && deals.length > 0 && deals.map(deal => (
              <div key={deal.id} className="deal">
                <Link to={`/feed/deals/${deal.id}/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                    <div className="deal-info">
                      <img className="deal-image" src={deal.featured_deal_image} alt="deal"/>
                      <div className="mt-1">{deal.deal_name}</div>
                      <small className="deal-description">{handleLongDescription(deal.deal_description, 125, 75)}</small>
                      {/* if seller is a vendor then display the venue name else if seller is a user then display the seller name which is the user's username */}
                      <div><small>Offered by: {deal.venue_name || deal.seller_name}</small></div>
                    </div>

                    <div className="deal-price">
                      <div className="price-differ">
                        <div>
                          <div className="purchase-method">Dollar</div>
                          <div>${deal.pay_in_dollar.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="purchase-method">Cryptocurrency</div>
                          <strong className="pay_in_crypto">${deal.pay_in_crypto.toFixed(2)}
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
  searchedDeals: state.Search.searchedDeals,
  category: state.Category.category,
  categorizedDeals: state.Category.filteredCategory
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _loadDeals, resetDealitemState, _isLoggedIn }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Deals);
