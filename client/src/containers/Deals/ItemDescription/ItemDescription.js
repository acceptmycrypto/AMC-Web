import React from "react";
import "./ItemDescription.css";

const ItemDescription = props => {
  const sellers_rating = props.sellers_avg_rating;

  return (
    <div>
        <div className="content item-description">
            <div><strong>Item Category: </strong>{props.category}</div> 
            <div><strong>Item Description: </strong><br/>{props.deal_description}</div>
            <div onClick={() => props.next_step()} id="next-step">
                <button>Next</button>
            </div>
        </div>        
        <hr/>
      
        <div className="content sellers-reviews">
            <div><strong>Seller's Average Rating is: <span className="star-space">{props.rating_display(sellers_rating)}</span></strong>{props.sellers_avg_rating} out of 5 stars </div>
            <div>Seller's Reviews Below:</div>
            {props.allReviews != undefined && props.allReviews.length > 0 && props.allReviews.map(reviews => (
                 <div className="review-box">
                 <div className="review-header">{reviews.buyer_name} purchased {reviews.deal_name}</div>
                 <div><small className="star-space-right">{props.rating_display(reviews.rating)} </small><strong>{reviews.rating_title} </strong> <small className='float-right'> Date of Review: {reviews.rating_date_reviewed.substring(0,10)}</small></div> 
                     <div className="review-body">{reviews.rating_body}</div>
                     <div><a href='/'>report abuse</a></div>
             </div>

            ))}
            {props.allReviews != undefined && props.allReviews.length == 0 && (<div>This seller has no reviews yet!</div>)}

        </div>
    </div>
  );
};

export default ItemDescription;
