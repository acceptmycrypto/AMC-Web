import React, { Component } from "react";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  _loadDealItem,
  handleFirstNameInput,
  handleLastNameInput,
  handleAddressInput,
  handleCityInput,
  handleZipcodeInput,
  handleShippingStateInput,
  handleShippingEmail,
  handleShippingPhoneNumber,
  handleSelectedCrypto,
  handleDetailStep,
  handleShippingStep,
  handlePayingStep
} from "../../../actions/dealItemActions";
import { resetListDeal, editListing, resetEditListing, _deleteDeal, openDeleteAlertModal, closeDeleteAlertModal } from "../../../actions/listDealActions";
import { _fetchTransactionInfo, _fetchGuestTransactionInfo } from "../../../actions/paymentActions";
import { _executePayPalPayment } from "../../../actions/paypalActions";
import { _createChatSession } from "../../../actions/chatActions";
import { Carousel } from "react-responsive-carousel";
import ItemDescription from "../ItemDescription";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Layout from "../../Layout";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { _loadReviews } from "../../../actions/reviewsActions";
import { _loadProfile } from "../../../actions/userLoadActions";
import { EditorState, convertFromRaw } from "draft-js";
import AlertModal from "../../../components/UI/Alert";
import queryString from 'query-string';

class DealItem extends Component {
  componentDidMount = async () => {

    //return the param value
    await this.props._isLoggedIn(localStorage.getItem("token"));

    // if (await this.props.userLoggedIn) {
    const { deal_name, id } = await this.props.match.params;
    await this.props._loadDealItem(id, deal_name);

    let seller_id =
      this.props.dealItem.seller_id || this.props.dealItem.venue_id;
    await this.props._loadReviews(seller_id);
    await this.props._loadProfile(localStorage.getItem("token"));


    if (this.props.dealEdited.success && !this.props.editingDeal) {

      toast.success(this.props.dealEdited.message, {
        position: toast.POSITION.TOP_RIGHT
      });

      //reset editing deal reducer
      this.props.resetEditListing();
    }

    //execute paypal payment when redirects from paypal
    let paypalValues = queryString.parse(this.props.location.search);
    let paymentId = paypalValues.paymentId;
    let payerId = paypalValues.PayerID;
    if (this.props._isLoggedIn && paymentId) {
      let user_email = this.props.user_info[0].email;
      await this.props._executePayPalPayment(localStorage.getItem("token"), payerId, paymentId, id, deal_name, user_email);
    }

    // }else{
    //     // localStorage.removeItem('token');
    //     await this.props.history.push('/');
    // }

  }

  componentDidUpdate = () => {
    let paypalValues = queryString.parse(this.props.location.search);
    let paymentId = paypalValues.paymentId;

    //if buyer is redirected from paypal then we update the buynow button to sold
    if (this.props.dealItem && paymentId) {
      console.log("executed handle buy now button");
      this.handleBuyNowButton();
    }
  }

  //set the options to select crypto from
  //this function is needed to change the format of objects to be able to used for react select
  handleCryptoOptions = acceptedCryptos => {
    let options = [];
    acceptedCryptos.map(crypto => {
      let optionObj = {};
      optionObj.value = crypto.crypto_symbol;
      optionObj.label =
        crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
      optionObj.logo = crypto.crypto_logo;
      optionObj.name = crypto.crypto_name;

      options.push(optionObj);
    });

    return options;
  };

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return Math.ceil(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
  };

  timeInMilliseconds = sec => {
    return sec * 1000;
  };

