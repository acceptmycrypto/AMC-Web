import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";
import { resetDealitemState } from "../../../actions/dealItemActions";
import CryptoRankings from '../../CryptosRanking';
import Layout from "../../Layout";
import '../Deals.css';
import './SearchDeals.css';
import { _isLoggedIn } from '../../../actions/loggedInActions';
import {searchDeals} from '../../../actions/searchBarActions';
import queryString from 'query-string';
import { categoryDeals } from '../../../actions/categoryActions';



class SearchDeals extends Component {
    goToSearchPage = (page) => {
        if(this.props.pageType === "search"){
            //route to url specified page, then query db for those data
            this.props.searchDeals(this.props.searchTerm, parseInt(page));
            this.props.history.push("/Search?term="+this.props.searchTerm+"&page="+(parseInt(page)));
        } else if(this.props.pageType === "category"){
            this.props.categoryDeals(this.props.categoryTerm, parseInt(this.props.categoryPage)+2);
            this.props.history.push("/search?term="+this.props.categoryTerm+"&page="+(parseInt(page)));
        }
    }

  componentDidMount = () => {
    //   debugger;
      //parse out search term and current page number from url
      console.log("this.props.location.search");
      console.log(this.props.location.search);
      let values = queryString.parse(this.props.location.search);


      if(this.props.pageType === "search"){
        this.props.searchDeals(values.term, values.page);
      }else if (this.props.pageType === "category"){
        this.props.categoryDeals(values.term, values.page);
      }

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
    //hardcoded number of search results per page to 8.  ideally should be something like 20.
    //this number needs to match the number in backend deals.js
    let numberPerPage = 4;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }


    let currentTerm = "";
    let currentPage, currentNumberOfResults;
    //filter deals by search
    if (this.props.searchTerm!=="" && this.props.pageType === "search"){
        deals = this.props.searchedDeals; 
        currentTerm = this.props.searchTerm;
        currentPage = this.props.searchPage;
        currentNumberOfResults = this.props.numberOfResults;
    }

    if(this.props.categoryTerm!=="" && this.props.pageType === "category"){
        deals = this.props.categoriesDeals;
        currentTerm = this.props.categoryTerm;
        currentPage = this.props.categoryPage;
        currentNumberOfResults = this.props.categoryNumberOfResults;
    }

    //filter deals by category
    if ( this.props.category){
      deals = this.props.categorizedDeals;
    }
    

    return (
      <div>
        <Layout>
        {deals == undefined || deals.length == 0 && <div className="no_Results">No results found</div>
        }
        {deals != undefined && deals.length > 0 && currentTerm !==""  && <div className="page_Nav">
        <div className="page_NavContent">
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(parseInt(currentPage)==1))} onClick={()=>this.goToSearchPage(1)}>
                        First Page
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)-2)<1))} onClick={()=>this.goToSearchPage(parseInt(currentPage)-2)}>
                        {parseInt(currentPage)-2}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)-1)<1))} onClick={()=>this.goToSearchPage(parseInt(currentPage)-1)}>
                        {parseInt(currentPage)-1}
                    </button>
                </span>
                <span>
                    <button className="page_Number ">
                        {currentPage}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)+1)>Math.ceil(currentNumberOfResults/numberPerPage)))} onClick={()=>this.goToSearchPage(parseInt(currentPage)+1)}>
                        {parseInt(currentPage)+1}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)+2)>Math.ceil(currentNumberOfResults/numberPerPage)))} onClick={()=>this.goToSearchPage(parseInt(currentPage)+2)}>
                        {parseInt(currentPage)+2}
                    </button>
                </span>
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(parseInt(currentPage)==(Math.ceil(currentNumberOfResults/numberPerPage))))} onClick={()=>this.goToSearchPage(Math.ceil(currentNumberOfResults/numberPerPage))}>
                            Last Page
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
                <Link to={`/feed/deals/${deal.id}/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                <div className="deal-info">
                      <img className="deal-image" src={deal.featured_deal_image} alt="deal"/>
                      <div className="mt-1">{deal.deal_name}</div>
                      <small className="deal-description">{this.handleLongDescription(deal.deal_description)}</small>
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
        {deals != undefined && deals.length > 0 && currentTerm !="" && <div className="page_Nav">
            <div className="page_NavContent">
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(parseInt(currentPage)==1))} onClick={()=>this.goToSearchPage(1)}>
                        First Page
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)-2)<1))} onClick={()=>this.goToSearchPage(parseInt(currentPage)-2)}>
                        {parseInt(currentPage)-2}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)-1)<1))} onClick={()=>this.goToSearchPage(parseInt(currentPage)-1)}>
                        {parseInt(currentPage)-1}
                    </button>
                </span>
                <span>
                    <button className="page_Number ">
                        {currentPage}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)+1)>Math.ceil(currentNumberOfResults/numberPerPage)))} onClick={()=>this.goToSearchPage(parseInt(currentPage)+1)}>
                        {parseInt(currentPage)+1}
                    </button>
                </span>
                <span>
                    <button className={"page_Number "+("button_Hide_"+((parseInt(currentPage)+2)>Math.ceil(currentNumberOfResults/numberPerPage)))} onClick={()=>this.goToSearchPage(parseInt(currentPage)+2)}>
                        {parseInt(currentPage)+2}
                    </button>
                </span>
                <span>
                    <button className={"scroll_Button "+("button_Hide_"+(parseInt(currentPage)==(Math.ceil(currentNumberOfResults/numberPerPage))))} onClick={()=>this.goToSearchPage(Math.ceil(currentNumberOfResults/numberPerPage))}>
                            Last Page
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
  categorizedDeals: state.Category.filteredCategory,
  categoryTerm: state.Category.categoryTerm, 
  categoriesDeals: state.Category.categoriesDeals,
  categoryPage: state.Category.categoryPage,
  categoryNumberOfResults: state.Category.categoryNumberOfResults,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ searchDeals, categoryDeals, resetDealitemState, _isLoggedIn }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(SearchDeals));
