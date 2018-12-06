import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";
import Checkout from "../../../components/Checkout";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

const PurchaseOrder = props => {
  return (
    <div>
      {!props.paymentButtonClicked ?
      <div>
        <form>
          <div class="form-group">
            <label className="text-capitalize" htmlFor="select_crypto">Select the Cryptocurrency to pay with</label>
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

        <div onClick={props.previous_step} id="previous-step">
          <button>Previous</button>
        </div>


        <div onClick={() => props.validatePaymentData() && props.SubmitPayment()} id="next-step">
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
