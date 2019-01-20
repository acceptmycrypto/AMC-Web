import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";
import { resetDealitemState } from "../../../actions/dealItemActions";
import CryptoRankings from '../../CryptosRanking';
import Layout from "../../Layout";
import '../Deals.css';
import { _isLoggedIn } from '../../../actions/loggedInActions';
import {searchDeals} from '../../../actions/searchBarActions';
import queryString from 'query-string';


class SearchDeals extends Component {
    scrollL = () => {
        this.props.history.push("/search?term="+this.props.searchTerm+"&page="+(parseInt(this.props.searchPage)-1));
        this.props.searchDeals(this.props.searchTerm, parseInt(this.props.searchPage)-1);
    }
    scrollR = () => {
        this.props.history.push("/search?term="+this.props.searchTerm+"&page="+(parseInt(this.props.searchPage)+1));
        this.props.searchDeals(this.props.searchTerm, parseInt(this.props.searchPage)+1);
    }

  componentDidMount = () => {
    let values = queryString.parse(this.props.location.search);
    console.log("boo");
    console.log(values);
    this.props.searchDeals(values.term, values.page);

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
    let numberPerPage = 1;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

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
        {this.props.searchTerm!="" && <div className="page_Nav">
            <div className="page_NavContent">
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(this.props.searchPage==1))} onClick={this.scrollL}>
                        previous page
                    </button>
                </span>
                <span className="page_Number">{this.props.searchPage}/{Math.ceil(this.props.numberOfResults/numberPerPage)}</span>
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(this.props.searchPage==(Math.ceil(this.props.numberOfResults/numberPerPage))))} onClick={this.scrollR}>
                            next page
                    </button>
                </span>
            </div>
        </div>} 
        <div className="venues-content mb-5">


          {/* remove the cryptoranking table on the deals page until further notice
          <CryptoRankings /> */}

          <div id="right" className="grid mx-4">
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
        {this.props.searchTerm!="" && <div className="page_Nav">
            <div className="page_NavContent">
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(this.props.searchPage==1))} onClick={this.scrollL}>
                        previous page
                    </button>
                </span>
                <span className="page_Number">{this.props.searchPage}/{Math.ceil(this.props.numberOfResults/numberPerPage)}</span>
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(this.props.searchPage==(Math.ceil(this.props.numberOfResults/numberPerPage))))} onClick={this.scrollR}>
                            next page
                    </button>
                </span>
            </div>
        </div>}
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
  searchPage: state.Search.searchPage,
  numberOfResults: state.Search.numberOfResults,
  category: state.Category.category,
  categorizedDeals: state.Category.filteredCategory
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ searchDeals, resetDealitemState, _isLoggedIn }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SearchDeals));
