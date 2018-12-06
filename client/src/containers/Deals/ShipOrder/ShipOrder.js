import React from "react";
import "./ShipOrder.css";

const ShipOrder = props => {
  return (
    <div>
      <label className="text-capitalize" htmlFor="select_crypto">Enter Shipping Information</label>
      <form onSubmit={props.SubmitPayment}>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Enter Full Name"
            onChange={props.handle_ShippingFullName}
          />
        </div>
        <div className="dealitem-error-msg" id="fullname-error"></div>

         {/* document.getElementById("shipping-address-error").innerHTML = this._validationErrors(validateNewInput).shippingAddressValMsg;
      document.getElementById("shipping-city-error").innerHTML = this._validationErrors(validateNewInput).shippingCityValMsg;
      document.getElementById("shipping-zipcode-error").innerHTML = this._validationErrors(validateNewInput).zipcodeValMsg;
      document.getElementById("shipping-state-error").innerHTML = this._validationErrors(validateNewInput).shippingStateValMsg; */}

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Address"
            onChange={props.handle_ShippingAddress}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-address-error"></div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter City"
            onChange={props.handle_ShippingCity}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-city-error"></div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Postal Code"
            onChange={props.handle_ShippingZipcode}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-zipcode-error"></div>

        <select
          class="custom-select mr-sm-2"
          id="select-color"
          onChange={props.handle_ShippingState}
        >
          <option selected>Select State</option>
          <option value="CA">California</option>
          <option value="WA">Washington</option>
          <option value="ORG">Oregon</option>
        </select>
        <div className="dealitem-error-msg" id="shipping-state-error"></div>

      </form>

      <div onClick={props.previous_step} id="previous-step">
        <button>Previous</button>
      </div>

      <div onClick={() => props.validateShipmentData() && props.next_step()} id="steps-workflow">
        <button>Next</button>
      </div>
    </div>
  );
};

export default ShipOrder;
