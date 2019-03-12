import React, { Component } from "react";
import "./ItemDescription.css";
import "./ItemDescriptionMobile.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Editor } from 'draft-js';
import {
  openModalForPhoneVerification,
  closeModalAfterDealCreated,
  onEditPhoneNumber,
  onEditSellerFirstname,
  onEditSellerLastname,
  onEditSellerAddress,
  onEditSellerCity,
  onEditSellerState,
  onEditSellerZipcode,
  _startVerificationForSeller,
  onEditSellerVerificationToken,
  _checkVerificationForSeller
} from "../../../actions/listDealActions";
import Modal from "react-awesome-modal";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { Link } from "react-router-dom";

class ItemDescription extends Component {

  //We have access to history props from withRouter
  directToDealItemPage = (deal_id, deal_name) => {
    this.props.history.push(
      `/feed/deals/${deal_id}/${
        deal_name
      }`
    );
  };

  onVerificationStart = event => {
    event.preventDefault();

    const {
      sellerFirstname,
      sellerLastname,
      phoneNumber,
      sellerAddress,
      sellerCity,
      sellerState,
      sellerZipcode
    } = this.props;

    if (!sellerState) {
      document
        .querySelector("#sellerState")
        .classList.add("create-deal-select-error");
    } else {
      this.props._startVerificationForSeller(
        localStorage.getItem("token"),
        sellerFirstname,
        sellerLastname,
        phoneNumber,
        sellerAddress,
        sellerCity,
        sellerState,
        sellerZipcode
      );
    }
  };

  onVerificationResult = event => {
    event.preventDefault();

    this.props._checkVerificationForSeller(
      localStorage.getItem("token"),
      this.props.sellerVerificationToken
    );
  };

