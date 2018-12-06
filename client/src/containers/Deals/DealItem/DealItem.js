import React, { Component } from "react";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import {
  _loadDealItem,
  handleCustomizingSize,
  handleCustomizingColor,
  handleFullNameInput,
  handleAddressInput,
  handleCityInput,
  handleZipcodeInput,
  handleShippingStateInput,
  handleSelectedCrypto,
  handleCustomizingStep,
  handleShippingStep,
  handlePayingStep} from "../../../actions/dealItemActions";
import { _fetchTransactionInfo } from "../../../actions/paymentActions";
import { Carousel } from "react-responsive-carousel";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";

class DealItem extends Component {
  componentDidMount = async () => {
    //return the param value
    await this.props._isLoggedIn(localStorage.getItem('token'));

    if (await this.props.userLoggedIn) {
      const { deal_name } = await this.props.match.params;
      await this.props._loadDealItem(deal_name);

    }else{
        // localStorage.removeItem('token');
        await this.props.history.push('/');
    }

  }

  //set the options to select crypto from
  //this function is needed to change the format of objects to be able to used for react select
  handleCryptoOptions = (acceptedCryptos) => {
    let options = [];
    acceptedCryptos.map(crypto => {

      let optionObj = {};
      optionObj.value = crypto.crypto_symbol;
      optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
      optionObj.logo = crypto.crypto_logo;
      optionObj.name = crypto.crypto_name;

      options.push(optionObj);
    })

    return options;
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  timeInMilliseconds = (sec) => {
    return sec * 1000
  }

  createPaymentHandler = (event) => {
    event.preventDefault();
    const { dealItem,
            selectedOption,
            shippingAddress,
            shippingCity,
            zipcode,
            shippingState,
            fullName,
            selectedSize,
            selectedColor } = this.props;

    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = dealItem.deal_id;
    let amount = dealItem.pay_in_crypto;
    let crypto_symbol = selectedOption.value;
    let crypto_name = selectedOption.name;
    let token = localStorage.getItem('token');

    this.props._fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token, shippingAddress, shippingCity, zipcode, shippingState, fullName, selectedSize, selectedColor);
  }

