import React, { Component } from "react";
import { _fetchTransactionInfo } from "../../../services/DealServices";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { _loadDealItem, handleCustomizingSize, handleCustomizingColor, handleFullNameInput, handleAddressInput } from "../../../actions/dealItemActions";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../Layout";

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: {value: "BTC", label: "Bitcoin (BTC)", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", name: "Bitcoin"},
      address: null,
      city: null,
      zipcode: null,
      shippingState: null,
      transactionInfo: null,
      paidIn: null,
      purchasing: false,
      loading: false
    };
  }

  componentDidMount() {
    //return the param value
    const { deal_name } = this.props.match.params;
    this.props._loadDealItem(deal_name);
  }

  handleSelectedCrypto = (selectedOption) => {
    this.setState({ selectedOption });
  }

  //set the options to delect crypto from
  cryptoOptions(acceptedCryptos) {
    let options = [];
    acceptedCryptos.map(crypto => {

      let optionObj = {};
      optionObj.value = crypto.crypto_symbol;
      optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
      optionObj.logo = crypto.crypto_logo;
      optionObj.name = crypto.crypto_name;

      options.push(optionObj);
    })

    return options
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

  // handleAddressInput= event => {
  //   this.setState({address: event.target.value})
  // }

  handleCityInput= event => {
    this.setState({city: event.target.value})
  }

  handleZipcodeInput= event => {
    this.setState({zipcode: event.target.value})
  }


  handleShippingStateInput= event => {
    this.setState({shippingState: event.target.value})
  }

  createPaymentHandler = (event, dealItem) => {
    event.preventDefault();
    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = dealItem.deal_id;
    let amount = dealItem.pay_in_crypto;
    // let user_id = '4' //hardcoded user_id for now. Need to grab user_id dynamically
    let crypto_symbol = this.state.selectedOption.value;
    let crypto_name = this.state.selectedOption.name;
    let token = localStorage.getItem('token');

    this.setState({loading: true}, () => {
      return _fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token)
      .then(transactionInfo => {
        this.setState(
          { loading: false,
            transactionInfo,
            paidIn: crypto_symbol,
            purchasing: true
          });
      });
    })
  };

  render() {

    const { error, loading, dealItem, acceptedCryptos, selectedSize, selectedColor, fullName, shippingAddress} = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    debugger

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
        handle_ShippingCity={this.handleCityInput}
        handle_ShippingZipcode={this.handleZipcodeInput}
        handle_ShippingState={this.handleShippingStateInput}/> },
      { name: "Payment", component:
        <PurchaseOrder
        cryptos={acceptedCryptos && this.cryptoOptions(acceptedCryptos)}
        cryptoSelected={this.state.selectedOption}
        selectCrypto={this.handleSelectedCrypto}
        SubmitPayment={this.createPaymentHandler}
        transactionInfo={this.state.transactionInfo}
        cryptoSymbol={this.state.paidIn}
        paymentButtonClicked={this.state.purchasing}
        showLoadingSpinner={this.state.loading}
        timeout={this.state.transactionInfo && this.convertSecondToMinute(this.state.transactionInfo.timeout)}/> }
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
                    <small>{this.state.city} </small>
                    <small>{this.state.zipcode} </small>
                    <small>{this.state.shippingState}</small>
                  </div>

                  <div className="customize-item-payment">
                    <div className="crypto_logo">
                      <strong>Payment</strong> <br/>
                      <img src={this.state.selectedOption.logo} alt="cryptoLogo" />
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
  loading: state.DealItem.loading,
  error: state.DealItem.error
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({_loadDealItem, handleCustomizingSize, handleCustomizingColor, handleFullNameInput, handleAddressInput}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DealItem);
