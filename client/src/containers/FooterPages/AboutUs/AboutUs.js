import React, { Component } from 'react';
import './AboutUs.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import { BrowserRouter as Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
import Navbar from '../../Navigation/Navbar/Navbar';
// Will keep these imports for possible future use. Will delete when found unnecessary.
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import {TextFilter} from 'react-text-filter';



class AboutUs extends Component {
    
render() {

    return (
      

        <div className="AboutUs-page">
        <Navbar/>
         
         <div className="AboutUs-menu">

    <title> AcceptMyCrypto About Us </title> 
         
         <a className="aboutUs-menuItem" id="theTeam">
         
                  The Team
            </a>

            <a className="aboutUs-menuItem" id="avanika">

                  Avanika Krishnaswamy
                  </a>

           <a className="aboutUs-menuItem" id="jason">

                  Jason Neitro 
           </a>
           
           <a className="aboutUs-menuItem" id="simon">

                  Simon Nguyen
           </a>
           
           </div>
         
        <div className="aboutUs-mainContent">
          <div className="font-17 color-deepBlue">
              <div className="ml-2" id="AboutUs-amh">
                AboutUs
              </div>
            </div>
          <hr className="star-light"></hr>
            <div>
            </div>

<UncontrolledCollapse toggler="#theTeam" isOpen="true">

      <h4 className="aboutUsMenuTitle">The Team</h4>


      <CardBody>
          <ul>
              <li><img className="teamPic" src={"../../assets/images/theTeam.jpg"}></img></li>
          </ul>
          <ul className="aboutUs-list">
            <li className="aboutUs-listItem">The team at AcceptMyCrypto is dedicated to creating a platform that supports and promotes an avid community of cryptocurrency spenders. We are striving to be the world’s first online marketplace for cryptocurrency holders. By matching the users with the merchants through mutual cryptocurrency we are giving the user control over their wallet, allowing them to engage transactionally with the merchant using the currency of their choice. By using the features of our site we are providing the users with realtime crypto market trends based on the the specific crypto being used most on our platform. In doing so, we are providing our users with trust and reassurance in buying, investing in, and spending cryptocurrency; creating more active participants in the crypto market. </li>
          </ul>
      </CardBody>

</UncontrolledCollapse>


</div>
</div>




        
    );
}
}

export default AboutUs;