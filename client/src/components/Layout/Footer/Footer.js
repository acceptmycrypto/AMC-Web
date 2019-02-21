import React from "react";
import "./Footer.css";
//These imports need to remain. Although, they are not being called, they throw an error when deleted!
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const Footer = props => {

    return (

     
      
      <div className="Footer-links">

      <div className="Footer-company">
      <h4 className="Footer-linkTitle">Company</h4>
      <span><Link className="Faq-footer" to="/Faq">AcceptMyHelp</Link></span>
      <span><Link className="AboutUs-footer" to="/AboutUs">About Us</Link></span>
      </div>

      
      <div className="copyrightFooter">AcceptMyCrypto © 2018</div>
      
      </div>

 
    );
}


export default Footer;