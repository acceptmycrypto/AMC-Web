import React, { Component } from 'react';
import './CookiesPolicy.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import { BrowserRouter as Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
import Navbar from '../../Navigation/Navbar/Navbar';
import Footer from '../../../components/Layout/Footer';
// Will keep these imports for possible future use. Will delete when found unnecessary.
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import {TextFilter} from 'react-text-filter';



class CookiesPolicy extends Component {
    
render() {

    return (
      

        <div className="cookies-page">
        <Navbar/>
         
        <div className="Cookies-mainContent">
          <div className="font-17 color-deepBlue">
              <div className="ml-2" id="cookies-amc">
                AcceptMyCookies
              </div>
            </div>
          <hr className="star-light"></hr>
            <div>
            </div>
            
      <h4 className="cookiesMenuTitle">THE COOKIES WE USE:</h4>

          <ul className="cookies-listItem">
              <li>AcceptMyCrypto uses cookies for a variety of reasons. Cookies make it easier for you to log on to and use the Site during your visits. The information collected permits us to analyze traffic patterns and target the interests of our users. This helps us provide you with a better experience by improving the content and making our Sites easier to use.</li>
          </ul>

      <h4 className="cookiesMenuTitle">THE FOLLOWING ARE TYPES OF COOKIES WE UTILIZE:</h4>

          <ul className="cookies-listItem">
              <li>Session Cookies: These are cookies that are required for the operation of our Site, especially the shopping aspect. They include, for example, cookies that enable you to log into secure areas of our websites, use a shopping cart or make use of e-billing services. These cookies expire after the browser is closed.</li>
              <li>Permanent Cookies. These are used to recognize you when you return to our Site. They remember your login details and password so you don’t have to type them in every time you use the site. This enables us to personalize our content for you and remember your preferences (for example, your choice of language or region), but are non-essential to the performance of the Site.</li>
              <li>Third Party Cookies. These cookies are used to make the advertising displayed on the Site more relevant to you. These cookies prevent ads from reappearing and ensure that ads are properly displayed. Certain third party cookies may track users over different websites, as well as social media platforms. These cookies allow us to integrate social media functions into our Site and may also be used for advertising purposes.</li>
          </ul>

      <h4 className="cookiesMenuTitle">HOW YOU CAN CONTROL THE COOKIES:</h4>

          <ul className="cookies-listItem">
              <li>When you first access AcceptMyCrypto, you may receive a message advising you that cookies and similar technologies are in use. By clicking "accept", closing the message, or continuing to browse the Sites, you signify that you understand and agree to the use of these technologies, as described in this Cookies Policy.</li>
              <li>You do not have to accept cookies and consent can be withdrawn at any time, although you may not be able to use certain features on the Sites. You can do this by activating the setting on your browser that allows you to refuse the setting of all or some cookies.</li>
          </ul>

          <h4 className="cookiesMenuTitle">CAN COOKIES BE DELETED OR BLOCKED:</h4>

          <ul className="cookies-listItem">
              <li>You will be presented with Internet cookies whichever browser you use (Internet Explorer, Chrome, Mozilla etc.). Although there are no absolute solutions, you can consider the following:</li>
              <ul className="cookies-listItem">
                  <li id="cookies-listSubItem">Erase cookies: </li>
                  <li>all you need to do is find the folder/file where cookies are stored on your computer and delete them. If you do this by hand, you need to remember to do it regularly.</li>
                  <li id="cookies-listSubItem">Block cookies:</li>
                  <li>if you want to block website's cookies, you need to configure your browser to categorically refuse all cookies that try to access your computer. The only disadvantage of this option is that you will no longer be recognised automatically on your favourite online. You need to be careful, though, because categorically blocking certain cookies may mean that you are no longer able to shop online</li>
                  <li id="cookies-listSubItem">Set your browser’s alert system:</li>
                  <li> you simply need to configure your browser to warn you each time a cookie is sent, letting you decide whether to allow the cookie or not. The only disadvantage of this solution is that you will spend more time refusing or accepting cookies than actually surfing the web</li>
                  <li id="cookies-listSubItem">Use specialist software:</li>
                  <li>you can download software that protects you against cookies. These software programmes, can be configured to let you change the content of the cookies that apply to you. These programmes, some of which are free, can be downloaded on the Internet</li>
              </ul>
          </ul>

<Footer/>

</div>
</div>




        
    );
}
}

export default CookiesPolicy;