import React, { Component } from 'react';
import './Homepage.css';
import { Menu, Segment } from 'semantic-ui-react'
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
// import { _login } from '../../../services/AuthService';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import { _isLoggedIn } from '../../../actions/loggedInActions';
import Footer from '../../../components/Layout/Footer';
import Layout from '../../Layout';
import { _loadHomepage } from '../../../actions/homepageActions';

import { UncontrolledCarousel } from 'reactstrap';



class Homepage extends Component {



  componentDidMount = () => {
    this.props._loadHomepage();
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  handleLongDescription = (description) => {
    let trimmedDescription = description.trim();
    if (trimmedDescription.length > 125) {
      return trimmedDescription.substring(0, trimmedDescription.indexOf(' ', 75)) + "...";
    }
  }

  render() {
    const { error, loading, category_list, apparel_accessories } = this.props;
    console.log(category_list, apparel_accessories);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    const items = [
      {
        // src: './assets/images/user.png',
        src: 'https://static.bhphoto.com/images/images500x500/Rosco_102354264825_E_Colour_5426_Blueberry_Blue_1233286396000_595543.jpg',
        altText: 'Slide 1',
        // caption: 'Slide 1',
        // header: 'Slide 1 Header'

      },
      {
        // src: './assets/images/user.png',
        src: 'https://www.solidbackgrounds.com/images/2048x1536/2048x1536-true-blue-solid-color-background.jpg',
        altText: 'Slide 2',
        // caption: 'Slide 2',
        // header: 'Slide 2 Header'
      },
      {
        src: './assets/images/user.png',
        src: 'https://static.bhphoto.com/images/images500x500/Savage_36_1253_Widetone_Seamless_Background_Paper_1233087643000_486211.jpg',
        altText: 'Slide 3',
        // caption: 'Slide 3',
        // header: 'Slide 3 Header'
      }
    ];
    

    return (
      <div>
        <Layout>
          {/* <p id="homepage_title">Homepage</p> */}
          <div className="menu-parent">
            {category_list != undefined && category_list.length > 0 && category_list.map(category => (
              // <Menu.Item name={category.category_name} active={activeItem === category.category_name} onClick={this.handleItemClick} />
                <span className="menu-item" key={category.id} category-id={category.id}>{category.category_name}</span>
                // {/* <Menu.Item key={category.id} content={category.category_name} category-id={category.id} /> */}
            ))}
          </div>
          <UncontrolledCarousel items={items} indicators={false}  className="homepage-carousel" />
          <div>
            <h3 className="category-title-margin mb-3">Apparel & Accessories<i class="fas fa-chevron-right chevron-right"></i></h3>
            <div className="category_div">
            {apparel_accessories != undefined && apparel_accessories.length > 0 && apparel_accessories.map(deal => (
              <div key={deal.id} className="category_item mx-2">
                <Link to={`/feed/deals/${deal.id}/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >

                    <div className="category-info">
                      <div className="category-image-div">
                        <img className="category-image" src={deal.featured_deal_image} alt="deal"/>
                      </div>
                      <div className="mt-1">{deal.deal_name}</div>
                      {/* <small className="deal-description">{this.handleLongDescription(deal.deal_description)}</small> */}
                      {/* if seller is a vendor then display the venue name else if seller is a user then display the seller name which is the user's username */}
                      <div><small>Offered by: {deal.venue_name || deal.seller_name}</small></div>
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
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category_list: state.Homepage.category_list,
  apparel_accessories: state.Homepage.apparel_accessories,
  error: state.Homepage.error,
  loading: state.Homepage.loading

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _loadHomepage }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
