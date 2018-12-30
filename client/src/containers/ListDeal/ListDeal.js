import React, { Component } from "react";
import "./ListDeal.css";
import Layout from "../Layout"
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _uploadImage, onSelectImageToView } from "../../actions/listDealActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

class ListDeal extends Component {

  onChange = e => {
    const file = e.target.files;
    const formData = new FormData();

    formData.append('file', file[0]);

    this.props._uploadImage(localStorage.getItem('token'), formData);
  }

  content = () => {
    const { uploading, imageData, images } = this.props;
    switch(true) {
      case uploading:
        return <LoadingSpinner />
      case images.length > 0:
        // localStorage.setItem("image", imageData.Location);
        return (
          <img id="shown-uploading-image" src={imageData} alt='uploaded_image' />
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

  render () {

    const { error, images, onSelectImageToView } = this.props

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    return (
      <div>
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
              {this.content()}
            </div>
            <div className="deal-listing-images">
              <div className="first-row">
                {images[0] ? <div className="deal-listing-img col-3">
                                <i class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[0]} alt='uploaded_image' />
                            </div> :
                              <div className="deal-listing-img col-3">
                                <label htmlFor="small-photo-upload">
                                  <i class="fas fa-plus fa-2x"></i>
                                </label>
                                <input type='file' id='small-photo-upload' onChange={this.onChange}/>
                              </div>}


                {images[1] ?  <div className="deal-listing-img col-3">
                                <i class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[1]} alt='uploaded_image' />
                              </div> :
                            images[0] ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.onChange}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}


                {images[2] ? <div className="deal-listing-img col-3">
                                <i class="fa fa-lg fa-times-circle delete-uploading-photo" aria-hidden="true"></i>
                                <img onClick={onSelectImageToView} className="uploaded-listing-image" src={images[2]} alt='uploaded_image' />
                              </div> :
                            images[1] ?
                            <div className="deal-listing-img col-3">
                              <label htmlFor="small-photo-upload">
                                <i class="fas fa-plus fa-2x"></i>
                              </label>
                              <input type='file' id='small-photo-upload' onChange={this.onChange}/>
                            </div> :
                            <div className="deal-listing-img col-3"></div>}

              </div>

              <div className="second-row">
                <div className="deal-listing-img col-3"></div>
                <div className="deal-listing-img col-3"></div>
                <div className="deal-listing-img col-3"></div>
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
  uploading: state.UploadedImages.uploading,
  error: state.UploadedImages.error,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _uploadImage, onSelectImageToView }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListDeal);

