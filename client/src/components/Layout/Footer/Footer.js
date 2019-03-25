import React from "react";
import "./Footer.css";
import "./FooterMobile.css";
import { Link } from "react-router-dom";

const Footer = props => {
  return (
    <div className="Footer">
      <div className="Footer-logo">
        <div className="Footer-socialIcon">
          <a
            target="_blank"
            href="https://discordapp.com/channels/544415678191501314/544415678627577867"
          >
            <i class="fab fa-discord fa-2x" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/acceptmycrypto/?hl=en"
          >
            <i class="fab fa-instagram fa-2x" />
          </a>
        </div>
        <div className="copyrightFooter">AcceptMyCrypto © 2019</div>
      </div>

      <div className="Footer-cardBody">
        <div className="Footer-company">
          <h4 className="Footer-linkTitle">Company</h4>
          <span>
            <Link className="Footer-link" to="/Faq">
              AcceptMyHelp
            </Link>
          </span>
          <span>
            <Link className="Footer-link" to="/Returns">
              AcceptMyReturns
            </Link>
          </span>
        </div>

        <div className="Footer-terms">
          <h4 className="Footer-linkTitle">Terms</h4>
          <span>
            <Link className="Footer-link" to="/TermsOfService">
              AcceptMyTerms
            </Link>
          </span>
          <span>
            <Link className="Footer-link" to="/CookiesPolicy">
              AcceptMyCookies
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
