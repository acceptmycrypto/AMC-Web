import React, { Component } from "react";
import "./Pricing.css";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

const Pricing = props => {
  return (
    <div>
      <div className="add-price-for-deal">
        <div className="listed-price-in-dollar">
          <div className="pricing-titles">Price in Dollar</div>
          <div className="pricing-input-row">
            <i class="fas fa-dollar-sign fa-2x" />
            <input
              autofocus="autofocus"
              className="pricing-input"
              type="number"
              placeholder="Enter your base price"
              min="0"
              onChange={props.handlePriceUSDChange}
              value={props.showPriceUSD}
              onBlur={props.validateBasePrice}
            />
          </div>
          <small className="pricing-footer-note">
            This is your price if buyer pay in USD.
          </small>
        </div>
        <div className="listed-price-in-crypto">
          <div className="listed-price-in-crypto-left">
            <div className="pricing-titles">Price after Discount</div>
            <div className="pricing-input-row">
              <i class="fas fa-dollar-sign fa-2x" />
              <input
                className="pricing-input-crypto"
                type="text"
                placeholder="0.00"
                min="0"
                value={
                  props.showPriceCrypto == "NaN"
                    ? "0.00"
                    : props.showPriceCrypto
                }
              />
            </div>
            <small className="pricing-footer-note">
              This is your price if buyer pay in Cryptocurrency.
            </small>
          </div>
          <div className="listed-price-in-crypto-right">
            <div className="create-deal-discount-percent">
              {Math.ceil(props.showDiscountPercent)}% OFF
            </div>
            <input
              onChange={props.changeDiscountPercent}
              type="range"
              min="10"
              max="100"
              defaultValue={props.showDiscountPercent}
              value={props.showDiscountPercent}
              id="percent-slider"
            />
            <div className="pricing-slider-footer-note">
              <div className="discount-pricing-title">Set your discount</div>
              <small>Minimum 10% off is required.</small>
            </div>
          </div>
        </div>
      </div>
      <div className="select-crypto-for-deal">
        <div style={{ width: "100%" }}>
          <div className="pricing-titles">Accept Cryptocurrencies</div>
          <div className="crypto-subtitle">
            Select one or more cryptocurrencies you want to accept as payment
          </div>
          <div className="crypto-logos-for-deal-listing">
            {props.cryptoOptions.map(crypto => {
              return (
                <div key={crypto.crypto_symbol}>
                  <div
                    className={
                      props.showCryptoAmount[crypto.crypto_symbol] ||
                      props.rateLoading[crypto.crypto_symbol]
                        ? "crypto-logo-image selected-crypto-logo-image"
                        : "crypto-logo-image"
                    }
                  >
                    <img
                      onClick={event =>
                        props.validateSelectedCrypto() &&
                        props.getCryptoExchange(event)
                      }
                      data-cryptosymbol={crypto.crypto_symbol}
                      src={crypto.crypto_logo}
                      alt="crypto_logo"
                    />
                    <p>{crypto.crypto_metadata_name}</p>
                  </div>
                  {props.rateLoading[crypto.crypto_symbol] && (
                    <div className="loading-spinner-on-getting-rate">
                      <i className="fa fa-spinner fa-spin" /> Loading...
                    </div>
                  )}
                  {props.showCryptoAmount[crypto.crypto_symbol] && (
                    <div className="check-crypto-amount">
                      {props.showCryptoAmount[crypto.crypto_symbol]}{" "}
                      {crypto.crypto_symbol}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <small class="pricing-footer-note">
            Please be aware that the crypto amount will be different at the time
            of purchase due to market volatility.
          </small>
          <hr className="creating-deal-hr" />
          <div className="deal-listing-step-buttons">
            <div className="creating-deal-back-step">
              <button onClick={props.showUploadingPhotoStep}>Previous</button>
            </div>

            <div className="creating-deal-next-step">
              <button
                onClick={() =>
                  props.validatePricingStep() && props.showDescriptionStep()
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
