import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";
import Checkout from "../../../components/Checkout";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import PaypalButton from '../PaypalButton';

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
          Pay in USD via Paypal
          <PaypalButton
            dealItemInfo={props.deal_item}
            fullNameInfo={props.first_name}
            lastNameInfo={props.last_name}
            shippingAddressInfo={props.shipping_address}
            shippingCityInfo={props.shipping_city}
            zipcodeInfo={props.zip_code}
            shippingStateInfo={props.shipping_state}
          />
        </div>

        <div onClick={props.previous_step} className="previous-step">
          <button>Previous</button>
        </div>


        <div onClick={() => props.validatePaymentData() && props.SubmitPayment()} className="submit_payment">
          <button>Send Your Payment</button>
        </div>
      </div> : null}

      {props.paymentButtonClicked ?
      <Checkout showTimeout={props.timeout} showTransaction={props.transactionInfo} showPaidIn={props.cryptoSymbol}/> : null}

      {props.showLoadingSpinner ? <LoadingSpinner /> : null}

    </div>
  );
};

export default PurchaseOrder;
