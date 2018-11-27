import React from "react";
import "./FeedCard.css";
import Timestamp from 'react-timestamp';
import { Link } from "react-router-dom";

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
                <img className="featured-image" src={transaction.featured_deal_image} width="100%"></img>
                {/* <i class="user-icon fas fa-user-circle" /> */}
              </div>
              {/* <div className="user-name">{transaction.username}</div> */}
            </div>
            <div className="user-transaction-info">
              <div>
                Purchased <Link to={`/feed/deals/${transaction.deal_name}`} ><span className="blueText">{transaction.deal_name}</span></Link> for <span className="greenText">{transaction.amount + " "}</span> 
                <span className="greenText">{transaction.crypto_symbol}</span> from <span className="blueText">{transaction.venue_name}</span>
              </div>
              <div className="timestamp">
                {/* <small><Timestamp time={transaction.date_purchased}  format='ago' precision={2} autoUpdate={60}/></small> */}
                <small><Timestamp time={transaction.date_purchased} format='full' precision={3}/></small>                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedCard;
