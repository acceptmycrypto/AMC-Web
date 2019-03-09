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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class TrackingNumber extends Component {

    componentDidMount = async () => {

        await this.props._isLoggedIn(localStorage.getItem('token'));
        if (await !this.props.userLoggedIn) {
            await this.props.history.push(`/SignIn?redirect=${this.props.location.pathname}`);
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

    _validationErrors(val) {
        const errMsgs = {
            notifyTrackingNumberError: val.trackingNumber ? null : 'Please enter a valid tracking number.',
            notifyTrackingCarrierError: val.trackingCarrierSelected ? null : 'Please select the tracking carrier.'
        }
        return errMsgs;
      }

    validateAndSubmit = async() =>{
        let txn_id = this.props.match.params.txn_id;
        await this.handleTrackingNumberValidation();
        // await this.props.updateTrackingNumber(localStorage.getItem('token'), txn_id, this.props.trackingNumber, this.props.trackingCarrierSelected);
        await this.props.history.push('/');
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
                        <div className="mb-4 tracking-title">Enter the Tracking Information for Deal<br /> {deal_name}</div>
                        <div className="text-left" style={{ width: "330px" }}>Tracking Number</div>
                        <input
                            onChange={editTrackingNumber}
                            value={trackingNumber}
                            className="tracking-number mb-3"
                            autofocus="autofocus"
                            placeholder="Enter Tracking Number"
                            style={{ width: "330px" }}
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

                        <div className="btn btn-info" onClick={this.validateAndSubmit}>Submit</div>

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
    userLoggedIn: state.LoggedIn.userLoggedIn,
});

const matchDispatchToProps = dispatch => {

    return bindActionCreators({ updateTrackingNumber, editTrackingNumber, _isLoggedIn, editTrackingCarrier }, dispatch);

}


export default connect(mapStateToProps, matchDispatchToProps)(TrackingNumber);

