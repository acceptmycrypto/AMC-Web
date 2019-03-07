import React from "react";
import "./Footer.css";
//These imports need to remain. Although, they are not being called, they throw an error when deleted!
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';



const Footer = props => {

  
    return (
     
      <div className="Footer">
      
      <div className="Footer-logo">
      {/* <span className="ml-2">
                AcceptMyCrypto
              </span> */}
      <div className="Footer-socialIcon">
      <SocialIcon className="FooterSocIcon"  url="https://www.linkedin.com/company/acceptmycrypto/" bgColor="#66DAC7" style={{ height: 25, width: 25 }} />
      <SocialIcon className="FooterSocIcon" url="https://www.instagram.com/acceptmycrypto/?hl=en" bgColor="#ff5a01"  style={{ height: 25, width: 25 }} />
      <SocialIcon className="FooterSocIcon" url="https://twitter.com/acceptmycrypto" bgColor="#1DA1F2" style={{ height: 25, width: 25 }}/>
      <SocialIcon className="FooterSocIcon" url="https://discordapp.com/channels/544415678191501314/544415678627577867" bgColor="#7289da" style={{ height: 25, width: 25 }} label="Discord"/>
      </div>
      <div className="copyrightFooter">AcceptMyCrypto © 2019</div>
      </div>

        <div className="Footer-cardBody">
        <div className="Footer-company">
      <h4 className="Footer-linkTitle">Company</h4>
      <span><Link className="Footer-link" to="/Faq">AcceptMyHelp</Link></span>
      <span><Link className="Footer-link" to="/AboutUs">AcceptMyStory</Link></span>
      <span><Link className="Footer-link" to="/Returns">AcceptMyReturns</Link></span>
      </div>
        </div>
    
        <div className="Footer-cardBody">
        <div className="Footer-terms">
      <h4 className="Footer-linkTitle">Terms</h4>
      <span><Link className="Footer-link" to="/TermsOfServ">AcceptMyTerms</Link></span>
      <span><Link className="Footer-link" to="/CookiesPolicy">AcceptMyCookies</Link></span>
      </div>
        </div>
    
      </div>
    

 
    );
}


export default Footer;