  handleCustomizationValidation = () => {
    const validateNewInput = {
      selectedColorValue: this.props.selectedColor,
      selectedSizeValue: this.props.selectedSize
    }
    let isDataValid = false;

    //Object.keys(validateNewInput) give us an array of keys
    //Array.every check if all indices passed the test
    //we check if the value of each property in the the object validateNewInput is === true
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] ? true : false
    })) {
      isDataValid = true;
    } else {
      document.getElementById("select-size-error").innerHTML = this._validationErrors(validateNewInput).sizeValMsg;

      document.getElementById("select-color-error").innerHTML = this._validationErrors(validateNewInput).colorValMsg;

    }

    return isDataValid;
  }

  handleShipmentValidation = () => {

    const validateNewInput = {
      enteredFullname: this.props.fullName,
      enteredShippingAddress: this.props.shippingAddress,
      enteredShippingCity: this.props.shippingCity,
      enteredZipcode: this.props.zipcode,
      selectedShippingState: this.props.shippingState
    }
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] ? true : false
    })) {
      isDataValid = true;
    } else {
      // document.getElementById("fullname").classList.add("dealitem-error-msg");

      document.getElementById("fullname").innerHTML = this._validationErrors(validateNewInput).fullNameValMsg;
      document.getElementById("shipping-address-error").innerHTML = this._validationErrors(validateNewInput).shippingAddressValMsg;
      document.getElementById("shipping-city-error").innerHTML = this._validationErrors(validateNewInput).shippingCityValMsg;
      document.getElementById("shipping-zipcode-error").innerHTML = this._validationErrors(validateNewInput).zipcodeValMsg;
      document.getElementById("shipping-state-error").innerHTML = this._validationErrors(validateNewInput).shippingStateValMsg;
    }

    return isDataValid;
  }

  _validationErrors(val) {
    const errMsgs = {
      colorValMsg: val.selectedColorValue ? null : 'Please select a color',
      sizeValMsg: val.selectedSizeValue ? null : 'Please select a size',
      fullNameValMsg: val.enteredFullname ? null : 'Please enter your full name',
      shippingAddressValMsg: val.enteredShippingAddress ? null : 'Please enter your shipping address',
      shippingCityValMsg: val.enteredShippingCity ? null : 'Please enter your shipping city',
      zipcodeValMsg: val.enteredZipcode ? null : 'Please enter your zip code',
      shippingStateValMsg: val.selectedShippingState ? null : 'Please select your state',
    }

    return errMsgs;
  }

  render() {
    const { //state
            error,
            loading,
            dealItem,
            acceptedCryptos,
            selectedSize,
            selectedColor,
            fullName,
            shippingAddress,
            shippingCity,
            zipcode,
            shippingState,
            selectedOption,
            paymentInfo,
            createPaymentButtonClicked,
            showCustomizationStep,
            showShippingStep,
            showPayingStep,

            //actions
            handleCustomizingSize,
            handleCustomizingColor,
            handleFullNameInput,
            handleAddressInput,
            handleCityInput,
            handleZipcodeInput,
            handleShippingStateInput,
            handleSelectedCrypto,

            handleCustomizingStep,
            handleShippingStep,
            handlePayingStep,

            userLoggedIn} = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    // const steps = [
    //   { name: "Customizing",
    //     component:
    //     <CustomizeOrder
    //     handle_CustomizingSize={this.props.handleCustomizingSize}
    //     handle_CustomizingColor={this.props.handleCustomizingColor}/>},
    //   { name: "Shipping",
    //     component:
    //     <ShipOrder
    //     SubmitPayment={this.createPaymentHandler}
    //     handle_ShippingFullName={this.props.handleFullNameInput}
    //     handle_ShippingAddress={this.props.handleAddressInput}
    //     handle_ShippingCity={this.props.handleCityInput}
    //     handle_ShippingZipcode={this.props.handleZipcodeInput}
    //     handle_ShippingState={this.props.handleShippingStateInput}/> },
    //   { name: "Payment", component:
    //     <PurchaseOrder
    //     cryptos={acceptedCryptos && this.handleCryptoOptions(acceptedCryptos)}
    //     selectCrypto={this.props.handleSelectedCrypto}

    //     SubmitPayment={this.createPaymentHandler}
    //     transactionInfo={paymentInfo}
    //     cryptoSymbol={selectedOption && selectedOption.value}
    //     paymentButtonClicked={createPaymentButtonClicked}

    //     showLoadingSpinner={loading}
    //     timeout={paymentInfo && this.timeInMilliseconds(paymentInfo.timeout)}/> }
    // ];

    return (
      <div>
        <Layout>
        <div>
          <div className="deal-container">
            <div className="deal-header">

              <div className="deal-item-header">
                <div className="deal-item-name">
                  <strong>{dealItem && dealItem.deal_name}</strong> <br/>
                  <small> Offered By: {dealItem && dealItem.venue_name}</small>
                </div>
                <div className="deal-item-cost">
                  <strong>Pay in Crypto:  ${dealItem && dealItem.pay_in_crypto}</strong>  <small className="deal-item-discount">
                  {dealItem && this.convertToPercentage(dealItem.pay_in_dollar, dealItem.pay_in_crypto)}% OFF</small> <br/>
                  <small>Pay in Dollar:  ${dealItem && dealItem.pay_in_dollar} <br/></small>
                </div>
              </div>

              <div className="deal-item-summary">
                  <div className="customize-item-summary">
                    <strong>Customizing</strong> <br/>
                    <small>{selectedSize}</small> <br/>
                    <small>{selectedColor}</small> <br/>
                  </div>

                  <div className="customize-item-shipping">
                    <strong>Shipping</strong> <br/>
                    <small>{fullName}</small> <br/>
                    <small>{shippingAddress}</small> <br/>
                    <small>{shippingCity} </small>
                    <small>{shippingState} </small>
                    <small>{zipcode}</small>
                  </div>

                  <div className="customize-item-payment">
                    <div className="crypto_logo">
                      <strong>Payment</strong> <br/>
                      {selectedOption ?  <img src={selectedOption.logo} alt="cryptoLogo" /> : null}
                    </div>
                  </div>
              </div>
            </div>
            <div>
              {/* classname is ui steps indiate using sematic ui */}
              <div className="ui steps">
                <a onClick={handleCustomizingStep} className={showCustomizationStep ? "active step" : "step"}>
                  <i className="edit icon"></i>
                  <div className="content">
                    <div className="title">Customizing</div>
                    <div className="description">Choose your size or color</div>
                  </div>
                </a>
                <a onClick={() => this.handleCustomizationValidation() && handleShippingStep()} className={showShippingStep ? "active step" : "step"}>
                <i className="truck icon"></i>
                  <div className="content">
                    <div className="title">Shipping</div>
                    <div className="description">Enter shipping information</div>
                  </div>
                </a>
                <a onClick={() => this.handleShipmentValidation() && handlePayingStep()} className={showPayingStep ? "active step" : "step"}>
                <i className="shopping cart icon"></i>
                  <div className="content">
                    <div className="title">Paying</div>
                    <div className="description">Choose your payment</div>
                  </div>
                </a>
              </div>

            </div>

            <div className="deal-main-info">
              <div className="deal-images-container">
                <Carousel
                  className="react-carousel"
                  width={"55%"}
                  showStatus={false}>

                  {dealItem && dealItem.deal_image.map(img => (
                    <div className="deal-item-image">
                      <img src={img} />
                    </div>
                  ))}

                </Carousel>
              </div>

              <div className="deal-checkout-container mt-5">
                <div className="step-progress">
                  {showCustomizationStep &&
                  <CustomizeOrder
                  handle_CustomizingSize={handleCustomizingSize}
                  handle_CustomizingColor={handleCustomizingColor}
                  next_step={handleShippingStep}
                  validateCustomizationData={this.handleCustomizationValidation}/>}

                  {showShippingStep &&
                  <ShipOrder
                  handle_ShippingFullName={handleFullNameInput}
                  handle_ShippingAddress={handleAddressInput}
                  handle_ShippingCity={handleCityInput}
                  handle_ShippingZipcode={handleZipcodeInput}
                  handle_ShippingState={handleShippingStateInput}
                  next_step={handlePayingStep}
                  previous_step={handleCustomizingStep}
                  validateShipmentData={this.handleShipmentValidation}/>}

                  {showPayingStep &&
                  <PurchaseOrder
                  cryptos={acceptedCryptos && this.handleCryptoOptions(acceptedCryptos)}
                  selectCrypto={handleSelectedCrypto}

                  previous_step={handleShippingStep}
                  SubmitPayment={this.createPaymentHandler}
                  transactionInfo={paymentInfo}
                  cryptoSymbol={selectedOption && selectedOption.value}
                  paymentButtonClicked={createPaymentButtonClicked}

                  showLoadingSpinner={loading}
                  timeout={paymentInfo && this.timeInMilliseconds(paymentInfo.timeout)}/>}

                </div>
              </div>

            </div>

          </div>
        </div>
        </Layout >
      </div>
    );
  }
}


