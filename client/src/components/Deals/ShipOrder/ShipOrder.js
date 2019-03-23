import React from "react";
import "./ShipOrder.css";
import Select from "react-select";

const ShipOrder = props => {
  return (
    <div>
      <div>
        <div className="text-capitalize shipping-name-label">
          Enter Shipping Information
        </div>
        <form className="shipping-form">
          <div>
            <label htmlFor="shipping-firstname">First Name</label>
            <input
              type="text"
              id="shipping-firstname"
              placeholder="Enter First Name"
              onChange={props.handle_ShippingFirstName}
              value={
                props.showShippingFirstName ? props.showShippingFirstName : null
              }
            />
          </div>

          <div>
            <label htmlFor="shipping-lastname">Last Name</label>
            <input
              type="text"
              id="shipping-lastname"
              placeholder="Enter Last Name"
              onChange={props.handle_ShippingLastName}
              value={
                props.showShippingLastName ? props.showShippingLastName : null
              }
            />
          </div>

          <div>
            <label htmlFor="shipping-address">Address</label>
            <input
              type="text"
              id="shipping-address"
              placeholder="Enter Address"
              onChange={props.handle_ShippingAddress}
              value={
                props.showShippingAddress ? props.showShippingAddress : null
              }
            />
          </div>

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

          <div className="shipping-state">
            <label htmlFor="selectstate">State</label>
            <Select
              id="shipping-state"
              options={props.listOfAllStates}
              placeholder="Select State"
              onChange={props.handle_ShippingState}
              value={props.showShippingState}
            />
          </div>

          <div>
            <label htmlFor="shipping-zipcode">Zip Code</label>
            <input
              type="text"
              id="shipping-zipcode"
              placeholder="Enter Postal Code"
              onChange={props.handle_ShippingZipcode}
              value={
                props.showShippingZipcode ? props.showShippingZipcode : null
              }
            />
          </div>

          {props.user_status === "guest" && (
            <div>
              <div>
                <label htmlFor="shipping-email">Email</label>
                <input
                  type="text"
                  id="shipping-email"
                  placeholder="Enter Email"
                  onChange={props.handle_ShippingEmail}
                  value={
                    props.showShippingEmail ? props.showShippingEmail : null
                  }
                />
              </div>

              <div>
                <label htmlFor="shipping-phone-number">Phone Number</label>
                <input
                  type="text"
                  id="shipping-phone-number"
                  placeholder="Enter Phone Number"
                  onChange={props.handle_ShippingPhoneNumber}
                  value={
                    props.showShippingPhoneNumber
                      ? props.showShippingPhoneNumber
                      : null
                  }
                />
              </div>
            </div>
          )}
        </form>
      </div>

      <div
        className={
          props.user_status === "guest"
            ? "guest-shipping-step-buttons"
            : "shipping-step-buttons"
        }
      >
        <div onClick={props.previous_step} className="previous-step">
          <button>Previous</button>
        </div>

        <div
          onClick={() => props.validateShipmentData() && props.next_step()}
          className="next-step"
        >
          <button>Select Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ShipOrder;
