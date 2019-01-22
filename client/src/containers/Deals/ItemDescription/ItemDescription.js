import React from "react";
import "./ItemDescription.css";
import { Editor } from 'draft-js';

const ItemDescription = props => {
  const sellers_rating = props.sellers_avg_rating;
  console.log(props);
  return (
    <div>
      <div className="content item-description">
        <div className="deal-name-label">{props.deal_name}</div>
        <div id="deal-item-info">
          <div className="condition-category-posted-container">
            <div className="condition-category-posted">
              <div className="text-secondary">Condition</div>
              <div className="text-secondary">Category</div>
              <div className="text-secondary">Posted</div>
            </div>
            <div className="condition-category-posted">
              <div className="text-dark">
                {props.item_condition ? props.item_condition : "N/A"}
              </div>
              <div className="text-dark">{props.category ? props.category : "N/A"}</div>
              <div className="text-dark">
                {props.date_created && props.date_created.substring(0, 10)}
              </div>
            </div>
          </div>

          <div className="condition-category-posted-container">
            <div className="condition-category-posted">
              <div className="text-secondary">Pay in Crypto</div>
              <div className="text-secondary">Pay in Dollar</div>
            </div>
            <div className="condition-category-posted">
              <div className="text-dark">
                ${props.deal_name && props.pay_in_crypto.toFixed(2)}
                <small className="deal-item-discount">
              {props.deal_name && props.calculateDiscount(props.pay_in_dollar, props.pay_in_crypto)}% OFF</small>
              </div>
              <div className="text-dark">${props.deal_name && props.pay_in_dollar.toFixed(2)}</div>
              {/* <div className="text-dark">
                {props.date_created && props.date_created.substring(0, 10)}
              </div> */}
            </div>

            {/* <div>
              <div>Pay in Crypto:  ${dealItem && dealItem.pay_in_crypto.toFixed(2)}</div>  <small className="deal-item-discount">
              {dealItem && this.convertToPercentage(dealItem.pay_in_dollar, dealItem.pay_in_crypto)}% OFF</small> <br/>
              <small>Pay in Dollar:  ${dealItem && dealItem.pay_in_dollar.toFixed(2)} <br/></small>
            </div> */}
          </div>
        </div>

        <hr />

        <div>
          <div className="condition-category-posted">Detail</div>
            <div className="detail-wrapper">
            {props.seller_name ?
              <Editor
                editorState={props.sellerDealDescription(props.deal_description)}
                readOnly={true}
              /> : props.deal_description
            }
            </div>
        </div>
        <div onClick={() => props.next_step()} id="next-step">
          <button>Buy Now</button>
        </div>
      </div>

      {/* <div className="content sellers-reviews">
        <div>
          <strong>
            Seller's Average Rating is:{" "}
            <span className="star-space">
              {props.rating_display(sellers_rating)}
            </span>
          </strong>
          {props.sellers_avg_rating} out of 5 stars{" "}
        </div>
        <div>Seller's Reviews Below:</div>
        {props.allReviews != undefined &&
          props.allReviews.length > 0 &&
          props.allReviews.map(reviews => (
            <div className="review-box">
              <div className="review-header">
                {reviews.buyer_name} purchased {reviews.deal_name}
              </div>
              <div>
                <small className="star-space-right">
                  {props.rating_display(reviews.rating)}
                </small>
                <strong>{reviews.rating_title} </strong>
                <small className="float-right">
                  Date of Review:
                  {reviews.rating_date_reviewed.substring(0, 10)}
                </small>
              </div>
              <div className="review-body">{reviews.rating_body}</div>
              <div>
                <a href="/">report abuse</a>
              </div>
            </div>
          ))}
        {props.allReviews != undefined && props.allReviews.length == 0 && (
          <div>This seller has no reviews yet!</div>
        )}
      </div> */}

    </div>
  );
};

export default ItemDescription;