  dealCreatedModal = () => {
    const {
      sendingCode,
      sendingCodeSuccess,
      onEditPhoneNumber,
      sellerFirstname,
      sellerLastname,
      phoneNumber,
      onEditSellerFirstname,
      onEditSellerLastname,
      onEditSellerAddress,
      sellerAddress,
      onEditSellerCity,
      sellerCity,
      allStates,
      onEditSellerState,
      sellerState,
      onEditSellerZipcode,
      sellerZipcode,
      onEditSellerVerificationToken,
      sellerVerificationToken,
      checkingCodeLoading,
      checkingCodeSuccess,
      phone_number_verified,
      deal_id,
      deal_name,
      closeModalAfterDealCreated,
      resetDealCreated
    } = this.props;

    switch (true) {
      case sendingCode || checkingCodeLoading:
        return (
          <div className="creating-deal-modal-loading-spinner">
            <LoadingSpinner />
          </div>
        );
      case sendingCodeSuccess.success &&
        checkingCodeSuccess.success === undefined:
        return (
          <form
            onSubmit={this.onVerificationResult}
            className="creating-deal-seller-verification"
          >
            <h4 className="creating-deal-modal-header">
              To protect our community, we need to verify all sellers.{" "}
              <i class="fa fa-question-circle" aria-hidden="true" />
            </h4>
            <div className="creating-deal-seller-contact">
              <label>Enter Verification Code</label>
              <div>
                <input
                  onChange={onEditSellerVerificationToken}
                  value={sellerVerificationToken}
                  required
                  className="description-input"
                  autofocus="autofocus"
                  placeholder="Enter your verification code"
                />
              </div>
              <small>A text message with code was sent to your phone.</small>
            </div>

            <button>Verify</button>
          </form>
        );
      case checkingCodeSuccess.success:
        return (
          <div className="mob-verified-phone-success">
            <div className="verified-phone-success">
              <h4>Verified Success!</h4>
              <div>
                <i class="fas fa-check fa-2x" />
              </div>
              <br />
              <h4>Now sit tight and wait to get paid with cryptocurrency.</h4>
            </div>

            <Link
              className="create-deal-modal-link"
              style={{ textDecoration: "none" }}
              to={`/feed/deals/${deal_id}/${deal_name}`}
              onClick={() => {
                closeModalAfterDealCreated();
                resetDealCreated();
              }}
            // onClick={resetDealCreated}
            >
              Show My Listing
            </Link>
          </div>
        );
      case checkingCodeSuccess.success === false:
        return (
          <form
            onSubmit={this.onVerificationResult}
            className="creating-deal-seller-verification"
          >
            <h4 className="creating-deal-modal-header">
              To protect our community, we need to verify all sellers.{" "}
              <i class="fa fa-question-circle" aria-hidden="true" />
            </h4>
            <div className="creating-deal-seller-contact">
              <label>
                Incorrect Verification Code. Please Enter the Code We Texted
                You.
              </label>
              <div>
                <input
                  onChange={onEditSellerVerificationToken}
                  value={sellerVerificationToken}
                  required
                  className="description-input"
                  autofocus="autofocus"
                  placeholder="Enter your verification code"
                />
              </div>
              <small>A text message with code was sent to your phone.</small>
            </div>

            <button>Verify</button>
          </form>
        );
      case phone_number_verified === 0:
        return (
          <form
            onSubmit={this.onVerificationStart}
            className="creating-deal-seller-verification"
          >
            <h4 className="creating-deal-modal-header">
              To protect our community, we need to verify all sellers.{" "}
              <i class="fa fa-question-circle" aria-hidden="true" />
            </h4>
            <div className="creating-deal-seller-contact">
              <label>Contact Info (format: xxx-xxx-xxxx)</label>
              <div>
                <input
                  onChange={onEditPhoneNumber}
                  value={phoneNumber}
                  type="tel"
                  pattern="^\d{3}-\d{3}-\d{4}$"
                  required
                  className="description-input"
                  autofocus="autofocus"
                  placeholder="Enter your phone number"
                />
              </div>
              <small>We will send you a one-time verification code.</small>
            </div>

            <div className="d-flex flex-row mb-2">
              <div className="creating-deal-seller-firstname mr-4">
                {/* <label>First Name</label> */}
                <input
                  onChange={onEditSellerFirstname}
                  value={sellerFirstname}
                  type="text"
                  className="description-input"
                  autofocus="autofocus"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="creating-deal-seller-lastname">
                {/* <label>Last Name</label> */}
                <input
                  onChange={onEditSellerLastname}
                  value={sellerLastname}
                  type="text"
                  className="description-input"
                  autofocus="autofocus"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="creating-deal-seller-address pt-3">
              {/* <label>Address Info</label> */}
              <input
                onChange={onEditSellerAddress}
                value={sellerAddress}
                type="text"
                className="description-input"
                autofocus="autofocus"
                placeholder="Address"
                required
              />
            </div>
            <div className="city-state-zipcode-flex">
              <input
                onChange={onEditSellerCity}
                value={sellerCity}
                type="text"
                className="description-input"
                autofocus="autofocus"
                placeholder="City"
                required
              />
              <Select
                className="create-deal-select"
                id="sellerState"
                options={allStates}
                placeholder="State"
                onChange={onEditSellerState}
                value={sellerState}
              />
              <input
                onChange={onEditSellerZipcode}
                value={sellerZipcode}
                type="number"
                className="description-input create-deal-zipcode-input"
                autofocus="autofocus"
                placeholder="Zip Code"
                required
              />
            </div>


            <button>Text Me</button>
          </form>
        );
      default:
        return (
          <div className="mob-verified-phone-success">
            <div className="verified-phone-success">
              <h4>You have successfully created a Deal!</h4>
              <div>
                <i class="fas fa-check fa-2x" />
              </div>
              <br />
              <h4>Now sit tight and wait to get paid with cryptocurrency.</h4>
            </div>

            <Link
              className="create-deal-modal-link"
              style={{ textDecoration: "none" }} //make sure the link has no underline
              to={`/feed/deals/${deal_id}/${deal_name}`}
              onClick={() => {
                closeModalAfterDealCreated();
                // resetDealCreated();
              }}
              onClick={resetDealCreated}
            >
              Show My Listing
            </Link>
          </div>
        );
    }
  };

