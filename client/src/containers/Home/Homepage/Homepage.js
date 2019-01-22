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

    return (
      <div>
        <Layout>
          {/* <p id="homepage_title">Homepage</p> */}
          <Menu pointing secondary className=" d-flex flex-row justify-content-center w-100">
            {category_list != undefined && category_list.length > 0 && category_list.map(category => (
              // <Menu.Item name={category.category_name} active={activeItem === category.category_name} onClick={this.handleItemClick} />
              <Menu.Item key={category.id} name={category.category_name} />
            ))}
          </Menu>
          <div>
            <h3 className="ml-5">Apparel & Accessories</h3>
            <div className="mx-4 category_div justify-content-center">
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
