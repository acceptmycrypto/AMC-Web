import React from "react";
import "./Footer.css";
//These imports need to remain. Although, they are not being called, they throw an error when deleted!
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

const Footer = props => {

    return (

     
      
      <div className="Footer-links">

      <Link to="/Faq">FAQ</Link>
      <div className="copyrightFooter">AcceptMyCrypto © 2018</div>
      
      </div>

 
    );
}


export default Footer;