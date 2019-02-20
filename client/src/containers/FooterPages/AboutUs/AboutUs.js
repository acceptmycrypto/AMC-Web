import React, { Component } from 'react';
import './AboutUs.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import { BrowserRouter as Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
import Navbar from '../../Navigation/Navbar/Navbar';
import Footer from '../../../components/Layout/Footer';
// Will keep these imports for possible future use. Will delete when found unnecessary.
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import {TextFilter} from 'react-text-filter';



class AboutUs extends Component {
    
render() {

    return (
      

        <div className="AboutUs-page">
        <Navbar/>
         
         {/* <div className="AboutUs-menu">

    <title> AcceptMyCrypto About Us </title> 
         
         <a className="aboutUs-menuItem" id="theTeam">
         
                  The Team
            </a>

            <a className="aboutUs-menuItem" id="avanikaK">

                  Avanika Krishnaswamy
                  </a>

           <a className="aboutUs-menuItem" id="jasonN">

                  Jason Neitro 
           </a>
           
           <a className="aboutUs-menuItem" id="simonN">

                  Simon Nguyen
           </a>
           
           </div> */}
         
        <div className="aboutUs-mainContent">
          <div className="font-17 color-deepBlue">
              <div className="ml-2" id="AboutUs-amh">
                AboutUs
              </div>
            </div>
          <hr className="star-light"></hr>
            <div>
            </div>

{/* <UncontrolledCollapse toggler="#theTeam" isOpen="true"> */}

      <h4 className="aboutUsMenuTitle">The Team</h4>


      {/* <CardBody> */}
          <ul>
              <li><img className="teamPic" src={"../../assets/images/theTeam.jpg"}></img></li>
          </ul>
          <ul className="aboutUs-list">
            <li className="aboutUs-listItem">The team at AcceptMyCrypto is dedicated to creating a platform that supports and promotes an avid community of cryptocurrency spenders. We are striving to be the world’s first online marketplace for cryptocurrency holders. By matching the users with the merchants through mutual cryptocurrency we are giving the user control over their wallet, allowing them to engage transactionally with the merchant using the currency of their choice. By using the features of our site we are providing the users with realtime crypto market trends based on the the specific crypto being used most on our platform. In doing so, we are providing our users with trust and reassurance in buying, investing in, and spending cryptocurrency; creating more active participants in the crypto market. </li>
          </ul>
      {/* </CardBody>

</UncontrolledCollapse>

<UncontrolledCollapse toggler="#avanikaK"> */}

      <h4 className="aboutUsMenuTitle">Avanika Krishnaswamy</h4>


      {/* <CardBody> */}
          <ul>
              <li><img className="avanikaPic" src={"../../assets/images/avanikaPic.jpg"}></img></li>
          </ul>
          <ul className="aboutUs-list">
            <li className="aboutUs-listItem">Avanika K. ... </li>
          </ul>
      {/* </CardBody>

</UncontrolledCollapse>

<UncontrolledCollapse toggler="#jasonN"> */}

      <h4 className="aboutUsMenuTitle">Jason Neitro</h4>


      {/* <CardBody> */}
          <ul>
              <li><img className="jasonPic" src={"../../assets/images/jasonPic.jpg"}></img></li>
          </ul>
          <ul className="aboutUs-list">
            <li className="aboutUs-listItem">Jason N. ... </li>
          </ul>
      {/* </CardBody>

</UncontrolledCollapse>

<UncontrolledCollapse toggler="#simonN"> */}

      <h4 className="aboutUsMenuTitle">Simon Nguyen</h4>


      {/* <CardBody> */}
          <ul>
              <li><img className="simonPic" src={"../../assets/images/simonPic.jpg"}></img></li>
          </ul>
          <ul className="aboutUs-list">
            <li className="aboutUs-listItem">Simon N. ... </li>
          </ul>
      {/* </CardBody>

</UncontrolledCollapse> */}

<Footer/>


</div>
</div>




        
    );
}
}

export default AboutUs;