import React, { Component } from "react";
import "./UploadingImage.css";

const UploadingImage = props => {
  const { viewImage, uploadedImages, uploadImage, imageIsOnPreview, removeImage } = props;

  return (
    <div className="deal-listing-content">
      <div className="deal-listing-shown-image-container">
        {imageIsOnPreview()}
      </div>
      <div className="deal-listing-images">
        <div className="first-row">
          {/* image one */}
          {uploadedImages[0] !== undefined ? (
            <div
              data-imagekey={uploadedImages[0].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[0].Location}
                alt="uploaded_image"
              />
              <div class="main-uploaded-photo">Featured Photo</div>
            </div>
          ) : (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          )}

          {/* image two */}
          {uploadedImages[1] !== undefined ? (
            <div
              data-imagekey={uploadedImages[1].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[1].Location}
                alt="uploaded_image"
              />
            </div>
          ) : uploadedImages[0] !== undefined ? (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          ) : (
            <div className="deal-listing-img col-3" />
          )}

          {/* image three */}
          {uploadedImages[2] !== undefined ? (
            <div
              data-imagekey={uploadedImages[2].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[2].Location}
                alt="uploaded_image"
              />
            </div>
          ) : uploadedImages[1] !== undefined ? (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          ) : (
            <div className="deal-listing-img col-3" />
          )}
        </div>

        <div className="second-row">
          {/* image four */}
          {uploadedImages[3] !== undefined ? (
            <div
              data-imagekey={uploadedImages[3].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[3].Location}
                alt="uploaded_image"
              />
            </div>
          ) : uploadedImages[2] !== undefined ? (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          ) : (
            <div className="deal-listing-img col-3" />
          )}

          {/* image four */}
          {uploadedImages[4] !== undefined ? (
            <div
              data-imagekey={uploadedImages[4].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[4].Location}
                alt="uploaded_image"
              />
            </div>
          ) : uploadedImages[3] !== undefined ? (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          ) : (
            <div className="deal-listing-img col-3" />
          )}

          {/* image six */}
          {uploadedImages[5] !== undefined ? (
            <div
              data-imagekey={uploadedImages[5].Key}
              className="deal-uploaded-img-border col-3"
            >
              <i
                onClick={removeImage}
                class="fa fa-lg fa-times-circle delete-uploading-photo"
                aria-hidden="true"
              />
              <img
                onClick={viewImage}
                className="uploaded-listing-image"
                src={uploadedImages[5].Location}
                alt="uploaded_image"
              />
            </div>
          ) : uploadedImages[4] !== undefined ? (
            <div className="deal-listing-img col-3">
              <label htmlFor="small-photo-upload">
                <i class="fas fa-plus fa-2x" />
              </label>
              <input
                type="file"
                id="small-photo-upload"
                onChange={uploadImage}
              />
            </div>
          ) : (
            <div className="deal-listing-img col-3" />
          )}
        </div>
        <hr />
        <div id="photos-next-step">
          <button onClick={() => props.validateImageUpload() && props.showPricingStep()}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default UploadingImage;
