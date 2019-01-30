import React, { Component } from "react";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _loadDealItem,
  handleFirstNameInput,
  handleLastNameInput,
  handleAddressInput,
  handleCityInput,
  handleZipcodeInput,
  handleShippingStateInput,
  handleSelectedCrypto,
  handleDetailStep,
  handleShippingStep,
  handlePayingStep} from "../../../actions/dealItemActions";
import {resetListDeal} from "../../../actions/listDealActions";
import { _fetchTransactionInfo } from "../../../actions/paymentActions";
import { _createChatSession } from "../../../actions/chatActions";
import { Carousel } from "react-responsive-carousel";
import ItemDescription from "../ItemDescription";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { _loadReviews } from "../../../actions/reviewsActions";
import { _loadProfile } from "../../../actions/userLoadActions";
import { EditorState, convertFromRaw } from 'draft-js';

class DealItem extends Component {
  componentDidMount = async () => {
    //return the param value
    await this.props._isLoggedIn(localStorage.getItem('token'));

    if (await this.props.userLoggedIn) {
      debugger
      await this.props._loadProfile(localStorage.getItem('token'));
      const { deal_name, id } = await this.props.match.params;
      await this.props._loadDealItem(id, deal_name);
      console.log(this.props.dealItem.seller_id);
      let seller_id = this.props.dealItem.seller_id || this.props.dealItem.venue_id;
      await this.props._loadReviews(seller_id);



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

  createPaymentHandler = () => {

    const { dealItem,
            selectedOption,
            shippingAddress,
            shippingCity,
            zipcode,
            shippingState,
            firstName,
            lastName} = this.props;

    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = dealItem.deal_id;
    let amount = dealItem.pay_in_crypto;
    let crypto_symbol = selectedOption.value;
    let crypto_name = selectedOption.name;
    let token = localStorage.getItem('token');

    this.props._fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token, shippingAddress, shippingCity, zipcode, shippingState, firstName, lastName);
  }

  handleShipmentValidation = () => {

    const validateNewInput = {
      enteredFirstname: this.props.firstName,
      enteredLastname: this.props.lastName,
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

      document.getElementById("shipping-firstname-error").innerHTML = this._validationErrors(validateNewInput).firstNameValMsg;
      document.getElementById("shipping-lastname-error").innerHTML = this._validationErrors(validateNewInput).lastNameValMsg;
      document.getElementById("shipping-address-error").innerHTML = this._validationErrors(validateNewInput).shippingAddressValMsg;
      document.getElementById("shipping-city-error").innerHTML = this._validationErrors(validateNewInput).shippingCityValMsg;
      document.getElementById("shipping-zipcode-error").innerHTML = this._validationErrors(validateNewInput).zipcodeValMsg;
      document.getElementById("shipping-state-error").innerHTML = this._validationErrors(validateNewInput).shippingStateValMsg;
    }

    return isDataValid;
  }

  handlePaymentValidation = () => {

    const validateNewInput = {
      selectedPaymentOption: this.props.selectedOption,
    }
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] ? true : false
    })) {
      isDataValid = true;
    } else {

      document.getElementById("selected-payment-error").innerHTML = this._validationErrors(validateNewInput).selectedPaymentValMsg;
    }

    return isDataValid;
  }

  _validationErrors(val) {
    const errMsgs = {
      firstNameValMsg: val.enteredFirstname ? null : 'Please enter your first name',
      lastNameValMsg: val.enteredLastname ? null : 'Please enter your last name',
      shippingAddressValMsg: val.enteredShippingAddress ? null : 'Please enter your shipping address',
      shippingCityValMsg: val.enteredShippingCity ? null : 'Please enter your shipping city',
      zipcodeValMsg: val.enteredZipcode ? null : 'Please enter your zip code',
      shippingStateValMsg: val.selectedShippingState ? null : 'Please select your state',
      selectedPaymentValMsg: val.selectedPaymentOption ? null : 'Please select your payment option'
    }

    return errMsgs;
  }

  ratingDisplay = (rating) => {
    let star = <i class="fa fa-star" aria-hidden="true"></i>;
    let halfStar = <i class="fas fa-star-half-alt"></i>;
    let emptyStar = <i class="far fa-star" aria-hidden="true"></i>;
    let result = [];
    if(rating === 0)
    {
      result.push(emptyStar,emptyStar,emptyStar,emptyStar,emptyStar);
      return result;
    }
    if(rating%1 == 0)
    {
      for (let i = 1; i <= 5; i++)
      {
        if(i<=rating)
        {
          result.push(star);
        }
        else
        {
          result.push(emptyStar);
        }
      }
    }
    else
    {
        let rem = rating%1;
        let baseRating = Math.floor(rating);
        for(let i = 0; i < 5; i++)
        {
          if(i <= rating)
          {
            if(i !== baseRating)
            {
              result.push(star);
            }
            else if(i == baseRating && rem<=0.25) //this might not be quite right
            {
              result.push(halfStar);
            }
            else if(i == baseRating && rem>0.25 && rem<0.75)
            {
              result.push(halfStar);
            }
            else
            {
              result.push(star);
            }

          }
          else
          {
              result.push(emptyStar);
          }
        }

    }
    return result;
  };

  loadDescription = (deal_description) => {

    let dealDescription = convertFromRaw(JSON.parse(deal_description));
    let editorState = EditorState.createWithContent(dealDescription);

    return editorState;
  }

  showNumberOfReviews = () => {
    return this.props.reviews.allReviews !== undefined ? this.props.reviews.allReviews.length : 0
  }

  messageSeller = async() => {

    await this.props._createChatSession(localStorage.getItem("token"), this.props.dealItem.seller_id, this.props.dealItem.deal_id);

  }

  render() {
    const { //state
            error,
            deal_item_loading,
            dealItem,
            reviews,
            acceptedCryptos,
            allStates,
            firstName,
            lastName,
            shippingAddress,
            shippingCity,
            zipcode,
            shippingState,
            selectedOption,
            transaction_loading,
            paymentInfo,
            createPaymentButtonClicked,
            showDetailStep,
            showShippingStep,
            showPayingStep,

            //actions
            handleFirstNameInput,
            handleLastNameInput,
            handleAddressInput,
            handleCityInput,
            handleZipcodeInput,
            handleShippingStateInput,
            handleSelectedCrypto,

            handleDetailStep,
            handleShippingStep,
            handlePayingStep,

            _createChatSession} = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (deal_item_loading) {
      return <div>Loading...</div>;
    }


    //if user is redirected from the deal created page after deal is created
    if(this.props.dealCreated.deal_id) {
      this.props.resetListDeal();
    }


    return (
      <div>
        <Layout>
        <div>
          <div className="deal-container">
            {/* <div className="deal-header">

              <div className="deal-item-header">
                <div className="deal-item-name">
                  <strong>{dealItem && dealItem.deal_name}</strong> <br/>
                  <small> Offered By: {dealItem && dealItem.venue_name || dealItem && dealItem.seller_name}</small> <br/>
                </div>
                <div className="deal-item-cost">
                  <strong>Pay in Crypto:  ${dealItem && dealItem.pay_in_crypto.toFixed(2)}</strong>  <small className="deal-item-discount">
                  {dealItem && this.convertToPercentage(dealItem.pay_in_dollar, dealItem.pay_in_crypto)}% OFF</small> <br/>
                  <small>Pay in Dollar:  ${dealItem && dealItem.pay_in_dollar.toFixed(2)} <br/></small>
                </div>
              </div>

              <div className="deal-item-summary">

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
                      <strong>Crypto Payment</strong> <br/>
                      {selectedOption ?  <img src={selectedOption.logo} alt="cryptoLogo" /> :
                      <div>
                        Powered By
                        <img style={{width: "100px", marginTop: "0px"}} src="../../../assets/images/coin_payment.png" alt="coinpayment_logo"/>
                      </div>
                       }
                    </div>
                  </div>
              </div>
            </div> */}


              {/* classname is ui steps indiate using sematic ui */}
              <div className="ui three steps">
                <a onClick={handleDetailStep} className={showDetailStep ? "active step" : "step"}>
                  <i className="edit icon"></i>
                  <div className="content">
                    <div className="title">Item Description</div>
                    <div className="description">See details about this item</div>
                  </div>
                </a>
                <a onClick={() => handleShippingStep()} className={showShippingStep ? "active step" : "step"}>
                <i className="truck icon"></i>
                  <div className="content">
                    <div className="title">Shipping</div>
                    <div className="description">Enter shipping information</div>
                  </div>
                </a>

                <a onClick={() => this.handleShipmentValidation() &&   handlePayingStep()} className={"step " + (!showShippingStep && showDetailStep ? "disabled" : showPayingStep ? "active" : "" )} >
                <i className="shopping cart icon"></i>
                  <div className="content">
                    <div className="title">Paying</div>
                    <div className="description">Choose your payment</div>
                  </div>
                </a>
              </div>

            </div>

            <div className="deal-listing-content">
              <div className="deal-images-container">
                <Carousel
                  className="react-carousel"
                  showStatus={false}>

                  {dealItem && dealItem.deal_image.map((img,i) => (
                    <div key={i} className="deal-item-image">
                      <img src={img} />
                    </div>
                  ))}

                </Carousel>
              </div>

              <div className="deal-checkout-container mt-4">
                <div className="step-progress">
                  {showDetailStep &&
                  <ItemDescription
                  //another way to pass in props using spread operator
                  {...dealItem}
                  {...reviews}
                  sellerDealDescription={this.loadDescription}
                  next_step={handleShippingStep}
                  rating_display={this.ratingDisplay}
                  calculateDiscount={this.convertToPercentage}
                  />}

                  {showShippingStep &&
                  <ShipOrder
                  listOfAllStates={allStates}
                  handle_ShippingFirstName={handleFirstNameInput}
                  handle_ShippingLastName={handleLastNameInput}
                  handle_ShippingAddress={handleAddressInput}
                  handle_ShippingCity={handleCityInput}
                  handle_ShippingZipcode={handleZipcodeInput}
                  handle_ShippingState={handleShippingStateInput}
                  showShippingFirstName={firstName}
                  showShippingLastName={lastName}
                  showShippingAddress={shippingAddress}
                  showShippingCity={shippingCity}
                  showShippingState={shippingState}
                  showShippingZipcode={zipcode}
                  next_step={handlePayingStep}
                  previous_step={handleDetailStep}
                  validateShipmentData={this.handleShipmentValidation}/>}

                  {showPayingStep &&
                  <PurchaseOrder
                  cryptos={acceptedCryptos && this.handleCryptoOptions(acceptedCryptos)}
                  selectCrypto={handleSelectedCrypto}
                  selectedPayment={selectedOption}
                  previous_step={handleShippingStep}
                  validatePaymentData={this.handlePaymentValidation}
                  SubmitPayment={this.createPaymentHandler}
                  transactionInfo={paymentInfo}
                  cryptoSymbol={selectedOption && selectedOption.value}
                  paymentButtonClicked={createPaymentButtonClicked}

                  deal_item={dealItem}
                  first_name={firstName}
                  last_name={lastName}
                  shipping_address={shippingAddress}
                  shipping_city={shippingCity}
                  zip_code={zipcode}
                  shipping_state={shippingState}

                  showLoadingSpinner={transaction_loading}
                  timeout={paymentInfo && this.timeInMilliseconds(paymentInfo.timeout)}/>}

                </div>
              </div>
              </div>

              <div className="sellers-reviews">

                <div id="seller-review-label">
                  Seller
                </div>

                <div id="seller-profile-rating">
                  <div className="seller-review-profile-left">
                    <div id="seller-review-profile">
                      <div id="seller-review-avatar">
                        <i className={'fas py-3 px-4 user-icon-navbar ' + this.props.photo.photo}></i>
                      </div>
                      <div>
                        <strong id="seller-review-name">{dealItem && dealItem.venue_name || dealItem && dealItem.seller_name}</strong>
                        <div id="seller-review-verify">Verified: <i className="fas fa-envelope"></i> <i class="fas fa-mobile-alt"></i></div>
                      </div>
                    </div>

                    <Link to={'/chat'}>
                      <div id="message-seller" className="px-3">
                        <button onClick={this.messageSeller} className="mt-3">
                          Message Seller
                        </button>
                      </div>
                    </Link>
                  </div>

                  <div id="seller-review-rating">
                    <div>Seller's Average Rating
                      <small className="star-space-right">
                        {this.ratingDisplay(dealItem && dealItem.sellers_avg_rating)} ({this.showNumberOfReviews()})
                      </small>
                    </div>
                    <label>Reviews</label>
                    <div id="seller-reviews-container">
                    {reviews.allReviews !== undefined &&
                      reviews.allReviews.length > 0 ?
                      reviews.allReviews.map(reviews => (
                        <div key={reviews.review_id} className="review-box">
                          <div className="review-header-container">
                            <div className="review-header">
                                <div className="buyer-review-avatar">
                                  <i className={'fas py-2 px-3 user-icon-navbar ' + reviews.buyer_photo}></i>
                                </div>
                                <div>
                                  <strong className="text-secondary">{reviews.buyer_name}</strong>
                                  <small className="star-buyer">{this.ratingDisplay(reviews.rating)}</small>
                                </div>
                              {/* {reviews.buyer_name} purchased {reviews.deal_name} */}
                            </div>
                            <small className="buyer-review-date">
                              {reviews.rating_date_reviewed.substring(0, 10)}
                            </small>
                          </div>

                          <div>
                            <div className="text-secondary">{reviews.rating_title} </div>
                          </div>

                          <div className="review-body">{reviews.rating_body}</div>

                          <small>
                            <a href="/">Report abuse</a>
                          </small>
                          <hr/>
                        </div>
                      )) : <div className="text-secondary">This seller has no reviews yet!</div> }
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
  reviews: state.Reviews.reviews,
  acceptedCryptos: state.DealItem.acceptedCryptos,
  firstName: state.DealItem.firstName,
  lastName: state.DealItem.lastName,
  shippingAddress: state.DealItem.shippingAddress,
  shippingCity: state.DealItem.shippingCity,
  zipcode: state.DealItem.zipcode,
  shippingState: state.DealItem.shippingState,
  selectedOption: state.DealItem.selectedOption,
  allStates: state.DealItem.states,
  paymentInfo: state.TransactionInfo.transactionInfo,
  createPaymentButtonClicked: state.TransactionInfo.createPaymentButtonClicked,
  transaction_loading: state.TransactionInfo.loading,
  deal_item_loading: state.DealItem.loading,
  error: state.DealItem.error,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  showDetailStep: state.DealItem.showDetailStep,
  showShippingStep: state.DealItem.showShippingStep,
  showPayingStep: state.DealItem.showPayingStep,
  dealCreated: state.CreateDeal.dealCreated,
  photo: state.Photo,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({
    _loadReviews,
    _loadDealItem,
    _fetchTransactionInfo,
    handleFirstNameInput,
    handleLastNameInput,
    handleAddressInput,
    handleCityInput,
    handleZipcodeInput,
    handleShippingStateInput,
    handleSelectedCrypto,
    handleDetailStep,
    handleShippingStep,
    handlePayingStep,
    _isLoggedIn,
    resetListDeal,
    _createChatSession}, dispatch);

}

export default connect(mapStateToProps, matchDispatchToProps)(DealItem);
