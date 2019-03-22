import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";
import Checkout from "../../Checkout";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PaypalButton from '../../../containers/Deals/PaypalButton';

const PurchaseOrder = props => {
  return (
    <div>
      {!props.paymentButtonClicked ?
      <div className="payment-form">
        <form>
          <div class="form-group">
            <label className="text-capitalize payment-name-label" htmlFor="select_crypto">Select the Cryptocurrency to pay with</label>
              <Select
                id="select_crypto"
                required
                onChange={props.selectCrypto}
                value={props.selectedPayment}
                options={props.cryptos}
              />
          </div>
          <div className="dealitem-error-msg" id="selected-payment-error"></div>
        </form>

        <div id="payment-divider">OR</div>
        <div id="paypal-button">
          <strong>{props.isLoggedin ? "Pay in USD" : "Sign in to pay in USD"}</strong>
          {props.isLoggedin &&
          <PaypalButton
            dealItemInfo={props.deal_item}
            firstNameInfo={props.first_name}
            lastNameInfo={props.last_name}
            shippingAddressInfo={props.shipping_address}
            shippingCityInfo={props.shipping_city}
            zipcodeInfo={props.zip_code}
            shippingStateInfo={props.shipping_state}
          /> }
        </div>
        <div>
          <div onClick={props.previous_step} className="payment-previous-step button">
            <button>Previous</button>
          </div>
          <div onClick={() => props.validatePaymentData() && props.SubmitPayment()}     className="submit_payment">
          <button>Send Your Payment</button>
          </div>
        </div>
        {props.showLoadingSpinner ? <LoadingSpinner /> : null}
      </div> :
        <Checkout showTimeout={props.timeout} showTransaction={props.transactionInfo} showPaidIn={props.cryptoSymbol}/>
      }
    </div>
  );
};

export default PurchaseOrder;
