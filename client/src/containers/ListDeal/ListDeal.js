import React, { Component } from "react";
import { Prompt } from "react-router";
import "./ListDeal.css";
import Layout from "../Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  onEditingDealName,
  onEditingDetail
} from "../../actions/listDealActions";
import { _loadCryptocurrencies } from "../../actions/loadCryptoActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import UploadingImage from "./UploadImage/UploadingImage";
import Pricing from "./Pricing";
import Description from "./Description";

class ListDeal extends Component {
  componentDidMount = () => {
    this.props._loadCryptocurrencies();
  };
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
                <i class="fas fa-camera fa-7x" />
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
    this.props._removeImage(localStorage.getItem("token"), imageKey);
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
    const { dealName } = this.props;
  };

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
      editorState,

      onSelectImageToView,
      handleUploadingPhotosStep,
      handlePricingStep,
      handleDescriptionStep,
      onDiscountPercentageToChange,
      OnUSDPriceChange,
      priceInCrypto,
      validateDecimalForBasePrice,
      onEditingDealName,
      onEditingDetail
    } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    console.log("Crypto Amount", crypto_amount);
    return (
      <div>
        {/* If user is navigating away from the page, let user know data won't be saved */}
        <Prompt
          when={images.length > 0}
          message="Changes you made may not be saved."
        />
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
                onClick={handlePricingStep}
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
                onClick={handleDescriptionStep}
                className={showDescriptionStep ? "active step" : "step"}
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
            />
          )}
          {showDescriptionStep && (
            <Description
              editDealName={onEditingDealName}
              updateEditDetail={onEditingDetail}
              showEdittingState={editorState}
            />
          )}
        </Layout>
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
  editorState: state.CreateDeal.editorState
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
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
      onEditingDealName,
      onEditingDetail
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ListDeal);