  createPaymentHandler = () => {
    const {
      dealItem,
      selectedOption,
      shippingAddress,
      shippingCity,
      zipcode,
      shippingState,
      firstName,
      lastName,
      email,
      phoneNumber
    } = this.props;

    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id
    let deal_id = dealItem.deal_id;
    let amount = dealItem.pay_in_crypto;
    let crypto_symbol = selectedOption.value;
    let crypto_name = selectedOption.name;
    let token = localStorage.getItem("token");

    if(this.props.userLoggedIn){
      this.props._fetchTransactionInfo(
        crypto_name,
        crypto_symbol,
        deal_id,
        amount,
        token,
        shippingAddress,
        shippingCity,
        zipcode,
        shippingState,
        firstName,
        lastName
      );
    }else{
      this.props._fetchGuestTransactionInfo(
        crypto_name,
        crypto_symbol,
        deal_id,
        amount,
        shippingAddress,
        shippingCity,
        zipcode,
        shippingState,
        firstName,
        lastName,
        email,
        phoneNumber
      );
    }

  };

  handleShipmentValidation = () => {

    let validateNewInput;
    if (this.props.userLoggedIn) {
      validateNewInput = {
        enteredFirstname: this.props.firstName,
        enteredLastname: this.props.lastName,
        enteredShippingAddress: this.props.shippingAddress,
        enteredShippingCity: this.props.shippingCity,
        enteredZipcode: this.props.zipcode,
        selectedShippingState: this.props.shippingState.value,
      };
    } else {
      validateNewInput = {
        enteredFirstname: this.props.firstName,
        enteredLastname: this.props.lastName,
        enteredShippingAddress: this.props.shippingAddress,
        enteredShippingCity: this.props.shippingCity,
        enteredZipcode: this.props.zipcode,
        selectedShippingState: this.props.shippingState.value,
        enteredEmail: this.props.email,
        enteredPhoneNumber: this.props.phoneNumber,
      };
    }


    let isDataValid = false;

    if (
      Object.keys(validateNewInput).every(k => {
        return validateNewInput[k] ? true : false;
      })
    ) {
      isDataValid = true;
    } else {
      document.getElementById(
        "shipping-firstname"
      ).classList.add("shipping-error");
      document.getElementById(
        "shipping-lastname"
      ).classList.add("shipping-error");
      document.getElementById(
        "shipping-address"
      ).classList.add("shipping-error");
      document.getElementById(
        "shipping-city"
      ).classList.add("shipping-error");
      document.getElementById(
        "shipping-zipcode"
      ).classList.add("shipping-error");
      document.getElementById(
        "shipping-state"
      ).classList.add("shipping-state-error");

      if (!this.props.userLoggedIn) {
        document.getElementById("shipping-email").classList.add("shipping-error");
        document.getElementById("shipping-phone-number").classList.add("shipping-error");
      }

    }

    return isDataValid;
  };

  handlePaymentValidation = () => {
    const validateNewInput = {
      selectedPaymentOption: this.props.selectedOption
    };
    let isDataValid = false;

    if (
      Object.keys(validateNewInput).every(k => {
        return validateNewInput[k] ? true : false;
      })
    ) {
      isDataValid = true;
    } else {
      document.getElementById(
        "selected-payment-error"
      ).innerHTML = this._validationErrors(
        validateNewInput
      ).selectedPaymentValMsg;
    }

    return isDataValid;
  };

  _validationErrors(val) {
    const errMsgs = {
      selectedPaymentValMsg: val.selectedPaymentOption
        ? null
        : "Please select your payment option",
      shippingEmailValMsg: val.enteredEmail
        ? null
        : "Please enter your email",
      shippingPhoneNumberValMsg: val.enteredPhoneNumber
        ? null
        : "Please enter your phone number"
    };

    return errMsgs;
  }

