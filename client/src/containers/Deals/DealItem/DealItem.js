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
  handleSelectedCrypto } from "../../../actions/dealItemActions";
import { _fetchTransactionInfo } from "../../../actions/paymentActions";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";


class DealItem extends Component {
  componentDidMount() {
    //return the param value
    this.props._isLoggedIn(localStorage.getItem('token'));
    const { deal_name } = this.props.match.params;
    this.props._loadDealItem(deal_name);

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

  convertSecondToMinute = (sec) => {

      sec = Number(sec);
      let h = Math.floor(sec / 3600); //1400
      let m = Math.floor(sec % 3600 / 60); //0
      let s = Math.floor(sec % 3600 % 60); //0

      let hDisplay = h > 0 ? h + (":") : "00:";
      let mDisplay = m > 0 ? m + (":") : "00:";
      let sDisplay = s > 0 ? s : "00";

      return hDisplay + mDisplay + sDisplay;

  }

  createPaymentHandler = (event) => {
    event.preventDefault();
    const { dealItem, selectedOption } = this.props;
    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = dealItem.deal_id;
    let amount = dealItem.pay_in_crypto;
    // let user_id = '4' //hardcoded user_id for now. Need to grab user_id dynamically
    let crypto_symbol = selectedOption.value;
    let crypto_name = selectedOption.name;
    let token = localStorage.getItem('token');

    this.props._fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token);
  }

  render() {

    const { error,
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
            userLoggedIn} = this.props;


    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    
    if (userLoggedIn) {
      console.log("user logged in");
      
    }else{
      // localStorage.removeItem('token');
      this.props.history.push('/');
    }


    const steps = [
      { name: "Customizing",
        component:
        <CustomizeOrder
        handle_CustomizingSize={this.props.handleCustomizingSize}
        handle_CustomizingColor={this.props.handleCustomizingColor}/>},
      { name: "Shipping",
        component:
        <ShipOrder
        handle_ShippingFullName={this.props.handleFullNameInput}
        handle_ShippingAddress={this.props.handleAddressInput}
        handle_ShippingCity={this.props.handleCityInput}
        handle_ShippingZipcode={this.props.handleZipcodeInput}
        handle_ShippingState={this.props.handleShippingStateInput}/> },
      { name: "Payment", component:
        <PurchaseOrder
        cryptos={acceptedCryptos && this.handleCryptoOptions(acceptedCryptos)}
        selectCrypto={this.props.handleSelectedCrypto}

        SubmitPayment={this.createPaymentHandler}
        transactionInfo={paymentInfo}
        cryptoSymbol={selectedOption && selectedOption.value}
        paymentButtonClicked={createPaymentButtonClicked}

        showLoadingSpinner={loading}
        timeout={paymentInfo && this.convertSecondToMinute(paymentInfo.timeout)}/> }
    ];

    return (
      <div>
        <Layout/>
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

              <div className="deal-checkout-container">
                <div className="step-progress">
                  <StepZilla steps={steps}/>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    _isLoggedIn}, dispatch);

}

export default connect(mapStateToProps, matchDispatchToProps)(DealItem);
