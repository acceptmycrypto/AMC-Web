import React, { Component } from "react";
import { Prompt } from 'react-router'
import "./ListDeal.css";
import Layout from "../Layout"
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _uploadImage, onSelectImageToView, _removeImage } from "../../actions/listDealActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

class ListDeal extends Component {

  // If user refreshes the page, we warn users that data won't be saved
  componentDidUpdate = () => {
    const { images } = this.props;
    if (images.length > 0) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  }

  handleImageUpload = e => {
    const file = e.target.files;
    const formData = new FormData();

    formData.append('file', file[0]);

    this.props._uploadImage(localStorage.getItem('token'), formData);
  }

  imageOnView = () => {
    const { uploading, images, imageView } = this.props;
    switch(true) {
      case uploading:
        return <LoadingSpinner />
      case images.length > 0:
        // localStorage.setItem("image", imageData.Location);
        return (
          <img id="shown-uploading-image" src={imageView} alt='uploaded_image' />
        )
      default:
        return (
          <div id="uploading-image">
              <label htmlFor="photos-upload">
                <div>
                  <i class="fas fa-camera fa-7x"></i>
                </div>
                <div>
                  <strong>Add a Photo</strong>
                  <p>Images must be in PNG or JPG format and under 5mb</p>
                </div>
              </label>
              <input type='file' id='photos-upload' onChange={this.onChange}/>
            </div>
        )
    }
  }

  onSelectImageToReMove = e => {
    let imageKey = e.target.parentElement.getAttribute("data-imagekey")
    this.props._removeImage(localStorage.getItem('token'), imageKey);
  }

  handleImagesToBeDeletedOnS3 = () => {
    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     alert( "This page is reloaded" );
    //   }
    // }
    console.log(this.props);

  }

  render () {
    const { error, images, onSelectImageToView } = this.props
    // this.handleImagesToBeDeletedOnS3();

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div>
        {/* If user is navigating away from the page, let user know data won't be saved */}
        <Prompt  when={images.length > 0} message="Changes you made may not be saved."/>
         <Layout>
           <div className="deal-container">
            <div className="ui three steps">
                  <a className="active step">
                    <i className="image icon"></i>
                    <div className="content">
                      <div className="title">Photos</div>
                      <div className="description">Add up to six photos</div>
                    </div>
                  </a>
                  <a className="step">
                  <i className="bitcoin icon"></i>
                    <div className="content">
                      <div className="title">Pricing</div>
                      <div className="description">Give your deal a discount price in crypto</div>
                    </div>
                  </a>

                  <a className="step">
                  <i className="edit icon"></i>
                    <div className="content">
                      <div className="title">Description</div>
                      <div className="description">Let the world know more about your listing</div>
                    </div>
                  </a>
              </div>
          </div>
          <div className="deal-listing-content">
            <div className="deal-listing-shown-image-container">
              {this.imageOnView()}
            </div>
            <div className="deal-listing-images">
              <div className="first-row">
                {/* image one */}
                {images[0] !== undefined ? <div data-imagekey={images[0].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[0].Location} alt='uploaded_image' />
                            </div> :
                              <div className="deal-listing-img col-3">
                                <label htmlFor="small-photo-upload">
                                  <i class="fas fa-plus fa-2x"></i>
                                </label>
                                <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                              </div>}

                {/* image two */}
                {images[1] !== undefined ?  <div data-imagekey={images[1].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[1].Location} alt='uploaded_image' />
                              </div> :
                            images[0] !== undefined ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}

                {/* image three */}
                {images[2] !== undefined ? <div data-imagekey={images[2].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[2].Location} alt='uploaded_image' />
                              </div> :
                            images[1] !== undefined ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}
              </div>

              <div className="second-row">
                {/* image four */}
                {images[3] !== undefined ? <div data-imagekey={images[3].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[3].Location} alt='uploaded_image' />
                              </div> :
                            images[2] !== undefined ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}

                {/* image four */}
                {images[4] !== undefined ? <div data-imagekey={images[4].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[4].Location} alt='uploaded_image' />
                              </div> :
                            images[3] !== undefined ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}

               {/* image six */}
                {images[5] !== undefined ? <div data-imagekey={images[5].Key} className="deal-listing-img col-3">
                                <i onClick={this.onSelectImageToReMove} class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[5].Location} alt='uploaded_image' />
                              </div> :
                            images[4] !== undefined ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.handleImageUpload}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}
              </div>
              <hr/>
              <div id="photos-next-step">
                <button>Next</button>
              </div>
            </div>

          </div>
         </Layout>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  imageData: state.UploadedImages.imageData,
  images: state.UploadedImages.images,
  imageView: state.UploadedImages.imageView,
  uploading: state.UploadedImages.uploading,
  error: state.UploadedImages.error,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _uploadImage, onSelectImageToView, _removeImage }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListDeal);

