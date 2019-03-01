import React, { Component } from "react";
import "./Pricing.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { shippingLabelOption, _exitShippingModal, _saveShippingModal, weightOption, _showWeightModal, _sellerEarnCrypto, _sellerEarnUSD } from "../../../actions/listDealActions";
import Modal from "react-awesome-modal";

class Pricing extends Component {

  componentDidMount = () =>{
    if(this.props.shippingLabelSelection =="seller"){
      document.querySelector("#label-seller").checked = true;
    }else if(this.props.shippingLabelSelection =="prepaid"){
      document.querySelector("#label-prepaid").checked = true;
    }else{
      document.querySelector("#label-seller").checked = false;
      document.querySelector("#label-prepaid").checked = false;
    }
  }

  validateShippingLabelOption = (event) =>{
    let validation = this.props.validateSelectShippingLabel();
    if(validation){
      this.props.shippingLabelOption(event);
    }else{
      document.querySelector("#label-seller").checked = false;
      document.querySelector("#label-prepaid").checked = false;
    }
  }

  shippingOptionModal = () => {
    const{weightOption, shippingWeightSelection, shippingPriceSelection, _saveShippingModal, shippingLessThanDiscount} = this.props
    return(
      <div>
        <div>
          <div className="shipping-weight-title">Choose the Weight of your Item in POUNDS (lbs)</div>
          <hr/>
        <form className="d-flex flex-row flex-wrap" id="weightOptionForm" onChange={weightOption}>
              <div className="pr-5 mt-2">
                <input id="weight-1" type="radio" name="weightOption" className="weightOption" value={1}/> 
                <i class="fas fa-tshirt"></i>
                <span className="ml-2 weight-font">0-1 lb</span>
              </div>
              <div className="pr-5 mt-2">
                <input id="weight-3" type="radio" name="weightOption" className="weightOption" value={3}/> 
                <span className="ml-2 weight-font">1-3 lbs</span>
              </div>
              <div className="pr-5 mt-2">
                <input id="weight-10" type="radio" name="weightOption" className="weightOption" value={10}/> 
                <span className="ml-2 weight-font">3-10 lbs</span>
              </div>
              <div className="pr-5 mt-2">
                <input id="weight-20" type="radio" name="weightOption" className="weightOption" value={20}/> 
                <span className="ml-2 weight-font">10-20 lbs</span>
              </div>
              <div className="pr-5 mt-2">
                <input id="weight-40" type="radio" name="weightOption" className="weightOption" value={40}/> 
                <span className="ml-2 weight-font">20-40 lbs</span>
              </div>
              <div className="pr-5 mt-2">
                <input id="weight-70" type="radio" name="weightOption" className="weightOption" value={70}/> 
                <span className="ml-2 weight-font">40-70 lbs</span>
              </div>
        </form>
        <hr/>
        {shippingPriceSelection !== null && 
        <div>
            <div className="shipping-weight-title mt-4">The Shipping Cost That Will Be <span style={{color:"#5ED0C0"}}>Withdrawn</span> From Your Account: <span style={{color:"#5ED0C0"}}>${shippingPriceSelection}</span></div>

          {shippingLessThanDiscount &&
            <div>
            <div className="shipping-weight-title mt-4">The discount price: <span style={{color:"#5ED0C0"}}>${this.props.priceInCrypto}</span> is less than the selected shipping cost.</div>
            <div className="shipping-weight-title mt-4"> Your discount price will be adjusted to <span style={{color:"#5ED0C0"}}>${this.calcNewPrice()}</span> to include the <span style={{color:"#5ED0C0"}}>${shippingPriceSelection}</span> shipping cost that will be withdrawn from your listed price. </div>
            </div>
          }

            <div className="d-flex flex-row justify-content-between">
              <button className="weight-option-button" onClick={this.exitShippingModal}>Cancel</button>
              <button className="weight-option-button" onClick={this.evaluatePricing}>Save</button>
            </div>
        </div>
        }
        </div>
      </div>
    )
  };

  showWeightModal = () =>{
    if(this.props.shippingWeightSelection !== null){
      document.querySelector(`#weight-${this.props.shippingWeightSelection}`).checked= true;
    }else{
      document.querySelector("#weight-1").checked= false;
      document.querySelector("#weight-3").checked= false;
      document.querySelector("#weight-10").checked= false;
      document.querySelector("#weight-20").checked= false;
      document.querySelector("#weight-40").checked= false;
      document.querySelector("#weight-70").checked= false; 
    }
    this.props._showWeightModal();
  }

