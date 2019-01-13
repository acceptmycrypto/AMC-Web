import React, { Component } from "react";
import { Prompt } from "react-router";
import "./ListDeal.css";
import Layout from "../Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  _uploadImage,
  onSelectImageToView,
  _removeImage
} from "../../actions/listDealActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import UploadingImage from "./UploadImage/UploadingImage";

class ListDeal extends Component {
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

  render() {
    const { error, images, onSelectImageToView } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

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
              <a className="active step">
                <i className="image icon" />
                <div className="content">
                  <div className="title">Photos</div>
                  <div className="description">Add up to six photos</div>
                </div>
              </a>
              <a className="step">
                <i className="bitcoin icon" />
                <div className="content">
                  <div className="title">Pricing</div>
                  <div className="description">
                    Give your deal a discount price in crypto
                  </div>
                </div>
              </a>

              <a className="step">
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
          <UploadingImage
            viewImage={onSelectImageToView}
            uploadedImages={images}
            uploadImage={this.handleImageUpload}
            imageIsOnPreview={this.imageOnView}
            removeImage={this.onSelectImageToReMove}
          />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imageData: state.UploadedImages.imageData,
  images: state.UploadedImages.images,
  imageView: state.UploadedImages.imageView,
  uploading: state.UploadedImages.uploading,
  error: state.UploadedImages.error
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    { _uploadImage, onSelectImageToView, _removeImage },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ListDeal);