const mapStateToProps = state => ({
  dealItem: state.DealItem.dealItem,
  acceptedCryptos: state.DealItem.acceptedCryptos,
  selectedSize: state.DealItem.selectedSize,
  selectedColor: state.DealItem.selectedColor,
  fullName: state.DealItem.fullName,
  shippingAddress: state.DealItem.shippingAddress,
  shippingCity: state.DealItem.shippingCity,
  zipcode: state.DealItem.zipcode,
  shippingState: state.DealItem.shippingState,
  selectedOption: state.DealItem.selectedOption,
  paymentInfo: state.TransactionInfo.transactionInfo,
  createPaymentButtonClicked: state.TransactionInfo.createPaymentButtonClicked,
  loading: state.DealItem.loading,
  error: state.DealItem.error,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  showCustomizationStep: state.DealItem.showCustomizationStep,
  showShippingStep: state.DealItem.showShippingStep,
  showPayingStep: state.DealItem.showPayingStep
});


const matchDispatchToProps = dispatch =>{
  return bindActionCreators({
    _loadDealItem,
    _fetchTransactionInfo,
    handleCustomizingSize,
    handleCustomizingColor,
    handleFullNameInput,
    handleAddressInput,
    handleCityInput,
    handleZipcodeInput,
    handleShippingStateInput,
    handleSelectedCrypto,
    handleCustomizingStep,
    handleShippingStep,
    handlePayingStep,
    _isLoggedIn}, dispatch);

}

export default connect(mapStateToProps, matchDispatchToProps)(DealItem);
