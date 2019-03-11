import React, { Component } from 'react';
import './Homepage.css';
import './HomepageMobile.css';
import { Menu, Segment } from 'semantic-ui-react'
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
// import { _login } from '../../../services/AuthService';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import { _isLoggedIn } from '../../../actions/loggedInActions';
import Footer from '../../../components/Layout/Footer';
import Layout from '../../Layout';
// import { _loadHomepage } from '../../../actions/homepageActions';
import { UncontrolledCarousel } from 'reactstrap';
import CategoryHome from './CategoryHome/CategoryHome';
import { _loadAllHomepageDeals, showCryptoLogos } from '../../../actions/homepageActions';

class Homepage extends Component {

  componentDidMount = () => {
    // this.props._loadHomepage();
    this.props._loadAllHomepageDeals();
    this.props.showCryptoLogos();
  }

  render() {
    const { error, loading, category_list, homepage_deals, cryptoLogos } = this.props;
    // console.log(category_list, apparel_accessories, electronics);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    console.log("all", homepage_deals.all_results);
    console.log("recent", homepage_deals.recent_deals);

    const header_one = () => {
      return (
        <div>
          Buy and Sell <strong>Almost Anything</strong> for <strong>Cryptocurrency</strong>
        </div>
      )
    }
    const header_two = () => {
        return (
            <div className="carousel-header-two">
                <div>
                    <i className="fas fa-tag"></i> Create a Deal for Sale
                </div>
                <div>
                    <i className="fas fa-truck"></i> Ship to Buyer
                </div>
                <div>
                    <i className="fas fa-wallet"></i> Get Paid with Cryptos
                </div>
            </div>
        )
    }
    const header_three = () => {
        return (
          <div>
              Accepted Cryptos
          </div>
        )
    }
    const caption_three = () => {
        return (
          <div>
            {cryptoLogos.map(crypto => {
                return <div className="crypto-logo"><img src={crypto} alt="crypto_logo"/></div>
            })}
          </div>
        )
    }

    const carouselItems = [
      {
        src: './assets/images/banner1.svg',
        // src: 'https://static.bhphoto.com/images/images500x500/Rosco_102354264825_E_Colour_5426_Blueberry_Blue_1233286396000_595543.jpg',
        altText: 'Slide 1',
        caption: 'AcceptMyCrypto is the easiest marketplace to buy and sell items for a discount price in crypto.',
        header: header_one()
      },
      {
        src: './assets/images/banner2.svg',
        // src: 'https://www.solidbackgrounds.com/images/2048x1536/2048x1536-true-blue-solid-color-background.jpg',
        altText: 'Slide 2',
        // caption: 'Slide 2',
        header: header_two()
      },
      {
        src: './assets/images/banner3.svg',
        // src: 'https://static.bhphoto.com/images/images500x500/Savage_36_1253_Widetone_Seamless_Background_Paper_1233087643000_486211.jpg',
        altText: 'Slide 3',
        caption: caption_three(),
        header: header_three()
      }
    ];


    return (
      <div>
        <Layout>
          {/* <p id="homepage_title">Homepage</p> */}
          <div className="menu-parent mob-category-menu">
            {category_list != undefined && category_list.length > 0 && category_list.map(category => (
              // <Menu.Item name={category.category_name} active={activeItem === category.category_name} onClick={this.handleItemClick} />
              <Link to={"/category?term=" + category.category_name + "&page=1"} className="menu-item" key={category.id} category-id={category.id}>{category.category_name}</Link>
              // {/* <Menu.Item key={category.id} content={category.category_name} category-id={category.id} /> */}
            ))}
          </div>
          <UncontrolledCarousel items={carouselItems} indicators={false} className="homepage-carousel" />
          {homepage_deals.recent_deals !== undefined && homepage_deals.recent_deals.length > 0 &&
            <CategoryHome category_collection={homepage_deals.recent_deals} category_collection_name={"Most Recent Deals Listed"} category_collection_id={`cat_recent`}/>
          }
          {homepage_deals.all_results !== undefined && homepage_deals.all_results.length > 0 && homepage_deals.all_results.map((categorizedDealArray, i) => (
            <CategoryHome category_collection={categorizedDealArray} category_collection_name={categorizedDealArray[0].category_name} category_collection_id={`cat_${i}`}/>
          ))}

          {/* <CategoryHome category_collection={apparel_accessories} category_collection_name={"Apparel & Accessories"} category_collection_id={"apparel_accessories_container"}/>
            <CategoryHome category_collection={electronics} category_collection_name={"Electronics, Computers & Office"} category_collection_id={"electronics_container"}/>
            <CategoryHome category_collection={health_beauty} category_collection_name={"Health & Beauty"} category_collection_id={"health_beauty"}/>
            <CategoryHome category_collection={movies_music_games} category_collection_name={"Movies, Music & Games"} category_collection_id={"movies_music_games"}/>               */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category_list: state.Homepage.category_list,
  homepage_deals: state.Homepage.homepage_deals,
  // apparel_accessories: state.Homepage.apparel_accessories,
  // electronics: state.Homepage.electronics,
  // health_beauty: state.Homepage.health_beauty,
  // movies_music_games: state.Homepage.movies_music_games,
  error: state.Homepage.error,
  loading: state.Homepage.loading,
  cryptoLogos: state.LoadCrypto.cryptoLogos
});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _loadAllHomepageDeals, showCryptoLogos}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
