import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./ProfileFeed.css";
import FeedCard from "../../../components/Profile/FeedCard";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { openModal, closeModal } from "../../../actions/signInActions";
import { changeTxHistoryView } from '../../../actions/userLoadActions';
import { _selectedTransaction, _handleStarRating, _handleReviewBody, _reviewSeller } from '../../../actions/reviewsActions';
import Modal from 'react-awesome-modal';

class ProfileFeed extends Component {
    componentDidMount = async () => {
        await this.props._isLoggedIn(localStorage.getItem('token'));

        if (await this.props.userLoggedIn) {
            await this.props._loadDeals(localStorage.getItem('token'));
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

    selectedTransactionForReview = async (txn_id) => {
      await this.props._selectedTransaction(localStorage.getItem("token"), txn_id);

      //open modal
      this.props.openModal();

    }

    submitReview = (event) => {
      event.preventDefault();

      let {rating, review_body} = this.props;
      let {seller_id, seller_name, deal_id, deal_name} = this.props.selectedTransaction[0];

      let title = `${seller_name} purchased ${deal_name}`;

      this.props._reviewSeller(localStorage.getItem("token"), seller_id, deal_id, rating, review_body, title);
    }


    render() {
        const { deals, transactions, confirmed, pending, tx_history_view, changeTxHistoryView, modalVisible, openModal, closeModal, selectedTransaction, _handleStarRating, _handleReviewBody, reviewBody } = this.props

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
                                            <button id="orderHistoryBtn" type="button" class="btn btn-outline-primary mr-3 btn-lg" onClick={(event) => { changeTxHistoryView(event, "confirmed", localStorage.getItem('token')) }}>Order History</button>
                                        }
                                        <button id="pendingBtn" type="button" class="btn btn-primary btn-lg" disabled>Pending Orders</button>
                                    </div>
                                    : <div>
                                        <button id="orderHistoryBtn" type="button" class="btn btn-primary mr-3 btn-lg" disabled>Order History</button>
                                        <button id="pendingBtn" type="button" class="btn btn-outline-primary btn-lg" onClick={(event) => { changeTxHistoryView(event, "pending", localStorage.getItem("token")) }}>Pending Orders</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="overflow-y">
                            {tx_history_view === "pending"
                                ? <FeedCard transactions={pending} orderType={"pending"} />
                                : <FeedCard handleReviewModal={this.selectedTransactionForReview} transactions={confirmed} orderType={"confirmed"} />
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

              <Modal visible={modalVisible} effect="fadeInUp" onClickAway={() => {closeModal()}}>
                <div className="main-modal">
                  <form
                    onSubmit={this.submitReview}
                  >
                    <h4 className="main-modal-header">
                      How was your experience with {selectedTransaction.length > 0 && selectedTransaction[0].seller_name}?
                      <div className="main-modal-deal-image">
                        <img src={selectedTransaction.length > 0 && selectedTransaction[0].featured_deal_image} alt="dealImage"/>
                      </div>
                    </h4>

                    <div className="review-rating-wrapper">
                      <div className="review-rating">
                        <label>
                          <input onChange={_handleStarRating} type="radio" name="stars" value="1" />
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input onChange={_handleStarRating} type="radio" name="stars" value="2" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input onChange={_handleStarRating} type="radio" name="stars" value="3" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                        <label>
                          <input onChange={_handleStarRating} type="radio" name="stars" value="4" />
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                          <span class="icon">★</span>
                        </label>
                        <label>
                        <input onChange={_handleStarRating} type="radio" name="stars" value="5" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                    </div>
                    </div>

                    <div>
                      <label>Describe your experience (optional)</label>
                      <div>
                        <textArea
                          onChange={_handleReviewBody}
                          value={reviewBody}
                          className="review-text-area" rows="4" cols="95"
                          placeholder="Write your review">
                        </textArea>
                      </div>

                    </div>

                    <button style={{left: "84%"}} onClick={() => {closeModal()}}>Send</button>
                  </form>
                </div>
              </Modal>
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
    userLoggedIn: state.LoggedIn.userLoggedIn,
    modalVisible: state.Reviews.modalVisible,
    selectedTransaction: state.Reviews.selectedTransaction,
    rating: state.Reviews.rating,
    review_body: state.Reviews.review_body
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ _loadDeals, changeTxHistoryView, _isLoggedIn, openModal, closeModal, _selectedTransaction, _handleStarRating, _handleReviewBody, _reviewSeller }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileFeed);