import React from "react";
import "./Footer.css";
//These imports need to remain. Although, they are not being called, they throw an error when deleted!
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import { Row, Col } from 'reactstrap';

const Footer = props => {

    return (
      <div className="Footer">
      
      {/* <img className="Footer_logo" src="https://s3-us-west-1.amazonaws.com/acceptmycrypto/logo.png" alt="logo" /> */}
      <Row>
      <Col sm="2" className="Footer-logo">
      <span className="ml-2">
                AcceptMyCrypto
              </span>
      <div className="Footer-socialIcon">
      <SocialIcon  url="https://www.linkedin.com/company/acceptmycrypto/" bgColor="#66DAC7" style={{ height: 25, width: 25 }} />
      <SocialIcon  url="https://www.instagram.com/acceptmycrypto/?hl=en" bgColor="#ff5a01"  style={{ height: 25, width: 25 }} />
      <SocialIcon  url="https://twitter.com/acceptmycrypto" bgColor="#1DA1F2" style={{ height: 25, width: 25 }}/>
      </div>
      <div className="copyrightFooter">AcceptMyCrypto © 2018</div>
      </Col>
      <Col sm="4" className="Footer-colCompany">
        <div className="Footer-cardBody">
        <div className="Footer-company">
      <h4 className="Footer-linkTitle">Company</h4>
      <span><Link className="Footer-link" to="/Faq">AcceptMyHelp</Link></span>
      <span><Link className="Footer-link" to="/AboutUs">AcceptMyStory</Link></span>
      <span><Link className="Footer-link" to="/Returns">AcceptMyReturns</Link></span>
      </div>
        </div>
      </Col>
      <Col sm="3" className="Footer-colTerms">
        <div className="Footer-cardBody">
        <div className="Footer-terms">
      <h4 className="Footer-linkTitle">Terms</h4>
      <span className="Footer-link">AcceptMyTerms</span>
      <span><Link className="Footer-link" to="/CookiesPolicy">AcceptMyCookies</Link></span>
      </div>
        </div>
      </Col>
    </Row>

      </div>

 
    );
}


export default Footer;