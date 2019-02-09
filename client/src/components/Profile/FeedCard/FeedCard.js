import React from "react";
import "./FeedCard.css";
import Timestamp from 'react-timestamp';
import Countdown from 'react-countdown-now';
import { Link } from "react-router-dom";
import Modal from 'react-awesome-modal';

const FeedCard = props => {
  return (
    <div className="right">
      {props.transactions.map((transaction, i) => (
        <div key={i} className="feed-card ">
          <div className="card-content">
            <div className="user-info">
              <div className="mt-3">
                {/* {(transaction.photo.indexOf("fa-user") !== -1)
                  ? <i className={'fas py-2 px-2 user-icon-shaded-small ' + transaction.photo}></i>
                  : <img src={transaction.photo}></img>
                } */}
                <Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`}><img className="featured-image" src={transaction.featured_deal_image} width="100%"></img></Link>
                {/* <i class="user-icon fas fa-user-circle" /> */}
              </div>
              {/* <div className="user-name">{transaction.username}</div> */}
            </div>
            <div className="user-transaction-info">
              {transaction.status === "100" &&
              <div>

                <div>
                  Purchased <Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} >
                    <span className="blueText">{transaction.deal_name}</span>
                  </Link>
                </div>

                <div>
                  For <span className="greenText">{transaction.amount + " "}</span>
                  <span className="greenText">{transaction.crypto_symbol}</span>
                </div>

                <div>
                  Sold By <span className="blueText">{transaction.venue_name || transaction.seller_name }</span>
                </div>

                <div className="write-review">
                  <button data-soldby={transaction.venue_name || transaction.seller_name } onClick={props.handleReviewModal} data-featureimage={transaction.featured_deal_image}>Write a Review</button>
                </div>

              </div>}
              {transaction.status === "1" && <div>
                <div>Processing Payment:</div>
                <div><Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} ><span className="blueText">{transaction.deal_name}</span></Link> for <span className="greenText">{transaction.amount + " "}</span>
                <span className="greenText">{transaction.crypto_symbol}</span> Sold By <span className="blueText">{transaction.venue_name || transaction.seller_name}</span></div>
              </div>}
              {transaction.status === "0" && <div>
                <div>Awaiting Payment: Send <span className="greenText">{transaction.amount + " "}</span> <span className="greenText">{transaction.crypto_symbol + " "}</span></div>
                <div>To Address: <span className="greenText">{" " + transaction.address + " "}</span></div>
                <div>For <Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} ><span className="blueText">{transaction.deal_name}</span></Link> Sold By <span className="blueText">{transaction.venue_name || transaction.seller_name}</span></div>
              </div>}
              {transaction.status === "-1" && <div>
                <div className="redText">ORDER CANCELLED:</div>
                <div><Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} ><span className="blueText">{transaction.deal_name}</span></Link> for <span className="greenText">{transaction.amount + " "}</span>
                <span className="greenText">{transaction.crypto_symbol}</span> Sold By <span className="blueText">{transaction.venue_name || transaction.seller_name}</span></div>
              </div>}

             <div><small className={'mt-3'}>Order# {transaction.txn_id}</small></div>
              <div className="timestamp">
                {/* <small><Timestamp time={transaction.date_purchased}  format='ago' precision={2} autoUpdate={60}/></small> */}
                <small><Timestamp time={transaction.date_purchased} format='full' precision={3}/></small>
              </div>
            </div>

              {/* {transaction.status = 100 &&
              <div className="write-review">
                <button onClick={props.handleReviewModal}>Write a Review</button>
              </div>
              } */}

          </div>
        </div>
      ))}

        <Modal visible={props.modalDisplay} effect="fadeInUp" onClickAway={() => {props._closeModal()}}>
          <div className="main-modal">
            <form
              // onSubmit={}
            >
              <h4 className="main-modal-header">
                How was your experience with {props.selectedTransaction.soldBy}?
                <div className="main-modal-deal-image">
                  <img src={props.selectedTransaction.featureDealImage} alt="dealImage"/>
                </div>
              </h4>

              <div className="review-rating-wrapper">
                <div className="review-rating">
                  <label>
                    <input type="radio" name="stars" value="1" />
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="2" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="3" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                    <input type="radio" name="stars" value="4" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                  </label>
                  <label>
                  <input type="radio" name="stars" value="5" />
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
                  {/* <input
                    // onChange={onEditSellerVerificationToken}
                    // value={sellerVerificationToken}
                    required
                    className="description-input"
                    autofocus="autofocus"
                    placeholder="Enter your verification code"
                  /> */}
                  <textArea className="review-text-area" rows="4" cols="95"></textArea>
                </div>

              </div>

              <button style={{left: "84%"}} onClick={() => {props._closeModal()}}>Send</button>
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default FeedCard;
