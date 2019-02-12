import React from "react";
import "./ItemDescription.css";
import { Editor } from 'draft-js';

const ItemDescription = props => {
  const sellers_rating = props.sellers_avg_rating;

  const handleBuyNowButton = () => {
    console.log(props.transactionStatus);
    switch (true) {
      case props.deal_name && props.deal_status === "reserved":
        return (
          <button disabled>Waiting for Payment</button>
        );
      case props.deal_name && props.deal_status === "sold":
        return (
          <button disabled>Sold</button>
        );
      default:
        return <button>Buy Now</button>
    }
  };

  return (
    <div>
      <div className="content item-description">
        <div className="deal-name-label">{props.deal_name}</div>
        <div id="deal-item-info">
          <div className="condition-category-posted-container">
            <div className="condition-category-posted">
              <div className="text-secondary">Condition</div>
              <div className="text-secondary">Posted</div>
            </div>
            <div className="condition-category-posted">
              <div className="text-dark">
                {props.item_condition ? props.item_condition : "N/A"}
              </div>
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
                {/* <small className="deal-item-discount">
              {props.deal_name && props.calculateDiscount(props.pay_in_dollar, props.pay_in_crypto)}% OFF</small> */}
              </div>
              <div className="text-dark">${props.deal_name && props.pay_in_dollar.toFixed(2)}</div>
            </div>
            <div>
              <div className="deal-item-discount">
                {props.deal_name && props.calculateDiscount(props.pay_in_dollar, props.pay_in_crypto)}% OFF
              </div>
            </div>
          </div>
        </div>

        <div id="category-display-flex">
          <div className="text-secondary condition-category-posted">Category</div>
          <div id="category-span">
           {props.deal_category !== undefined && props.deal_category.map((category) => {
                return (
                  <div className="text-dark">{category}</div>
                )
              })}
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
        <div onClick={() => props.next_step()} className="buy-now">
          {handleBuyNowButton()}
        </div>
      </div>
    </div>
  );
};

export default ItemDescription;
