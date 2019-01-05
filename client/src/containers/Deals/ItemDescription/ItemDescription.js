import React from "react";
import "./ItemDescription.css";

const ItemDescription = props => {
  const sellers_rating = props.sellers_avg_rating;
//   const reviews = props.allReviews;
//   console.log(reviews[0]);
  return (
    <div>
        <div class="content item-description">
            <div>Item Category: {props.category}</div> 
            <div>Item Description: {props.deal_description}</div>
            <div onClick={() => props.next_step()} id="next-step">
                <button>Next</button>
            </div>
        </div>        
        <hr/>
      
        <div class="content sellers-reviews">
            <div>Seller's Average Rating is: {props.rating_display(sellers_rating)}{props.sellers_avg_rating} out of 5 stars </div>
            <div>
                Seller's Reviews Below:
                <div>{props.allReviews && props.allReviews[0].rating_title}</div> 
                <div>{props.allReviews && props.allReviews[0].rating}</div>
                    <div>{props.allReviews && props.allReviews[0].rating_body}</div>
            </div>
        </div>
    </div>
  );
};

export default ItemDescription;
