import React, { Component } from 'react';
import { withRouter } from "react-router-dom"; //we use withRouter to get access to history, location, path etc..
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { _paypal } from "../../../actions/paypalActions";
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PaypalButton extends React.Component {
    render() {

    const {dealItemInfo, firstNameInfo, lastNameInfo, shippingAddressInfo, shippingCityInfo, shippingStateInfo, zipcodeInfo} = this.props;

		const onSuccess = (payment) => {
      //make a post route to add info to users_purchase table
      this.props._paypal(dealItemInfo.deal_id, firstNameInfo, lastNameInfo, shippingAddressInfo, shippingCityInfo, shippingStateInfo, zipcodeInfo, payment.payerID, payment.paymentID);

      //should redirect user to the summary page (receipt)
      //right now, we just have it redirected to the dealitem page
      this.props.history.push(this.props.location.pathname);
		}

		const onCancel = (data) => {
			// User pressed "cancel" or close Paypal's popup!
      this.props.history.push(this.props.location.pathname)
		}

		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
			console.log("Error!", err);
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    //set the paypal button style
    //https://developer.paypal.com/docs/checkout/how-to/customize-button/#button-styles
    const style = {
      fundingicons: "true"
    };

		let env = 'sandbox'; // you can set here to 'production' for production
		let currency = 'USD'; // or you can set this value from your props or state
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox:    'AWq_3_dNkn5UwoN0PtYvJEhJNghZWenLiSv72aL_wTDKISVAVhDTz1KiH-8FMV1cdlD9NlJhuzku9U8k',
			production: 'AWq_3_dNkn5UwoN0PtYvJEhJNghZWenLiSv72aL_wTDKISVAVhDTz1KiH-8FMV1cdlD9NlJhuzku9U8k',
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={dealItemInfo.pay_in_dollar} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={style}/>
    );
  }
}

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _paypal }, dispatch);
}

//we set the first argument to null because we don't need matchStateToProps
export default withRouter(connect(null, matchDispatchToProps)(PaypalButton));
