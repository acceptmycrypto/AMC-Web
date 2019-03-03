import React, { Component } from 'react';
import "./PaypalButton.css";
import { withRouter } from "react-router-dom"; //we use withRouter to get access to history, location, path etc..
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { _paypal } from "../../../actions/paypalActions";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PaypalButton extends React.Component {

  componentDidUpdate() {
   if (this.props.paypal_create_payment.success) {
    window.open(this.props.paypal_create_payment.link, '_blank');
   }
  }

  render() {

    const {dealItemInfo, firstNameInfo, lastNameInfo, shippingAddressInfo, shippingCityInfo, shippingStateInfo, zipcodeInfo, _paypal, paypal_create_payment_loading} = this.props;

    return (
      <div onClick={() => {_paypal(localStorage.getItem("token"), dealItemInfo, firstNameInfo, lastNameInfo, shippingAddressInfo, shippingCityInfo, shippingStateInfo, zipcodeInfo)}} className="paypal-image-button">
          <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png" alt="Check out with PayPal" />
          {paypal_create_payment_loading ? <LoadingSpinner /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paypal_create_payment: state.TransactionInfo.paypal_create_payment,
  paypal_create_payment_loading: state.TransactionInfo.paypal_create_payment_loading,
  paypal_create_payment_error: state.TransactionInfo.paypal_create_payment_error
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _paypal }, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PaypalButton));