  ratingDisplay = rating => {
    let star = <i class="fa fa-star" aria-hidden="true" />;
    let halfStar = <i class="fas fa-star-half-alt" />;
    let emptyStar = <i class="far fa-star" aria-hidden="true" />;
    let result = [];

    if (rating === 0) {
      result.push(emptyStar, emptyStar, emptyStar, emptyStar, emptyStar);
      return result;
    }
    if (rating % 1 == 0) {
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          result.push(star);
        } else {
          result.push(emptyStar);
        }
      }
    } else {
      let rem = rating % 1;
      let baseRating = Math.floor(rating);
      for (let i = 0; i < 5; i++) {
        if (i <= rating) {
          if (i !== baseRating) {
            result.push(star);
          } else if (i == baseRating && rem <= 0.25) {
            //this might not be quite right
            result.push(halfStar);
          } else if (i == baseRating && rem > 0.25 && rem < 0.75) {
            result.push(halfStar);
          } else {
            result.push(star);
          }
        } else {
          result.push(emptyStar);
        }
      }
    }

    return result;
  };

  loadDescription = deal_description => {
    let dealDescription = convertFromRaw(JSON.parse(deal_description));
    let editorState = EditorState.createWithContent(dealDescription);

    return editorState;
  };

  showNumberOfReviews = () => {
    return this.props.reviews.allReviews !== undefined
      ? this.props.reviews.allReviews.length
      : 0;
  };

  messageSeller = async () => {
    await this.props._createChatSession(
      localStorage.getItem("token"),
      this.props.dealItem.seller_id,
      this.props.dealItem.deal_id
    );
  };

  handleDeleteDeal = () => {
    let {deal_id} = this.props.dealItem;
    this.props._deleteDeal(localStorage.getItem("token"), deal_id)
  }

  handleDeletedDeal = () => {
    if (this.props.dealDeleted) {
      this.props.resetListDeal();
      this.props.history.push(
        `/listdeal`
      );
    }
  }

  handleBuyNowButton = () => {
    const {deal_status} = this.props.dealItem;
    const {paypal_excecute_payment} = this.props;
    
    switch (true) {
      case deal_status === "reserved":
        return (
          <button disabled>Waiting for Payment</button>
        );
      case deal_status === "sold":
        return (
          <button disabled>Sold</button>
        );
      case paypal_excecute_payment && paypal_excecute_payment.success === true:
      debugger
        return (
          <button disabled>Sold</button>
        );
      default:
        return <button>Buy Now</button>
    }
  };

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
            email,
            phoneNumber,
            selectedOption,
            transaction_loading,
            paymentInfo,
            transaction_status,
            createPaymentButtonClicked,
            showDetailStep,
            showShippingStep,
            showPayingStep,
            user_info,
            userLoggedIn,
            dealDeleted,
            alertDeleteModalVisible,

            //actions
            handleFirstNameInput,
            handleLastNameInput,
            handleAddressInput,
            handleCityInput,
            handleZipcodeInput,
            handleShippingStateInput,
            handleSelectedCrypto,
            handleShippingEmail,
            handleShippingPhoneNumber,
            handleDetailStep,
            handleShippingStep,
            handlePayingStep,
            editListing,
            openDeleteAlertModal,
            closeDeleteAlertModal,
            resetListDeal
            } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (deal_item_loading) {
      return <div className="page-loading"><LoadingSpinner /></div>
    }

    //if user is redirected from the deal created page after deal is created
    if (this.props.dealCreated.deal_id) {
      this.props.resetListDeal();
    }


    return (
      <div className="pt-5">
        <Layout>
          <div>
            <div className="deal-container">
              {/* classname is ui steps indiate using sematic ui */}
              <div className="ui three steps">
                <a
                  onClick={handleDetailStep}
                  className={showDetailStep ? "active step" : "step"}
                >
                  <i className="edit icon" />
                  <div className="content">
                    <div className="title">Item Description</div>
                    <div className="description">
                      See details about this item
                    </div>
                  </div>
                </a>
                <a
                  onClick={() => handleShippingStep()}
                  className={dealItem && dealItem.deal_status === "available" ? showShippingStep ? "active step" : "step" : "step disabled"}
                >
                  <i className="truck icon" />
                  <div className="content">
                    <div className="title">Shipping</div>
                    <div className="description">
                      Enter shipping information
                    </div>
                  </div>
                </a>

                <a
                  onClick={() =>
                    this.handleShipmentValidation() && handlePayingStep()
                  }
                  className={
                    "step " +
                    (!showShippingStep && showDetailStep
                      ? "disabled"
                      : showPayingStep
                        ? "active"
                        : "")
                  }
                >
                  <i className="shopping cart icon" />
                  <div className="content">
                    <div className="title">Paying</div>
                    <div className="description">Choose your payment</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="deal-listing-content">
              <div className={!userLoggedIn && showShippingStep ?  "guest-images-container" : "deal-images-container"}>
                <Carousel className="react-carousel" showStatus={false}>
                  {dealItem &&
                    dealItem.deal_image.map((img, i) => (
                      <div key={i} className="deal-item-image">
                        <img src={img} />
                      </div>
                    ))}
                </Carousel>
              </div>

              <div className="deal-checkout-container mt-4">
                <div className="step-progress">
                  {showDetailStep && (
                    <ItemDescription
                      //another way to pass in props using spread operator
                      {...dealItem}
                      {...reviews}
                      buyNowButtonHandler={this.handleBuyNowButton}
                      sellerDealDescription={this.loadDescription}
                      next_step={handleShippingStep}
                      rating_display={this.ratingDisplay}
                      calculateDiscount={this.convertToPercentage}
                    />
                  )}

                  {showShippingStep && (
                    <ShipOrder
                      listOfAllStates={allStates}
                      handle_ShippingFirstName={handleFirstNameInput}
                      handle_ShippingLastName={handleLastNameInput}
                      handle_ShippingAddress={handleAddressInput}
                      handle_ShippingCity={handleCityInput}
                      handle_ShippingZipcode={handleZipcodeInput}
                      handle_ShippingState={handleShippingStateInput}
                      handle_ShippingEmail={handleShippingEmail}
                      handle_ShippingPhoneNumber={handleShippingPhoneNumber}
                      showShippingFirstName={firstName}
                      showShippingLastName={lastName}
                      showShippingAddress={shippingAddress}
                      showShippingCity={shippingCity}
                      showShippingState={shippingState}
                      showShippingZipcode={zipcode}
                      showShippingEmail={email}
                      showShippingPhoneNumber={phoneNumber}
                      next_step={handlePayingStep}
                      previous_step={handleDetailStep}
                      validateShipmentData={this.handleShipmentValidation}
                      user_status={userLoggedIn ? "user" : "guest"}
                    />
                  )}

                  {showPayingStep && (
                    <PurchaseOrder
                      cryptos={
                        acceptedCryptos &&
                        this.handleCryptoOptions(acceptedCryptos)
                      }
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
                      email={email}
                      phoneNumber={phoneNumber}
                      showLoadingSpinner={transaction_loading}
                      timeout={
                        paymentInfo &&
                        this.timeInMilliseconds(paymentInfo.timeout)
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="sellers-reviews">
              <div id="seller-review-label">Seller</div>

              <div id="seller-profile-rating">
                <div className="seller-review-profile-left">
                  <div id="seller-review-profile">
                    <div id="seller-review-avatar">
                      <i
                        className={
                          "fas py-3 px-4 user-icon-navbar " +
                          this.props.photo.photo
                        }
                      />
                    </div>
                    <div>
                      <strong id="seller-review-name">
                        {(dealItem && dealItem.venue_name) ||
                          (dealItem && dealItem.seller_name)}
                      </strong>
                      <div id="seller-review-verify">
                        Verified: <i className="fas fa-envelope" />{" "}
                        <i class="fas fa-mobile-alt" />
                      </div>
                    </div>
                  </div>

                  {user_info.length > 0 &&
                  dealItem &&
                  user_info[0].id === dealItem.seller_id ?
                  <div>
                    <Link to={"/listdeal"}>
                      <div className="px-3 message-seller">
                        <button onClick={() => editListing(dealItem, acceptedCryptos)} className="mt-3">
                        Edit Listing
                        </button>
                      </div>
                    </Link>
                    <div className="px-3 message-seller">
                      <button style={{backgroundColor: "#9b0739"}} onClick={openDeleteAlertModal} className="mt-3">
                          Delete Listing
                      </button>
                    </div>
                  </div> :
                  (
                    <Link to={"/chat"}>
                      <div className="px-3 message-seller">
                        <button onClick={this.messageSeller} className="mt-3">
                          Message Seller
                        </button>
                        </div>
                      </Link>
                    )}
                </div>

                <div id="seller-review-rating">
                  <div>
                    Seller's Average Rating
                    <small className="star-space-right">
                      {this.ratingDisplay(
                        dealItem && dealItem.sellers_avg_rating
                      )}
                      ({this.showNumberOfReviews()})
                    </small>
                  </div>
                  <label>Reviews</label>
                  <div id="seller-reviews-container">
                    {reviews.allReviews !== undefined &&
                      reviews.allReviews.length > 0 ? (
                        reviews.allReviews.map(reviews => (
                          <div key={reviews.review_id} className="review-box">
                            <div className="review-header-container">
                              <div className="review-header">
                                <div className="buyer-review-avatar">
                                  <i
                                    className={
                                      "fas py-2 px-3 user-icon-navbar " +
                                      reviews.buyer_photo
                                    }
                                  />
                                </div>
                                <div>
                                  <strong className="text-secondary">
                                    {reviews.buyer_name}
                                  </strong>
                                  <small className="star-buyer">
                                    {this.ratingDisplay(reviews.rating)}
                                  </small>
                                </div>
                                {/* {reviews.buyer_name} purchased {reviews.deal_name} */}
                              </div>
                              <small className="buyer-review-date">
                                {reviews.rating_date_reviewed.substring(0, 10)}
                              </small>
                            </div>

                            <div>
                              <div className="text-secondary">
                                {reviews.rating_title}{" "}
                              </div>
                            </div>

                            <div className="review-body">
                              {reviews.rating_body}
                            </div>

                            <small>
                              <a href="/">Report abuse</a>
                            </small>
                            <hr />
                          </div>
                        ))
                      ) : (
                        <div className="text-secondary">
                          This seller has no reviews yet!
                      </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
        <ToastContainer autoClose={5000} />
        <AlertModal
            deleteModalVisible={alertDeleteModalVisible}
            closeDeleteModal={closeDeleteAlertModal}
            deleteListing={this.handleDeleteDeal}
            deletedDealHandling = {this.handleDeletedDeal}
        />
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
  email: state.DealItem.email,
  phoneNumber: state.DealItem.phoneNumber,
  selectedOption: state.DealItem.selectedOption,
  allStates: state.DealItem.states,
  paymentInfo: state.TransactionInfo.transactionInfo,
  transaction_status: state.TransactionInfo.deal_status,
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
  user_info: state.UserInfo.user_info,
  dealEdited: state.CreateDeal.dealEdited,
  editingDeal: state.CreateDeal.editingDeal,
  dealDeleted: state.CreateDeal.dealDeleted,
  deletingDealLoading: state.CreateDeal.deletingDealLoading,
  deletingDealError: state.CreateDeal.deletingDealError,
  alertDeleteModalVisible: state.CreateDeal.alertDeleteModalVisible,
  paypal_excecute_payment: state.TransactionInfo.paypal_excecute_payment,
  paypal_excecute_payment_loading: state.TransactionInfo.paypal_excecute_payment_loading,
  paypal_excecute_payment_error: state.TransactionInfo.paypal_excecute_payment_error
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      _loadReviews,
      _loadDealItem,
      _fetchTransactionInfo,
      _fetchGuestTransactionInfo,
      handleFirstNameInput,
      handleLastNameInput,
      handleAddressInput,
      handleCityInput,
      handleZipcodeInput,
      handleShippingStateInput,
      handleShippingEmail,
      handleShippingPhoneNumber,
      handleSelectedCrypto,
      handleDetailStep,
      handleShippingStep,
      handlePayingStep,
      _isLoggedIn,
      resetListDeal,
      _createChatSession,
      _loadProfile,
      editListing,
      _deleteDeal,
      resetEditListing,
      openDeleteAlertModal,
      closeDeleteAlertModal,
      _executePayPalPayment
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DealItem);
