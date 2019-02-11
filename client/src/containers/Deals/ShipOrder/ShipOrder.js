import React from "react";
import "./ShipOrder.css";

const ShipOrder = props => {
  return (
    <div>
      <div>
        <div className="text-capitalize shipping-name-label">Enter Shipping Information</div>
        <form className="shipping-form">

          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter First Name"
              onChange={props.handle_ShippingFirstName}
              value={props.showShippingFirstName ? props.showShippingFirstName : null}
            />
          </div>
          <div className="dealitem-error-msg" id="shipping-firstname-error"></div>

          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter Last Name"
              onChange={props.handle_ShippingLastName}
              value={props.showShippingLastName ? props.showShippingLastName : null}
            />
          </div>
          <div className="dealitem-error-msg" id="shipping-lastname-error"></div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              onChange={props.handle_ShippingAddress}
              value={props.showShippingAddress ? props.showShippingAddress : null}
            />
          </div>
          <div className="dealitem-error-msg" id="shipping-address-error"></div>

          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              onChange={props.handle_ShippingCity}
              value={props.showShippingCity ? props.showShippingCity : null}
            />
          </div>
          <div className="dealitem-error-msg" id="shipping-city-error"></div>

          <div>
            <label htmlFor="selectstate">State</label>
            <select
              className="custom-select mr-sm-2"
              id="selectstate"
              onChange={props.handle_ShippingState}
              value={props.showShippingState}
            >
              <option selected>Select State</option>
              {props.listOfAllStates.map((state, i) => {
                return (<option key={i} value={state.label}>{state.value}</option>)
              })}
            </select>
          </div>
          <div className="dealitem-error-msg" id="shipping-state-error"></div>

          <div>
            <label htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              placeholder="Enter Postal Code"
              onChange={props.handle_ShippingZipcode}
              value={props.showShippingZipcode ? props.showShippingZipcode : null}
            />
          </div>
          <div className="dealitem-error-msg" id="shipping-zipcode-error"></div>

      </form>
      </div>

        <div className="shipping-step-buttons">

          <div onClick={props.previous_step} className="previous-step">
            <button>Previous</button>
          </div>

          <div onClick={() => props.validateShipmentData() && props.next_step()} className="next-step">
            <button>Next</button>
          </div>
        </div>

    </div>
  );
};

export default ShipOrder;
