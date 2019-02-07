import React, { Component } from "react";
import "./Description.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Editor, RichUtils } from "draft-js";
import { _loadCategory } from "../../../actions/categoryActions";
import {
  handleSelectedCategory,
  handleSelectedCondition,
  closeModalAfterDealCreated,
  onEditPhoneNumber,
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

class Description extends Component {
  //this method is to handle cursor focus when user clicks on the text area
  focus = () => this.refs.editor.focus();

  onItalicClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "ITALIC")
    );
  };

  onUnderlineClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.props.updateEditDetail(
      RichUtils.toggleInlineStyle(this.props.showEdittingState, "BOLD")
    );
  };

  //We have access to history props from withRouter
  directToDealItemPage = () => {
    this.props.history.push(
      `/feed/deals/${this.props.dealCreatedResult.deal_id}/${this.props.dealNameValue}`
    );
  };

  onVerificationStart = event => {
    event.preventDefault();

    const {
      phoneNumber,
      sellerAddress,
      sellerCity,
      sellerState,
      sellerZipcode
    } = this.props;

    if (!sellerState) {
      document.querySelector("#sellerState").classList.add("create-deal-select-error");
    } else {
      this.props._startVerificationForSeller(
        localStorage.getItem("token"),
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
      phoneNumber,
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
      dealCreatedResult,
      dealNameValue,
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
          <div>
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
              style={{ textDecoration: 'none' }}
              to={`/feed/deals/${dealCreatedResult.deal_id}/${dealNameValue}`}
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
            <label>Incorrect Verification Code. Please Enter the Code We Texted You.</label>
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
      case dealCreatedResult.phone_number_verified === 0:
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

            <div className="creating-deal-seller-address">
              <label>Address Info</label>
              <input
                onChange={onEditSellerAddress}
                value={sellerAddress}
                type="text"
                className="description-input"
                autofocus="autofocus"
                placeholder="Address"
                required
              />
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
            </div>

            <button>Text Me</button>
          </form>
        );
      default:
        return (
          <div>
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
              style={{ textDecoration: 'none' }} //make sure the link has no underline
              to={`/feed/deals/${dealCreatedResult.deal_id}/${dealNameValue}`}
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

  render() {

    const {
      parentCategory,
      handleSelectedCategory,
      handleSelectedCondition,
      closeModalAfterDealCreated,
      dealCreatedResult,
      modalVisible,
      resetDealCreated,
      dealNameValue,
      selectedCategoryValue,
      selectedConditionValue,
      sendingCode,
      sendingCodeSuccess
    } = this.props;

    const itemCondition = [
      { value: "New", label: "New" },
      { value: "Used", label: "Used" }
    ];

    return (
      <div className="deal-listing-description">
        <div className="listing-description-container">
          <div className="description-titles">Give Your Listing a Name</div>
          <input
            onChange={this.props.editDealName}
            value={dealNameValue}
            className="description-input"
            autofocus="autofocus"
            placeholder="Enter a name that others can easily find your listing"
          />
        </div>
        <div className="listing-description-container-for-dropdown-flex">
          <div className="listing-description-container-for-dropdown">
            <div className="description-titles description-title-dropdown">
              Select Your Listing Category
            </div>
            <Select
              className="dropdown"
              value={selectedCategoryValue}
              isMulti={true}
              options={parentCategory}
              onChange={handleSelectedCategory}
            />
          </div>

          <div className="listing-description-container-for-dropdown">
            <div className="description-titles description-title-dropdown">
              Select Your Item Condition (Optional)
            </div>
            <Select
              className="dropdown"
              options={itemCondition}
              onChange={handleSelectedCondition}
              value={selectedConditionValue}
            />
          </div>
        </div>

        <div>
          <div className="description-titles detail-title">Details</div>
          <div className="crypto-subtitle">
            Let buyer knows the detail about your listing.
          </div>
          <div className="listing-detail-buttons">
            <button className="detail-button" onClick={this.onItalicClick}>
              <i class="fas fa-italic" />
            </button>
            <button className="detail-button" onClick={this.onBoldClick}>
              <i class="fas fa-bold" />
            </button>
            <button className="detail-button" onClick={this.onUnderlineClick}>
              <i class="fas fa-underline" />
            </button>
          </div>
          <div className="editor-wrapper" onClick={this.focus}>
            <Editor
              editorState={this.props.showEdittingState}
              onChange={this.props.updateEditDetail}
              placeholder="Describe your listing..."
              ref="editor"
              spellCheck={true}
            />
          </div>
          <hr className="creating-deal-hr" />
          <div id="deal-listing-step-buttons">

            <div className="creating-deal-back-step">
              <button onClick={this.props.showPricingStep}>Previous</button>
            </div>

            <div
              onClick={() =>
                this.props.validateDescriptionStep() && this.props.createDeal()
              }
              className="creating-deal-next-step submit-listing-deal"
            >
              {this.props.loading_dealCreating ? (
                <LoadingSpinner />
              ) : (
                <button>Submit Deal</button>
              )}
            </div>
          </div>
        </div>

        <Modal
          visible={modalVisible}
          effect="fadeInUp"
          // onClickAway={() => {
          //   closeModalAfterDealCreated();
          //   this.directToDealItemPage();
          // }}
        >
          <div className="deal-created-modal">
            {this.dealCreatedModal()}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parentCategory: state.Category.parentCategory,
  modalVisible: state.CreateDeal.modalVisible,
  phoneNumber: state.CreateDeal.phoneNumber,
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
      _loadCategory,
      handleSelectedCategory,
      handleSelectedCondition,
      closeModalAfterDealCreated,
      onEditPhoneNumber,
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
  )(Description)
);
