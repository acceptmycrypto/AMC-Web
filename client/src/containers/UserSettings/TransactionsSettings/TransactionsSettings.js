
import React, { Component } from "react";
import "./TransactionsSettings.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Timestamp from 'react-timestamp';
import { Link } from "react-router-dom";
import { _allTransactions } from "../../../actions/settingsActions";
import { _loadProfile } from "../../../actions/userLoadActions";




class TransactionsSettings extends Component {

    componentDidMount() {
        // this.props._allTransactions(localStorage.getItem('token'));
        this.props._loadProfile(localStorage.getItem("token"));


    }
    render() {


        return (
            <div className="w-100 mx-0 text-center">


                <h1 className="text-center lightBlueText py-3"> Order Details </h1>
                <hr></hr>

                <div className="w-75 mx-auto">

                    {this.props.transactions.map((transaction, i) => (
                        <div key={i} className="feed-card ">
                            <div className="card-content">
                                <div className="user-info">
                                    <div className="mt-3">
                                        {/* {(transaction.photo.indexOf("fa-user") !== -1)
                                                ? <i className={'fas py-2 px-2 user-icon-shaded-small ' + transaction.photo}></i>
                                                 : <img src={transaction.photo}></img>
                                        } */}
                                        <Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} ><img className="featured-image" src={transaction.featured_deal_image} width="100%"></img></Link>
                                        {/* <i class="user-icon fas fa-user-circle" /> */}
                                    </div>
                                    {/* <div className="user-name">{transaction.username}</div> */}
                                </div>
                                <div className="user-transaction-info text-left">
                                    {transaction.status === "100" && <div>
                                        <div>Purchased <Link to={`/feed/deals/${transaction.deal_id}/${transaction.deal_name}`} ><span className="blueText">{transaction.deal_name}</span></Link></div>
                                        <div>For <span className="greenText">{transaction.amount + " "}</span><span className="greenText">{transaction.crypto_symbol}</span></div>
                                        <div>Sold By <span className="blueText">{transaction.venue_name || transaction.seller_name}</span></div>
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
                                        <small><Timestamp time={transaction.date_purchased} format='full' precision={3} /></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        );
    }
}



const mapStateToProps = state => ({
    // transactionInfo: state.Settings.transactionInfo
    transactions: state.UserInfo.transactions,

});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ _loadProfile }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(TransactionsSettings);

