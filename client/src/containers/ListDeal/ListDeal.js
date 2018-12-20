import React, { Component } from "react";
import "./ListDeal.css";
import Layout from "../Layout"
import { connect } from "react-redux";

class ListDeal extends Component {

  render () {
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
                      <div className="title">Detailing</div>
                      <div className="description">Let the world know more about your listing</div>
                    </div>
                  </a>
              </div>
          </div>
          <div className="deal-listing-content">
            <div className="deal-listing-shown-image-container">
              <div>
                <i class="fas fa-camera fa-7x"></i>
                <p className="add-a-photo">Add a Photo</p>
              </div>
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


            </div>
          </div>
         </Layout>
      </div>
    )
  }

}

export default ListDeal;
