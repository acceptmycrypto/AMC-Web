import React, { Component } from "react";
import "./ListDeal.css";
import Layout from "../Layout"
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { _uploadImage } from "../../actions/listDealActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { debug } from "util";

class ListDeal extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     images: []
  //   };
  // }

  // handleImagesUpload = () => {
  //   let images = this.state.images.push(this.props.imageData.Location);
  //   this.setState({images});
  // }

  onChange = e => {
    const file = e.target.files;
    const formData = new FormData();

    formData.append('file', file[0]);

    this.props._uploadImage(localStorage.getItem('token'), formData);
  }



  content = () => {
    const { uploading, imageData } = this.props;

    switch(true) {
      case uploading:
        return <LoadingSpinner />
      case imageData.hasOwnProperty('Location'):
        // localStorage.setItem("image", imageData.Location);

        return (
          <img id="shown-uploading-image" src={imageData.Location} alt='uploaded_image' />
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

    const { error, images } = this.props
    debugger
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
                {images[0] ? <img className="uploaded-listing-image" src={images[0]} alt='uploaded_image' /> :  <i class="fas fa-plus fa-2x"></i>}
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
  imageData: state.UploadedImages.imageData,
  images: state.UploadedImages.images,
  uploading: state.UploadedImages.uploading,
  error: state.UploadedImages.error,
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ _uploadImage }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ListDeal);

