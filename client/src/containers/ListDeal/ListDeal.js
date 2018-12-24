import React, { Component } from "react";
import "./ListDeal.css";
import Layout from "../Layout"
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _uploadImage } from "../../actions/listDealActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

class ListDeal extends Component {

  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    // formData.append('file', this.state.file[0]);
    files.forEach((file, i) => {
      formData.append(i, file);
    })

    this.props._uploadImage(formData);

  }

  content = () => {
    const { uploading, uploadedImages } = this.props;
    switch(true) {
      case uploading:
        return <LoadingSpinner />
      case uploadedImages.length > 0:
        return (
          uploadedImages.map((image, i) => (
            <img src={image.secure_url} alt='' />
          ))
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
              <input type='file' id='photos-upload' onChange={this.onChange} multiple/>
            </div>
        )
    }
  }



  render () {

    const { error } = this.state

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
                <div className="deal-listing-img col-3">
                <i class="fas fa-plus fa-2x"></i>
                </div>
                <div className="deal-listing-img col-3"></div>
                <div className="deal-listing-img col-3"></div>
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
  uploadedImages: state.UploadedImages.images,
  uploading: state.UploadedImages.uploading,
  error: state.UploadedImages.error,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _uploadImage }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListDeal);

