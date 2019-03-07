import React, { Component } from "react";
import "./TrackingNumber.css"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { updateTrackingNumber, editTrackingNumber, editTrackingCarrier } from "../../../actions/dealsActions";






class TrackingNumber extends Component {

    componentDidMount = async () => {

        await this.props._isLoggedIn(localStorage.getItem('token'));
        if (await !this.props.userLoggedIn) {
          await this.props.history.push(`/SignIn?redirect=${this.props.location.pathname}`);
        }
      }
    render() {
       
        let txn_id = this.props.match.params.txn_id;
        let deal_name = this.props.match.params.deal_name;
        let{editTrackingNumber, editTrackingCarrier, trackingNumber, trackingCarrier, updateTrackingNumber} = this.props;
        console.log(txn_id);
        return (
            <div className="pt-5">
                <Layout >
                    {deal_name !== undefined && <div className="container mx-0 text-center">
                        <div className="mb-4" style={{color:"navy", fontSize:"20px"}}>Enter the Tracking Number for {deal_name}:</div>
                        <input
                            onChange={editTrackingCarrier}
                            value={trackingCarrier}
                            className="tracking-number"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Carrier"
                            style={{width:"300px"}}
                        />
                        <input
                            onChange={editTrackingNumber}
                            value={trackingNumber}
                            className="tracking-number"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Number"
                            style={{width:"300px"}}
                        />
                        <div className="btn btn-info ml-4" onClick={async (event)=>{await updateTrackingNumber(localStorage.getItem('token'), txn_id, trackingNumber, trackingCarrier); await this.props.history.push(`/`)}}>Submit</div>
                    </div>}
                </Layout >

            </div>

        );
    }
}

const mapStateToProps = state => ({
    trackingNumber: state.matchedDeals.trackingNumber,
    trackingCarrier: state.matchedDeals.trackingCarrier,
    userLoggedIn: state.LoggedIn.userLoggedIn,
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({updateTrackingNumber, editTrackingNumber, _isLoggedIn, editTrackingCarrier}, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(TrackingNumber);

