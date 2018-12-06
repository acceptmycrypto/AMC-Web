import React from "react";
import "./CustomizeOrder.css";

const CustomizeOrder = props => {

  return (
    <div>
      <form className="form-group">
      <label className="text-capitalize" htmlFor="select_crypto">Select Size or Color</label>
        <select
          className="custom-select my-2 mr-sm-2"
          id="select-size"
          onChange={props.handle_CustomizingSize}
          value={props.showSelectedSize}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <div className="dealitem-error-msg" id="select-size-error"></div>

        <select
          className="custom-select my-3 mr-sm-2"
          id="select-color"
          onChange={props.handle_CustomizingColor}
          value={props.showSelectedColor}
        >
          <option selected value="">Select Color</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
        </select>
        <div className="dealitem-error-msg" id="select-color-error"></div>
      </form>
      <div onClick={() => props.validateCustomizationData() && props.next_step()} id="next-step">
        <button>Next</button>
      </div>
    </div>
  );
};

export default CustomizeOrder;
