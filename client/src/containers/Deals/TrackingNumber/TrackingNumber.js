import React, { Component } from "react";
import "./TrackingNumber.css"
import "./TrackingNumberMobile.css"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Select from "react-select";
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { updateTrackingNumber, editTrackingNumber, editTrackingCarrier, _canUpdateTracking } from "../../../actions/dealsActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class TrackingNumber extends Component {

    componentDidMount = async () => {
        let txn_id = this.props.match.params.txn_id;
        let deal_id = this.props.match.params.deal_id;

        await this.props._isLoggedIn(localStorage.getItem('token'));
        if (await !this.props.userLoggedIn) {
            await this.props.history.push(`/SignIn?redirect=${this.props.location.pathname}`);
        }
        await this.props._canUpdateTracking(localStorage.getItem('token'), txn_id, deal_id);
        await console.log("backend", this.props.backEndTrackingInfo);
        if(await this.props.backEndTrackingInfo === null || this.props.backEndTrackingInfo.length < 1){
            await this.props.history.push(`/`);
        }

    }

    handleTrackingNumberValidation = () => {
        let validateNumber = false, validateCarrier = false;
        if(this.props.trackingNumber && this.props.trackingNumber.length >= 10){
            validateNumber = true;
        }
        if(this.props.trackingCarrierSelected && this.props.trackingCarrierSelected.length > 0){
            validateCarrier = true;
        }

        const validateTracking = {
            trackingNumber: validateNumber,
            trackingCarrierSelected: validateCarrier,
        }

        let isDataValid = false;

        //Object.keys(validateNewInput) give us an array of keys
        //Array.every check if all indices passed the test
        //we check if the value of each property in the the object validateNewInput is === true
        if (Object.keys(validateTracking).every((k) => {
            return validateTracking[k] ? true : false
        })) {
            isDataValid = true;
        } else {
            if (!this.props.trackingNumber || this.props.trackingNumber.length < 10) {
                toast.error(this._validationErrors(validateTracking).notifyTrackingNumberError, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (!this.props.trackingCarrierSelected) {
                toast.error(this._validationErrors(validateTracking).notifyTrackingCarrierError, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } 
        }

        return isDataValid;
    }

    validateAndSubmitTracking = async() =>{
        let txn_id = await this.props.match.params.txn_id;
        await this.handleTrackingNumberValidation();
        await this.props.updateTrackingNumber(localStorage.getItem('token'), txn_id, this.props.trackingNumber, this.props.trackingCarrierSelected);

        if(await this.props.trackingResult.message === "success"){
            await this.props.history.push('/');
        }else{
            toast.error("Re-Submit Tracking Info", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    }

    _validationErrors(val) {
        const errMsgs = {
            notifyTrackingNumberError: val.trackingNumber ? null : 'Please enter a valid tracking number.',
            notifyTrackingCarrierError: val.trackingCarrierSelected ? null : 'Please select the tracking carrier.', 
        }
        return errMsgs;
    }

    render() {

        let txn_id = this.props.match.params.txn_id;
        let deal_id = this.props.match.params.deal_id;
        let { editTrackingNumber, editTrackingCarrier, trackingNumber, trackingCarrier, updateTrackingNumber, trackingCarrierSelected, backEndTrackingInfo } = this.props;
        console.log(txn_id, deal_id, "path");
        return (
            <div className="pt-5">
                <Layout >
                    {backEndTrackingInfo !== null && <div className="text-center trackingDiv">
                        <div className="mb-1 tracking-title">Enter Tracking Info for Deal</div>
                        <div className="mb-1 tracking-title tracking-deal-title">{backEndTrackingInfo[0].deal_name}</div>
                        <div className="mb-4">Order # {txn_id}</div>
                        <div className="text-left" style={{ width: "330px" }}>Tracking Number</div>
                        <input
                            onChange={editTrackingNumber}
                            value={trackingNumber}
                            className="tracking-number mb-3"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Number"
                            style={{ width: "330px" }}
                        />
                        <div className="tracking-dropdown">
                            <div className="text-left mb-2">Tracking Carrier</div>
                            <Select
                                className="tracking-select"
                                required
                                onChange={editTrackingCarrier}
                                options={trackingCarrier}
                                isMulti={false}
                                autoBlur={false}
                            />
                        </div>

                        <div className="btn btn-info" onClick={this.validateAndSubmitTracking}>Submit</div>

                    </div>}
                </Layout >
                <ToastContainer autoClose={5000} />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    trackingNumber: state.matchedDeals.trackingNumber,
    trackingCarrier: state.matchedDeals.trackingCarrier,
    trackingCarrierSelected: state.matchedDeals.trackingCarrierSelected,
    backEndTrackingInfo: state.matchedDeals.backEndTrackingInfo,
    trackingResult: state.matchedDeals.trackingResult,
    userLoggedIn: state.LoggedIn.userLoggedIn,

});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ updateTrackingNumber, editTrackingNumber, _isLoggedIn, editTrackingCarrier, _canUpdateTracking }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(TrackingNumber);