  exitShippingModal = () => {
    document.querySelector("#label-prepaid").checked = false;
    document.querySelector("#weight-1").checked= false;
    document.querySelector("#weight-3").checked= false;
    document.querySelector("#weight-10").checked= false;
    document.querySelector("#weight-20").checked= false;
    document.querySelector("#weight-40").checked= false;
    document.querySelector("#weight-70").checked= false;
    this.props._exitShippingModal();
  }

  calcNewPrice = () => {
    const{discountPercent, shippingPriceSelection} = this.props;

    let newPriceInCrypto = ((shippingPriceSelection) / 0.975).toFixed(2);
    // let newPriceInUSD = (newPriceInCrypto/((100-discountPercent)/100)).toFixed(2) + "";
    newPriceInCrypto += "";
    return newPriceInCrypto;
  }

  evaluatePricing = async () =>{

    let{priceInUSD, priceInCrypto, discountPercent, shippingPriceSelection} = this.props;
    
    let newPriceInCrypto, newPriceInUSD;

    let sellerReceivingPrice = (0.975 * parseFloat(priceInCrypto));
    

    if(parseFloat(shippingPriceSelection) > sellerReceivingPrice){
        newPriceInCrypto = ((parseFloat(shippingPriceSelection)) / 0.975).toFixed(2);
        newPriceInUSD = (newPriceInCrypto/((100-discountPercent)/100)).toFixed(2);
        // newPriceInCrypto += "";
        // newPriceInUSD += ""
    }else{
      newPriceInCrypto = priceInCrypto;
      newPriceInUSD = priceInUSD;
    }
    await this.props._saveShippingModal(newPriceInUSD, newPriceInCrypto);
  }

  sellerEarnUSD = () =>{
    
    let{priceInUSD, shippingPriceSelection} = this.props;

    let sellerEarns, sellerProfits; 
    if(this.props.shippingLabelSelection === "prepaid"){
      sellerEarns = ((parseFloat(priceInUSD))-(0.025 * parseFloat(priceInUSD))-(parseFloat(shippingPriceSelection))).toFixed(2);
   
    }else{
      sellerEarns = ((parseFloat(priceInUSD))-(0.025 * parseFloat(priceInUSD))).toFixed(2);
    }

    if(sellerEarns >= 0){
        sellerProfits = true;
    }else{
      sellerProfits = false;
    }

 
    this.props._sellerEarnUSD(sellerEarns, sellerProfits);

    // return sellerEarns;
    return true;

  }

  sellerEarnCrypto = () =>{
    let{priceInCrypto, shippingPriceSelection} = this.props;
    let sellerEarns, sellerProfits; 
    if(this.props.shippingLabelSelection === "prepaid"){
      sellerEarns = (((parseFloat(priceInCrypto)).toFixed(2))-((0.025 * parseFloat(priceInCrypto)).toFixed(2))-(parseFloat(shippingPriceSelection).toFixed(2))).toFixed(2);
    }else{
      sellerEarns = (((parseFloat(priceInCrypto)).toFixed(2))-((0.025 * parseFloat(priceInCrypto)).toFixed(2))).toFixed(2);
    }

    if(sellerEarns >= 0){
        sellerProfits = true;
    }else{
      sellerProfits = false;
    }

   
    this.props._sellerEarnCrypto(sellerEarns, sellerProfits);

    // return sellerEarns;
    return true;
  }
  

