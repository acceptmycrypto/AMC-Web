import React, { Component } from 'react';
import "./ProfileFeed.css";
import FeedCard from "../FeedCard";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _loadDeals } from "../../../actions/dealsActions";

class ProfileFeed extends Component {
    render() {
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
                    :<div>
                        <h2 className="color-blueRanking text-center">Recommended Deals For You</h2>
                        
                    </div>

                }

            </div>
        );
    }
}


export default ProfileFeed;