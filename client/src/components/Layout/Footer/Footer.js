import React from "react";
import "./Footer.css";
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const Footer = props => {

    return (

     
      
      <div className="links">

      <Link to="/Faq">FAQ</Link>
      <div className="copyrightFooter">AcceptMyCrypto © 2018</div>
      
      </div>

 
    );
}


export default Footer;