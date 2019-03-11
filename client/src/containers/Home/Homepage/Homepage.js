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
import { _loadAllHomepageDeals, _loadAllHomepageDealsMobile } from '../../../actions/homepageActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetTracking } from '../../../actions/dealsActions';

class Homepage extends Component {

  componentDidMount = async () => {

    const mobileScreenSize = await window.matchMedia("(max-width: 640px)");

    if(mobileScreenSize.matches){
      await this.props._loadAllHomepageDealsMobile();
    }else{
      await this.props._loadAllHomepageDeals();
    }
    
    if(await this.props.trackingResult !== null && this.props.trackingResult.message === "success"){
      await  toast.success("Tracking Info Updated", {
        position: toast.POSITION.TOP_RIGHT
      });
      await this.props.resetTracking();
    }
  }

  render() {
    const { error, loading, category_list, homepage_deals } = this.props;


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

    const carouselItems = [
      {
        src: './assets/images/banner1.svg',
        // src: 'https://static.bhphoto.com/images/images500x500/Rosco_102354264825_E_Colour_5426_Blueberry_Blue_1233286396000_595543.jpg',
        altText: 'Slide 1',
        caption: 'AcceptMyCrypto is the easiest marketplace to buy and sell discounted items for crypto',
        header: header_one()
      },
      {
        src: './assets/images/banner2.svg',
        // src: 'https://www.solidbackgrounds.com/images/2048x1536/2048x1536-true-blue-solid-color-background.jpg',
        altText: 'Slide 2',
        // caption: 'Slide 2',
        // header: 'Slide 2 Header'
      },
      {
        src: './assets/images/banner3.svg',
        // src: 'https://static.bhphoto.com/images/images500x500/Savage_36_1253_Widetone_Seamless_Background_Paper_1233087643000_486211.jpg',
        altText: 'Slide 3',
        // caption: 'Slide 3',
        // header: 'Slide 3 Header'
      }
    ];


    return (
      <div>
        <Layout>
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
          
          <div className="full-width-deals">
          {homepage_deals.all_results !== undefined && homepage_deals.all_results.length > 0 && homepage_deals.all_results.map((categorizedDealArray, i) => (
            <CategoryHome category_collection={categorizedDealArray} category_collection_name={categorizedDealArray[0].category_name} category_collection_id={`cat_${i}`}/>
          ))}
          </div>

        </Layout>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category_list: state.Homepage.category_list,
  homepage_deals: state.Homepage.homepage_deals,
  error: state.Homepage.error,
  loading: state.Homepage.loading,
  trackingResult: state.matchedDeals.trackingResult,

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _loadAllHomepageDeals, _loadAllHomepageDealsMobile, resetTracking}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