  render () {
    const sellers_rating = this.props.sellers_avg_rating;

    return (
      <div>
        <div className="content item-description">
          <div className="deal-name-label">{this.props.deal_name}</div>
          <div id="deal-item-info">
            <div className="condition-category-posted-container">
              <div className="condition-category-posted">
                <div className="text-secondary">Condition</div>
                <div className="text-secondary">Posted</div>
              </div>
              <div className="condition-category-posted">
                <div className="text-dark">
                  {this.props.item_condition ? this.props.item_condition : "N/A"}
                </div>
                <div className="text-dark">
                  {this.props.date_created && this.props.date_created.substring(0, 10)}
                </div>
              </div>
            </div>

            <div className="condition-category-posted-container">
              <div className="condition-category-posted">
                <div className="text-secondary">Pay in Crypto</div>
                <div className="text-secondary">Pay in Dollar</div>
              </div>
              <div className="condition-category-posted">
                <div className="text-dark">
                  ${this.props.deal_name && this.props.pay_in_crypto.toFixed(2)}
                  {/* <small className="deal-item-discount">
                {this.props.deal_name && this.props.calculateDiscount(this.props.pay_in_dollar, this.props.pay_in_crypto)}% OFF</small> */}
                </div>
                <div className="text-dark">${this.props.deal_name && this.props.pay_in_dollar.toFixed(2)}</div>
              </div>
              <div>
                <div className="deal-item-discount">
                  {this.props.deal_name && this.props.calculateDiscount(this.props.pay_in_dollar, this.props.pay_in_crypto)}% OFF
                </div>
              </div>
            </div>
          </div>

          <div id="category-display-flex">
            <div className="text-secondary condition-category-posted">Category</div>
            <div id="category-span">
             {this.props.deal_category !== undefined && this.props.deal_category.map((category) => {
                  return (
                    <div className="text-dark">{category}</div>
                  )
                })}
            </div>
          </div>

          <hr />

          <div>
            <div className="condition-category-posted">Detail</div>
              <div className="detail-wrapper">
              {this.props.seller_name ?
                <Editor
                  editorState={this.props.sellerDealDescription(this.props.deal_description)}
                  readOnly={true}
                /> : this.props.deal_description
              }
              </div>
          </div>
          <div onClick={() => {this.props.phone_number_verified === 0 ? this.props.openModalForPhoneVerification() : this.props.next_step()}} className="buy-now">
            {this.props.deal_name && this.props.buyNowButtonHandler()}
          </div>
        </div>

        <Modal
          visible={this.props.modalVisible}
          effect="fadeInUp"
          onClickAway={() => {
            this.props.closeModalAfterDealCreated();
          }}
        >
          <div className="deal-created-modal">{this.dealCreatedModal()}</div>
        </Modal>
      </div>
    );
  }

};

const mapStateToProps = state => ({
  modalVisible: state.CreateDeal.modalVisible,
  phoneNumber: state.CreateDeal.phoneNumber,
  sellerFirstname: state.CreateDeal.sellerFirstname,
  sellerLastname: state.CreateDeal.sellerLastname,
  sellerAddress: state.CreateDeal.sellerAddress,
  sellerCity: state.CreateDeal.sellerCity,
  sellerState: state.CreateDeal.sellerState,
  sellerZipcode: state.CreateDeal.sellerZipcode,
  allStates: state.DealItem.states,
  sendingCode: state.CreateDeal.sendingCode,
  sendingCodeSuccess: state.CreateDeal.sendingCodeSuccess,
  sendingCodeError: state.CreateDeal.sendingCodeError,
  sellerVerificationToken: state.CreateDeal.sellerVerificationToken,
  checkingCodeLoading: state.CreateDeal.checkingCodeLoading,
  checkingCodeSuccess: state.CreateDeal.checkingCodeSuccess,
  checkingCodeError: state.CreateDeal.checkingCodeError
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      openModalForPhoneVerification,
      closeModalAfterDealCreated,
      onEditPhoneNumber,
      onEditSellerFirstname,
      onEditSellerLastname,
      onEditSellerAddress,
      onEditSellerCity,
      onEditSellerState,
      onEditSellerZipcode,
      _startVerificationForSeller,
      onEditSellerVerificationToken,
      _checkVerificationForSeller
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(ItemDescription)
);

