import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
// import { handleSelectedCategory } from '../../../../actions/listDealActions';
import '../Homepage.css';
import './CategoryHome.css';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateSelectedCategory } from '../../../../actions/homepageActions';
import { handleLongDescription } from '../../../../utils/helper_functions';


class CategoryHome extends Component {

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  handleRightButtonClick = (event) => {
    event.preventDefault();
    let containerName = event.target.parentElement.parentElement.childNodes[1].getAttribute('id');
    if (containerName == null) {
      containerName = event.target.parentElement.childNodes[1].getAttribute('id');
    }

    let container = document.getElementById(containerName);
    console.log("right", containerName, container);
    let containerWidth = container.offsetWidth - 200;
    this.sideScroll(container, 'right', 50, 100, containerWidth);
  }

  handleLeftButtonClick = (event) => {
    event.preventDefault();
    let containerName = event.target.parentElement.parentElement.childNodes[1].getAttribute('id');
    if (containerName == null) {
      containerName = event.target.parentElement.childNodes[1].getAttribute('id');
    }
    let container = document.getElementById(containerName);
    console.log("left", containerName, container);
    let containerWidth = container.offsetWidth - 200;
    this.sideScroll(container, 'left', 50, 100, containerWidth);


  }

  sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  properArticle = (category_name) =>{
    category_name = category_name.toUpperCase();
    if(category_name[0] === "A" || category_name[0] === "E" || category_name[0] === "I" || category_name[0] === "O" || category_name[0] === "U"){
      return "An"
    }else{
      return "A"
    }
  }

 createDealFromCategory = async () => {
   let category_name = this.props.category_collection_name;
    let selected_category = {};
    selected_category.value = category_name;
    selected_category.label = category_name;
    await this.props.updateSelectedCategory([selected_category]);
    await this.props.history.push('/listdeal');
 }

  render() {
    const { category_collection, category_collection_name, category_collection_id, user_id } = this.props;

    return (
      <div className="mt-4">
        <Link to={"/category?term=" + category_collection_name + "&page=1"} className="category-title-margin mb-3">{category_collection_name}<i className="fas fa-chevron-right chevron-right"></i></Link>
        {category_collection != undefined && category_collection.length > 0 && category_collection[0].id !== null && <div className="d-flex flex-row mt-3">
          {category_collection[0].id !== null && <button type="button" className="btn btn-light" id="leftCategoryButton" onClick={this.handleLeftButtonClick}><i className="fas fa-chevron-left category-icon-chevron"></i></button>}
          <div className="category_div" id={category_collection_id}>
            {category_collection.map(deal => (

              <div key={deal.id}
                className={deal.phone_number_verified === 0 && deal.seller_id !== user_id ? "category_item mx-2 deal-item-pending-hidden" : "category_item mx-2"}>
                <Link to={`/feed/deals/${deal.id}/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                  <div className="category-info">
                    <div className="category-image-div">
                      <img className="category-image" src={deal.featured_deal_image} alt="deal" />
                      {deal.deal_status !== "available" || deal.phone_number_verified === 0 ?
                      <div class="deal-status">
                        <div style={{textTransform: "uppercase"}}>
                          {deal.phone_number_verified === 0 ? "pending" : deal.deal_status}
                        </div>
                      </div> : null
                      }
                    </div>
                    <div className="mt-1 text-center mr-1 ml-1">{handleLongDescription(deal.deal_name, 50, 50)}</div>
                    {/* if seller is a vendor then display the venue name else if seller is a user then display the seller name which is the user's username */}
                    <div className="text-center mr-1 ml-1"><small>Offered by: {deal.venue_name || deal.seller_name}</small></div>
                  </div>

                  <div className="deal-price">
                    <div className="price-differ">
                      <div>
                        <div className="purchase-method">Dollar</div>
                        <div>${deal.pay_in_dollar.toFixed(2)}</div>
                      </div>
                      <div className="d-flex flex-column text-center justify-content-center">
                        <div className="purchase-method">Cryptocurrency</div>
                        <strong className="pay_in_crypto">${deal.pay_in_crypto.toFixed(2)}</strong>
                        <small className="w-75 pay_in_crypto discount">{this.convertToPercentage(deal.pay_in_dollar, deal.pay_in_crypto)}% OFF</small>

                      </div>
                    </div>
                  </div>

                </Link>
              </div>

            ))}
            {category_collection_name !== "Most Recent Deals Listed" && <div className="list-deal-category" onClick={this.createDealFromCategory}>
              <div className="list-deal-category-label">Create {this.properArticle(category_collection_name)} {category_collection_name} Deal </div>
              <i className="fas fa-plus fa-2x" />
            </div>}
          </div>
          {category_collection[0].id !== null && <button type="button" className="btn btn-light" id="rightCategoryButton" onClick={this.handleRightButtonClick}><i className="fas fa-chevron-right category-icon-chevron"></i></button>}
        </div>}
        {category_collection[0].id === null &&
          <div className="mt-3 margin-left-add-deal mb-5">
            <div className="list-deal-category" onClick={this.createDealFromCategory}>
                <div className="list-deal-category-label">Create {this.properArticle(category_collection_name)} {category_collection_name} Deal </div>
                <i className="fas fa-plus fa-2x" />
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.Photo.user_id
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ updateSelectedCategory}, dispatch);
}


export default withRouter(connect(mapStateToProps, matchDispatchToProps)(CategoryHome));
