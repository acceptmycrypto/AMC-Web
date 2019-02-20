import React from "react";
import "./Footer.css";
//These imports need to remain. Although, they are not being called, they throw an error when deleted!
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const Footer = props => {

    return (

     
      
      <div className="Footer-links">

      <Link className="Faq-footer" to="/Faq">FAQ</Link>
      <Link className="AboutUs-footer" to="/AboutUs">About Us</Link>
      <div className="copyrightFooter">AcceptMyCrypto © 2018</div>
      
      </div>

 
    );
}


export default Footer;