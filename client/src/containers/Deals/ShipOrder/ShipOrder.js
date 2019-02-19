import React from "react";
import "./ShipOrder.css";
import Select from "react-select";

const ShipOrder = props => {
  return (
    <div>
      <div>
        <div className="text-capitalize shipping-name-label">Enter Shipping Information</div>
        <form className="shipping-form">

          <div>
            <label htmlFor="shipping-firstname">First Name</label>
            <input
              type="text"
              id="shipping-firstname"
              placeholder="Enter First Name"
              onChange={props.handle_ShippingFirstName}
              value={props.showShippingFirstName ? props.showShippingFirstName : null}
            />
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-firstname-error"></div> */}

          <div>
            <label htmlFor="shipping-lastname">Last Name</label>
            <input
              type="text"
              id="shipping-lastname"
              placeholder="Enter Last Name"
              onChange={props.handle_ShippingLastName}
              value={props.showShippingLastName ? props.showShippingLastName : null}
            />
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-lastname-error"></div> */}

          <div>
            <label htmlFor="shipping-address">Address</label>
            <input
              type="text"
              id="shipping-address"
              placeholder="Enter Address"
              onChange={props.handle_ShippingAddress}
              value={props.showShippingAddress ? props.showShippingAddress : null}
            />
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-address-error"></div> */}

          <div>
            <label htmlFor="shipping-city">City</label>
            <input
              type="text"
              id="shipping-city"
              placeholder="Enter City"
              onChange={props.handle_ShippingCity}
              value={props.showShippingCity ? props.showShippingCity : null}
            />
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-city-error"></div> */}

          <div className="shipping-state">
            <label htmlFor="selectstate">State</label>
            <Select
              id="shipping-state"
              options={props.listOfAllStates}
              placeholder="Select State"
              onChange={props.handle_ShippingState}
              value={props.showShippingState}
            >

            </Select>
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-state-error"></div> */}

          <div>
            <label htmlFor="shipping-zipcode">Zip Code</label>
            <input
              type="text"
              id="shipping-zipcode"
              placeholder="Enter Postal Code"
              onChange={props.handle_ShippingZipcode}
              value={props.showShippingZipcode ? props.showShippingZipcode : null}
            />
          </div>
          {/* <div className="dealitem-error-msg" id="shipping-zipcode-error"></div> */}

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
