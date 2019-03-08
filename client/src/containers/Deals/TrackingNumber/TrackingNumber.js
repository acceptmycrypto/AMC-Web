import React, { Component } from "react";
import "./TrackingNumber.css"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Select from "react-select";
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
        let { editTrackingNumber, editTrackingCarrier, trackingNumber, trackingCarrier, updateTrackingNumber, trackingCarrierSelected } = this.props;
        console.log(txn_id);
        return (
            <div className="pt-5">
                <Layout >
                    {deal_name !== undefined && <div className="text-center trackingDiv">
                        <div className="mb-4 tracking-title">Enter the Tracking Number for <br /> {deal_name}</div>
                        <input
                            onChange={editTrackingNumber}
                            value={trackingNumber}
                            className="tracking-number"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Number"
                            style={{ width: "300px" }}
                        />
                        {/* <input
                            onChange={editTrackingCarrier}
                            value={trackingCarrier}
                            className="tracking-carrier"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Carrier"
                            style={{ width: "300px" }}
                        /> */}
                        <div className="tracking-dropdown">
                            <Select
                                className="tracking-select"
                                required
                                onChange={editTrackingCarrier}
                                options={trackingCarrier}
                                isMulti={false}
                                autoBlur={false}
                            />
                        </div>

                        <div className="btn btn-info" onClick={async (event) => { await updateTrackingNumber(localStorage.getItem('token'), txn_id, trackingNumber, trackingCarrierSelected); await this.props.history.push(`/`) }}>Submit</div>
                    </div>}
                </Layout >

            </div>

        );
    }
}

const mapStateToProps = state => ({
    trackingNumber: state.matchedDeals.trackingNumber,
    trackingCarrier: state.matchedDeals.trackingCarrier,
    rackingCarrierSelected: state.matchedDeals.trackingCarrierSelected,
    userLoggedIn: state.LoggedIn.userLoggedIn,
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ updateTrackingNumber, editTrackingNumber, _isLoggedIn, editTrackingCarrier }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(TrackingNumber);

