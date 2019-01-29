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
import CategoryHome from './CategoryHome/CategoryHome';



class Homepage extends Component {



  componentDidMount = () => {
    this.props._loadHomepage();
  }

  render() {
    const { error, loading, category_list, apparel_accessories, electronics, health_beauty, movies_music_games } = this.props;
    // console.log(category_list, apparel_accessories, electronics);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    const carouselItems = [
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
                <Link to={"/category?term="+category.category_name+"&page=1"} className="menu-item" key={category.id} category-id={category.id}>{category.category_name}</Link>
                // {/* <Menu.Item key={category.id} content={category.category_name} category-id={category.id} /> */}
            ))}
          </div>
          <UncontrolledCarousel items={carouselItems} indicators={false}  className="homepage-carousel" />
            <CategoryHome category_collection={apparel_accessories} category_collection_name={"Apparel & Accessories"} category_collection_id={"apparel_accessories_container"}/>
            <CategoryHome category_collection={electronics} category_collection_name={"Electronics, Computers & Office"} category_collection_id={"electronics_container"}/>
            <CategoryHome category_collection={health_beauty} category_collection_name={"Health & Beauty"} category_collection_id={"health_beauty"}/>
            <CategoryHome category_collection={movies_music_games} category_collection_name={"Movies, Music & Games"} category_collection_id={"movies_music_games"}/>              
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category_list: state.Homepage.category_list,
  apparel_accessories: state.Homepage.apparel_accessories,
  electronics: state.Homepage.electronics,
  health_beauty: state.Homepage.health_beauty,
  movies_music_games: state.Homepage.movies_music_games,
  error: state.Homepage.error,
  loading: state.Homepage.loading

});

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ _loadHomepage }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
