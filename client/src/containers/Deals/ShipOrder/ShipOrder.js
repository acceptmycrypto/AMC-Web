import React from "react";
import "./ShipOrder.css";

const ShipOrder = props => {
  return (
    <div>
      <div className="shipping-form">
        <label className="text-capitalize shipping-name-label" htmlFor="select_crypto">Enter Shipping Information</label>
        <form>
        <div class="form-group mb-1">
          <input
            type="text"
            class="form-control"
            id="firstname"
            placeholder="Enter First Name"
            onChange={props.handle_ShippingFirstName}
            value={props.showShippingFirstName ? props.showShippingFirstName : null}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-firstname-error"></div>

        <div class="form-group mb-1">
          <input
            type="text"
            class="form-control"
            id="lastname"
            placeholder="Enter Last Name"
            onChange={props.handle_ShippingLastName}
            value={props.showShippingLastName ? props.showShippingLastName : null}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-lastname-error"></div>

        <div class="form-group mb-1">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Address"
            onChange={props.handle_ShippingAddress}
            value={props.showShippingAddress ? props.showShippingAddress : null}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-address-error"></div>

        <div class="form-group mb-1">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter City"
            onChange={props.handle_ShippingCity}
            value={props.showShippingCity ? props.showShippingCity : null}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-city-error"></div>

        <select
          className="custom-select mr-sm-2"
          id="select-color"
          onChange={props.handle_ShippingState}
          value={props.showShippingState}
        >
          <option selected>Select State</option>
          {props.listOfAllStates.map((state, i) => {
            return (<option key={i} value={state.label}>{state.value}</option>)
          })}
        </select>

        <div className="dealitem-error-msg" id="shipping-state-error"></div>

        <div class="form-group mb-1">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Postal Code"
            onChange={props.handle_ShippingZipcode}
            value={props.showShippingZipcode ? props.showShippingZipcode : null}
          />
        </div>
        <div className="dealitem-error-msg" id="shipping-zipcode-error"></div>

      </form>
      </div>

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
