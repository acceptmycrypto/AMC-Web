import React, { Component } from "react";
import "./Description.css";
import Select from "react-select";

const Description = props => {
  return (
    <div className="deal-listing-description">
      <div className="listing-description-container">
        <div className="description-titles">Give Your Listing a Name</div>
        <input
              className="description-input"
              autofocus="autofocus"
              placeholder="Enter a name that others can easily find your listing"
            />
      </div>
      <div className="listing-description-container-for-dropdown-flex">
        <div className="listing-description-container-for-dropdown">
          <div className="description-titles description-title-dropdown">Select Your Listing Category</div>
          <Select
            className = "dropdown"
            // options={cryptoOptions}
            autoBlur={false}
          />
        </div>

        <div className="listing-description-container-for-dropdown">
          <div className="description-titles description-title-dropdown">Select Your Item Condition (Optional)</div>
          <Select
            className = "dropdown"
            // options={cryptoOptions}
            autoBlur={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
