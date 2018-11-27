import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./ProfileFeed.css";
import FeedCard from "../../../components/Profile/FeedCard";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";


class ProfileFeed extends Component {
    componentDidMount() {
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
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }


    render() {
        const { deals } = this.props

        const dealsRecommended = this.shuffle(deals).slice(0,4);
        return (
            <div className="w-100">
                {(this.props.transactions !== undefined && this.props.transactions.length > 0)
                    ? <div>
                        <div className="mb-3 mt-1 text-center">
                            {/* <span><button className="btn btn-outline-primary" id="order-history-button"className="feed-button button-active">Order History</button><button id="" className="feed-button">Pending Orders</button></span> */}
                            <div class="btn-group" role="group" aria-label="button-group">
                                <button type="button" class="btn btn-primary">Order History</button>
                                <button type="button" class="btn btn-outline-primary">Pending Orders</button>
                            </div>
                        </div>
                        <div className="overflow-y">
                            <FeedCard transactions={this.props.transactions} />
                        </div>
                    </div>
                    : <div>
                        <h2 className="color-blueRanking text-center">Recommended Deals For You</h2>
                        <div id="right" className="grid">
                            {deals != undefined && deals.length > 0 && dealsRecommended.map(deal => (
                                <div key={deal.id} className="deal">
                                    <Link to={`/feed/deals/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                                        <div className="deal-info">
                                            <img className="deal-image" src={deal.featured_deal_image} alt="deal" />
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

                }

            </div>
        );
    }
}


const mapStateToProps = state => ({
    deals: state.matchedDeals.deals,
    loading: state.matchedDeals.loading,
    error: state.matchedDeals.error,
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ _loadDeals }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileFeed);