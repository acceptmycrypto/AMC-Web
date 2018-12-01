import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./ProfileFeed.css";
import FeedCard from "../../../components/Profile/FeedCard";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";
import { changeTxHistoryView } from '../../../actions/userLoadActions';


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
        const { deals, transactions, confirmed, pending, tx_history_view, changeTxHistoryView } = this.props

        const dealsRecommended = this.shuffle(deals).slice(0, 4);

        return (
            <div className="w-100">
                {(transactions !== undefined && transactions.length > 0)
                    ? <div>
                        <div className="mb-1 mt-1 text-center">
                            {/* <span><button className="btn btn-outline-primary" id="order-history-button"className="feed-button button-active">Order History</button><button id="" className="feed-button">Pending Orders</button></span> */}
                            <div class="btn-group" role="group" aria-label="button-group">
                                {tx_history_view === "pending"
                                    ? <div>
                                        {confirmed.length > 0 &&
                                            <button id="orderHistoryBtn" type="button" class="btn btn-outline-primary mr-3 btn-lg" onClick={(event)=>{changeTxHistoryView(event, "confirmed", localStorage.getItem('token'))}}>Order History</button>
                                        }
                                        <button id="pendingBtn"type="button" class="btn btn-primary btn-lg" disabled>Pending Orders</button>
                                    </div>
                                    : <div>
                                        <button id="orderHistoryBtn" type="button" class="btn btn-primary mr-3 btn-lg" disabled>Order History</button>
                                        <button id="pendingBtn"type="button" class="btn btn-outline-primary btn-lg" onClick={(event)=>{changeTxHistoryView(event, "pending", localStorage.getItem("token"))}}>Pending Orders</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="overflow-y">
                            {tx_history_view === "pending"
                                ? <FeedCard transactions={pending} orderType={"pending"}/>
                                : <FeedCard transactions={confirmed} orderType={"confirmed"} />
                            } 
                        </div>
                    </div>
                    : <div>
                        <h2 className="color-blueRanking text-center">Recommended Deals For You</h2>
                        <div id="right" className="profileGrid">
                            {deals != undefined && deals.length > 0 && dealsRecommended.map(deal => (
                                <div key={deal.id} className="profileDeal">
                                    <Link to={`/feed/deals/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                                        <div className="deal-info">
                                            <img className="deal-image" src={deal.featured_deal_image} alt="deal" />
                                            <div className="mt-3">{deal.deal_name}</div>
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
    transactions: state.UserInfo.transactions,
    confirmed: state.UserInfo.confirmed,
    pending: state.UserInfo.pending,
    tx_history_view: state.UserInfo.tx_history_view,
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ _loadDeals, changeTxHistoryView }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileFeed);