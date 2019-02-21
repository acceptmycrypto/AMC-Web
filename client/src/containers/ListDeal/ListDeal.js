import React, { Component } from "react";
import { Prompt } from "react-router";
import "./ListDeal.css";
import Layout from "../Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import {
  _uploadImage,
  onSelectImageToView,
  _removeImage,
  handleUploadingPhotosStep,
  handlePricingStep,
  handleDescriptionStep,
  onDiscountPercentageToChange,
  OnUSDPriceChange,
  validateDecimalForBasePrice,
  _getCryptoExchange,
  removeSelectedCrypto,
  handleSelectedCategory,
  handleSelectedCondition,
  onEditingDealName,
  onEditingDetail,
  _submitDeal,
  _updateEditingDeal,
  closeModalAfterDealCreated,
  resetListDeal
} from "../../actions/listDealActions";
import { _isLoggedIn } from '../../actions/loggedInActions';
import { _loadCryptocurrencies } from "../../actions/loadCryptoActions";
import { _loadCategory } from "../../actions/categoryActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import UploadingImage from "./UploadImage";
import Pricing from "./Pricing";
import Description from "./Description";


class ListDeal extends Component {

  componentDidMount = async () => {

    //return the param value
    await this.props._isLoggedIn(localStorage.getItem('token'));
    if (await this.props.userLoggedIn) {
      await this.props._loadCryptocurrencies();
      await this.props._loadCategory();
    }else{
      await this.props.history.push("/SignIn?redirect=ListDeal");
    }
  }

  // If user refreshes the page, we warn users that data won't be saved
  componentDidUpdate = () => {
    const { images } = this.props;
    if (images.length > 0) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  };

  handleImageUpload = e => {
    const file = e.target.files;
    const formData = new FormData();

    formData.append("file", file[0]);

    this.props._uploadImage(localStorage.getItem("token"), formData);
  };

  imageOnView = () => {
    const { uploading, images, imageView } = this.props;
    switch (true) {
      case uploading:
        return <LoadingSpinner />;
      case images.length > 0:
        // localStorage.setItem("image", imageData.Location);
        return (
          <img
            id="shown-uploading-image"
            src={imageView}
            alt="uploaded_image"
          />
        );
      default:
        return (
          <div id="uploading-image">
            <label htmlFor="photos-upload">
              <div>
                <i className="fas fa-camera fa-7x" />
              </div>
              <div>
                <strong>Add a Photo</strong>
                <p>Images must be in PNG or JPG format and under 5mb</p>
              </div>
            </label>
            <input
              type="file"
              id="photos-upload"
              onChange={this.handleImageUpload}
            />
          </div>
        );
    }
  };

  onSelectImageToReMove = e => {
    let imageKey = e.target.parentElement.getAttribute("data-imagekey");
    this.props._removeImage(localStorage.getItem("token"), imageKey, this.props.editingDeal);
  };

  calculateCryptoExchange = event => {
    const {
      _getCryptoExchange,
      crypto_amount,
      removeSelectedCrypto
    } = this.props;
    let cryptoSymbol = event.target.getAttribute("data-cryptosymbol");

    if (crypto_amount[cryptoSymbol]) {
      //if selected/true
      removeSelectedCrypto(cryptoSymbol);
    } else {
      _getCryptoExchange(
        localStorage.getItem("token"),
        cryptoSymbol,
        this.props.priceInCrypto
      );
    }
  };

  onCreateDeal = () => {
    const { dealName, selectedCategory, selectedCondition, _submitDeal, images, priceInUSD, priceInCrypto, crypto_amount } = this.props;

    let textDetailRaw = convertToRaw(this.props.editorState.getCurrentContent());
    let selected_cryptos = Object.keys(crypto_amount);

    _submitDeal(localStorage.getItem("token"), dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos);

  };

  onUpdatingDeal = () => {
    const { dealName, selectedCategory, selectedCondition, _updateEditingDeal, images, priceInUSD, priceInCrypto, crypto_amount, editingDealId } = this.props;

    let textDetailRaw = convertToRaw(this.props.editorState.getCurrentContent());

    let selected_cryptos = [];
    for (let cryptoSymbol in crypto_amount) {
      if (crypto_amount[cryptoSymbol] !== undefined) {
        selected_cryptos.push(cryptoSymbol)
      }
    }

    _updateEditingDeal(localStorage.getItem("token"), editingDealId, dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos);

  };

  handleImageUploadValidation = () => {
    const validateImageUploaded = {
      imageSRC: this.props.images[0]
    }
    let isDataValid = false;

    //Object.keys(validateNewInput) give us an array of keys
    //Array.every check if all indices passed the test
    //we check if the value of each property in the the object validateNewInput is === true
    if (Object.keys(validateImageUploaded).every((k) => {
      return validateImageUploaded[k] ? true : false
    })) {
      isDataValid = true;
    } else {
      //alert error message
      toast.error(this._validationErrors(validateImageUploaded).notifyImageUploadError, {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    return isDataValid;
  }

  handlePricingValidation = () => {
    let cryptosNotSelected = Object.keys(this.props.crypto_amount).every((k) => {
      return this.props.crypto_amount[k] === undefined ? true : false
    })

    const validatePricing = {
      basePrice: this.props.priceInUSD,
      selectedCrypto: !cryptosNotSelected //check if user has selected a crypto
    }

    let isDataValid = false;

    //Object.keys(validateNewInput) give us an array of keys
    //Array.every check if all indices passed the test
    //we check if the value of each property in the the object validateNewInput is === true
    if (Object.keys(validatePricing).every((k) => {
      return validatePricing[k] ? true : false
    })) {
      isDataValid = true;
    } else {
      if (!this.props.priceInUSD || this.props.priceInUSD === "NaN") {
        toast.error(this._validationErrors(validatePricing).notifyBasePriceEmptyError, {
          position: toast.POSITION.TOP_RIGHT
        });


      } else if (cryptosNotSelected) {

        toast.error(this._validationErrors(validatePricing).notifyCryptoNotSelectedError, {
          position: toast.POSITION.TOP_RIGHT
        });

      }
    }

    return isDataValid;
  }

  handleDescriptionValidation = () => {
    //convert Description into Text
    let textDetailRaw = convertToRaw(this.props.editorState.getCurrentContent());
    let detail = textDetailRaw.blocks[0].text;

    const validateDescription = {
      dealName: this.props.dealName,
      selectedCategory: this.props.selectedCategory.length > 0,
      description: detail
    }

    let isDataValid = false;

    //Object.keys(validateNewInput) give us an array of keys
    //Array.every check if all indices passed the test
    //we check if the value of each property in the the object validateNewInput is === true
    if (Object.keys(validateDescription).every((k) => {
      return validateDescription[k] ? true : false
    })) {
      isDataValid = true;
    } else {
      if (!this.props.dealName) {
        toast.error(this._validationErrors(validateDescription).notifyDealNameError, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else if (this.props.selectedCategory.length === 0) {
        toast.error(this._validationErrors(validateDescription).notifySelectedCategoryError, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else if (!detail) {
        toast.error(this._validationErrors(validateDescription).notifyDescriptionError, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }

    return isDataValid;
  }

  validateBasePriceToBeEnteredBeforeSelectCrypto = () => {
   const basePrice = this.props.priceInUSD;

   let isDataValid = false;

  if (basePrice && basePrice !== "NaN" && basePrice !== "0.00") {
    isDataValid = true;
  } else {
    // this.notifyBasePriceEmptyError();
    toast.error(this._validationErrors(basePrice).notifyBasePriceEmptyError, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return isDataValid;

  }

  _validationErrors(val) {
    const errMsgs = {
      notifyImageUploadError: val.imageSRC ? null : 'Please upload an image first.',
      notifyBasePriceEmptyError: val.basePrice && val.basePrice !== "NaN" && val.basePrice !== "0.00"? null : 'Please enter your base price.',
      notifyCryptoNotSelectedError: val.selectedCrypto ? null : 'Please select at least one Cryptocurrency.',
      notifyDealNameError: val.dealName ? null : 'Please give your listing a name.',
      notifySelectedCategoryError: val.selectedCategory ? null : 'Please select a category.',
      notifyDescriptionError: val.description ? null : 'Please describe your listing.'
    }

    return errMsgs;
  }

  render() {
    const {
      error,
      images,
      showPhotosStep,
      showPricingStep,
      showDescriptionStep,
      discountPercent,
      priceInUSD,
      cryptoOptionsForCreatingDeal,
      gettingRate,
      crypto_amount,
      parentCategory,
      editorState,
      creatingDeal,
      creatingDealError,
      dealCreated,
      modalVisible,

      onSelectImageToView,
      handleUploadingPhotosStep,
      handlePricingStep,
      handleDescriptionStep,
      onDiscountPercentageToChange,
      OnUSDPriceChange,
      priceInCrypto,
      validateDecimalForBasePrice,
      dealName,
      selectedCategory,
      selectedCondition,
      handleSelectedCategory,
      handleSelectedCondition,
      onEditingDealName,
      onEditingDetail,
      closeModalAfterDealCreated
    } = this.props;

    console.log(crypto_amount);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div className="pt-5">
        {/* If user is navigating away from the page, let user know data won't be saved */}
        {/* <Prompt
          when={images.length > 0}
          message="Changes you made may not be saved."
        /> */}
        <Layout>
          <div className="deal-container">
            <div className="ui three steps">
              <a
                onClick={handleUploadingPhotosStep}
                className={showPhotosStep ? "active step" : "step"}
              >
                <i className="image icon" />
                <div className="content">
                  <div className="title">Photos</div>
                  <div className="description">Add up to six photos</div>
                </div>
              </a>
              <a
                onClick={() => this.handleImageUploadValidation() && handlePricingStep()}
                className={showPricingStep ? "active step" : "step"}
              >
                <i className="bitcoin icon" />
                <div className="content">
                  <div className="title">Pricing</div>
                  <div className="description">
                    Give your deal a discount price in crypto
                  </div>
                </div>
              </a>

              <a
                onClick={() => this.handlePricingValidation() && handleDescriptionStep()}
                className={"step " + (!showPricingStep && showPhotosStep ? "disabled" : showDescriptionStep ? "active" : "" )}
              >
                <i className="edit icon" />
                <div className="content">
                  <div className="title">Description</div>
                  <div className="description">
                    Let the world know more about your listing
                  </div>
                </div>
              </a>
            </div>
          </div>
          {showPhotosStep && (
            <UploadingImage
              viewImage={onSelectImageToView}
              uploadedImages={images}
              uploadImage={this.handleImageUpload}
              imageIsOnPreview={this.imageOnView}
              removeImage={this.onSelectImageToReMove}
              validateImageUpload={this.handleImageUploadValidation}
              showPricingStep={handlePricingStep}
            />
          )}
          {showPricingStep && (
            <Pricing
              changeDiscountPercent={onDiscountPercentageToChange}
              showDiscountPercent={discountPercent}
              showPriceUSD={priceInUSD}
              showPriceCrypto={priceInCrypto}
              handlePriceUSDChange={OnUSDPriceChange}
              validateBasePrice={validateDecimalForBasePrice}
              cryptoOptions={cryptoOptionsForCreatingDeal}
              getCryptoExchange={this.calculateCryptoExchange}
              rateLoading={gettingRate}
              showCryptoAmount={crypto_amount}
              validatePricingStep={this.handlePricingValidation}
              showUploadingPhotoStep={handleUploadingPhotosStep}
              showDescriptionStep={handleDescriptionStep}
              validateSelectedCrypto={this.validateBasePriceToBeEnteredBeforeSelectCrypto}
            />
          )}
          {showDescriptionStep && (
            <Description
              editDealName={onEditingDealName}
              dealNameValue={dealName}
              selectedCategoryValue={selectedCategory}
              selectedConditionValue={selectedCondition}
              categories={parentCategory}
              selectedCategory={handleSelectedCategory}
              selectedCondition={handleSelectedCondition}
              updateEditDetail={onEditingDetail}
              showEdittingState={editorState}
              showPricingStep={handlePricingStep}
              createDeal={this.onCreateDeal}
              updateDeal={this.onUpdatingDeal}
              loading_dealCreating={creatingDeal}
              error_dealCreating={creatingDealError}
              dealCreatedResult={dealCreated}
              closeModal={closeModalAfterDealCreated}
              modalOpened={modalVisible}
              resetDealCreated={resetListDeal}
              validateDescriptionStep={this.handleDescriptionValidation}
            />
          )}
        </Layout>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imageData: state.CreateDeal.imageData,
  images: state.CreateDeal.images,
  imageView: state.CreateDeal.imageView,
  uploading: state.CreateDeal.uploading,
  error: state.CreateDeal.error,
  showPhotosStep: state.CreateDeal.showPhotosStep,
  showPricingStep: state.CreateDeal.showPricingStep,
  showDescriptionStep: state.CreateDeal.showDescriptionStep,
  discountPercent: state.CreateDeal.discountPercent,
  priceInUSD: state.CreateDeal.priceInUSD,
  priceInCrypto: state.CreateDeal.priceInCrypto,
  cryptoOptionsForCreatingDeal: state.LoadCrypto.cryptoOptionsForCreatingDeal,
  gettingRate: state.CreateDeal.gettingRate,
  crypto_amount: state.CreateDeal.crypto_amount,
  dealName: state.CreateDeal.dealName,
  parentCategory: state.Category.parentCategory,
  selectedCategory: state.CreateDeal.selectedCategory,
  selectedCondition: state.CreateDeal.selectedCondition,
  editorState: state.CreateDeal.editorState,
  creatingDeal: state.CreateDeal.creatingDeal,
  creatingDealError: state.CreateDeal.creatingDealError,
  dealCreated: state.CreateDeal.dealCreated,
  modalVisible: state.CreateDeal.modalVisible,
  userLoggedIn: state.LoggedIn.userLoggedIn,
  editingDeal: state.CreateDeal.editingDeal,
  editingDealId: state.CreateDeal.editingDealId
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { _isLoggedIn,
      _uploadImage,
      onSelectImageToView,
      _removeImage,
      handleUploadingPhotosStep,
      handlePricingStep,
      handleDescriptionStep,
      onDiscountPercentageToChange,
      OnUSDPriceChange,
      validateDecimalForBasePrice,
      _loadCryptocurrencies,
      _getCryptoExchange,
      removeSelectedCrypto,
      _loadCategory,
      handleSelectedCategory,
      handleSelectedCondition,
      onEditingDealName,
      onEditingDetail,
      _submitDeal,
      _updateEditingDeal,
      closeModalAfterDealCreated,
      resetListDeal,
      _isLoggedIn
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ListDeal);
