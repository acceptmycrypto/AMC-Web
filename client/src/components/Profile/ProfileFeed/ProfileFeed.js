import React from "react";
import "./ProfileFeed.css";
import FeedCard from "../../Feed/FeedCard"
const ProfileFeed = props => {
    return (
        <div className="text-center">
        <div className="mb-3 mt-1">
            <span><button id="order-history-button"className="feed-button button-active">Order History</button><button id="" className="feed-button">Pending Orders</button></span>
        </div>
        <FeedCard transactions={props.transactions} />
        </div>
    );
}


export default ProfileFeed;