  render() {
    const{shippingLabelOption, shippingLabelSelection, modalVisible, _showWeightModal, priceInCrypto, priceInUSD, shippingPriceSelection, sellerProfitsCrypto, sellerProfitsUSD, sellerEarnsCrypto, sellerEarnsUSD} = this.props
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
                onChange={this.props.handlePriceUSDChange}
                value={this.props.showPriceUSD}
                onBlur={this.props.validateBasePrice}
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
                    this.props.showPriceCrypto == "NaN"
                      ? "0.00"
                      : this.props.showPriceCrypto
                  }
                />
              </div>
              <small className="pricing-footer-note">
                This is your price if buyer pay in Cryptocurrency.
              </small>
            </div>
            <div className="listed-price-in-crypto-right">
              <div className="create-deal-discount-percent">
                {this.props.showDiscountPercent}% OFF
              </div>
              <input
                onChange={this.props.changeDiscountPercent}
                type="range"
                min="10"
                max="100"
                defaultValue={this.props.showDiscountPercent}
                value={this.props.showDiscountPercent}
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
              {this.props.cryptoOptions.map(crypto => {
                return (
                  <div key={crypto.crypto_symbol}>
                    <div
                      className={
                        this.props.showCryptoAmount[crypto.crypto_symbol] ||
                          this.props.rateLoading[crypto.crypto_symbol]
                          ? "crypto-logo-image selected-crypto-logo-image"
                          : "crypto-logo-image"
                      }
                    >
                      <img
                        onClick={event =>
                          this.props.validateSelectedCrypto() &&
                          this.props.getCryptoExchange(event)
                        }
                        data-cryptosymbol={crypto.crypto_symbol}
                        src={crypto.crypto_logo}
                        alt="crypto_logo"
                      />
                      <p>{crypto.crypto_metadata_name}</p>
                    </div>
                    {this.props.rateLoading[crypto.crypto_symbol] && (
                      <div className="loading-spinner-on-getting-rate">
                        <i className="fa fa-spinner fa-spin" /> Loading...
                      </div>
                    )}
                    {this.props.showCryptoAmount[crypto.crypto_symbol] && (
                      <div className="check-crypto-amount">
                        {this.props.showCryptoAmount[crypto.crypto_symbol]}{" "}
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
              <hr/>
            </small>
            <div className="shipment-options d-flex flex-row">
              <div className="w-60">
                <div className="pricing-titles mt-3">Shipping Label Options</div>
                <div className="crypto-subtitle mb-3">
                  Choose your preferred Shipping Label Option
                </div>
                <form className="d-flex flex-row flex-wrap" id="shipmentOptionForm" onChange={(event)=>{this.validateShippingLabelOption(event)}}>
                  <div className="mr-5 ml-5 mt-3">
                    <input id="label-prepaid" type="radio" name="shipmentOption" value="prepaid"/> 
                    <span className="ml-2 shipping-font">USPS Prepaid Shipping Label  {shippingLabelSelection ==="prepaid" && <span className="btn btn-outline-info p-0 pr-2 pl-2" onClick={this.showWeightModal}>Edit</span>} </span><br/>
                    
                    <div className="small-shipping-font">We will email you a prepaid USPS Shipping label and Subtract the Shipping Cost From Your Account</div>
                  </div>
                  <div  className="mr-5 ml-5 mt-3">
                    <input id="label-seller" type="radio" name="shipmentOption" value="seller"/> 
                    <span className="ml-2 shipping-font">Ship On Your Own</span><br/>
                    <div className="small-shipping-font">You arrange your own label</div>
                  </div>

                  
                </form>
                <Modal
                  visible={modalVisible}
                  effect="fadeInUp"
                  className ="shipping-weight-modal"
                  onClickAway={() => {
                  this.exitShippingModal();
                  }}
                >
                  <div className="shipping-option-modal">
                    {this.shippingOptionModal()}
                  </div>
                </Modal>
              </div>

              <div className="d-flex flex-column w-40 ml-3 mt-3">
                <div className="pricing-titles border-bottom text-center">Price Summary</div>
                <div className="mr-2 ml-2 mt-2 d-flex flex-row">
                  <div className="w-50 pr-4 border-right">
                    {priceInUSD !== null && priceInUSD !== 'NaN' && priceInUSD.length > 0 &&
                      <div>
                        <div className="text-center mb-2 pricing-titles" style={{color: "navy"}}>Buyer Purchases with USD</div>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font">USD Listed Price:</div>
                          <div className="shipping-font"> <strong>${(parseFloat(priceInUSD)).toFixed(2)}</strong></div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font">Selling Fee (2.5%):</div>
                          <div className="shipping-font" style={{color:"red"}}>  - ${(0.025 * parseFloat(priceInUSD)).toFixed(2)}</div>
                      </div>
                      {shippingLabelSelection === "prepaid" && shippingPriceSelection !== null && shippingPriceSelection !== 'NaN' && shippingPriceSelection.length > 0 &&
                        <div>
                          <div className="d-flex flex-row justify-content-between">
                            <div className="shipping-font">Shipping Cost: </div>
                            <div className="shipping-font" style={{color:"red"}}>  - ${shippingPriceSelection}</div>
                          </div>
                          {this.sellerEarnUSD() &&
                            <div className="d-flex flex-row justify-content-between">
                              <div className="shipping-font" style={{color:"navy"}}> <strong>YOU EARN (USD):  </strong></div>
                              {sellerProfitsUSD !== null && sellerEarnsUSD !== null && <div className="shipping-font" style={{color:"navy"}}> <strong> {sellerProfitsUSD ? "$" : " - $"} {Math.abs(sellerEarnsUSD).toFixed(2)}</strong></div>}
                            </div>
                          }
                        </div>
                      }
                      { shippingLabelSelection === "seller" && this.sellerEarnUSD() && 
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font" style={{color:"navy"}}><strong>YOU EARN (USD):</strong> </div>
                          { sellerProfitsUSD !== null && sellerEarnsUSD !== null && <div className="shipping-font" style={{color:"navy"}}> <strong> {sellerProfitsUSD ? "$" : " - $"} {Math.abs(sellerEarnsUSD).toFixed(2)}</strong></div>}
                        </div>
                      }

                    </div>
                    }
                  </div>
                  <div className="w-50 ml-4">
                    {priceInUSD !== null && priceInUSD !== 'NaN' && priceInUSD.length > 0 && priceInCrypto !== null && priceInCrypto !== 'NaN' && priceInCrypto.length > 0 && 
                      <div>
                        <div className="text-center mb-2 pricing-titles" style={{color: "navy"}}>Buyer Purchases with Crypto</div>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font">Crypto Listed Price:</div>
                          <div className="shipping-font"><strong>${parseFloat(priceInCrypto).toFixed(2)}</strong></div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font">Selling Fee (2.5%):</div>
                          <div className="shipping-font" style={{color:"red"}}>  - ${(0.025 * parseFloat(priceInCrypto)).toFixed(2)}</div>
                        </div>
                        {shippingLabelSelection === "prepaid" && shippingPriceSelection !== null && shippingPriceSelection !== 'NaN' && shippingPriceSelection.length > 0 && 
                          <div>
                            <div className="d-flex flex-row justify-content-between">
                              <div className="shipping-font">Shipping Cost: </div>
                              <div className="shipping-font" style={{color:"red"}}>  - ${shippingPriceSelection}</div>
                            </div>
                            {this.sellerEarnCrypto() && 
                              <div className="d-flex flex-row justify-content-between">
                                <div className="shipping-font" style={{color:"navy"}}> <strong>YOU EARN (Crypto): </strong></div>
                                {sellerProfitsCrypto !== null && sellerEarnsCrypto !== null && <div className="shipping-font" style={{color:"navy"}}> <strong> {sellerProfitsCrypto ? "$" : " - $"} {Math.abs(sellerEarnsCrypto).toFixed(2)}</strong></div>}
                              </div>
                            }
                          </div>
                        }
                        { shippingLabelSelection === "seller" && this.sellerEarnCrypto() && 
                        <div className="d-flex flex-row justify-content-between">
                          <div className="shipping-font" style={{color:"navy"}}><strong>YOU EARN (Crypto):</strong> </div>
                          {sellerProfitsCrypto !== null && sellerEarnsCrypto !== null && <div className="shipping-font" style={{color:"navy"}}> <strong>{sellerProfitsCrypto ? "$" : " - $"} {Math.abs(sellerEarnsCrypto).toFixed(2)}</strong></div>}
                        </div>
                      }
                      </div>
                    }
                  </div>
                  
                </div>
              </div>
              
            </div>
            
            <hr className="creating-deal-hr" />
            <div className="deal-listing-step-buttons">
              <div className="creating-deal-back-step">
                <button onClick={this.props.showUploadingPhotoStep}>Previous</button>
              </div>

              <div className="creating-deal-next-step">
                <button
                  onClick={() =>
                    this.props.validatePricingStep() && this.props.showDescriptionStep()
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

  }
};

const mapStateToProps = state => ({
  shippingLabelSelection: state.CreateDeal.shippingLabelSelection,
  shippingWeightSelection: state.CreateDeal.shippingWeightSelection,
  shippingPriceSelection: state.CreateDeal.shippingPriceSelection,
  modalVisible: state.CreateDeal.modalVisible,  
  discountPercent: state.CreateDeal.discountPercent,
  priceInUSD: state.CreateDeal.priceInUSD,
  priceInCrypto: state.CreateDeal.priceInCrypto,
  shippingLessThanDiscount: state.CreateDeal.shippingLessThanDiscount,
  sellerProfitsCrypto: state.CreateDeal.sellerProfitsCrypto,
  sellerProfitsUSD: state.CreateDeal.sellerProfitsUSD,
  sellerEarnsCrypto: state.CreateDeal.sellerEarnsCrypto,
  sellerEarnsUSD: state.CreateDeal.sellerEarnsUSD,

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      shippingLabelOption,
      _exitShippingModal,
      weightOption,
      _saveShippingModal,
      _showWeightModal, 
      _sellerEarnCrypto,
      _sellerEarnUSD
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Pricing)
);


