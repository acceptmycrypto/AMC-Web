import React, { Component } from 'react';
import './Faq.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import { BrowserRouter as Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
import Navbar from '../../Navigation/Navbar/Navbar';
import Footer from '../../../components/Layout/Footer';
// Will keep these imports for possible future use. Will delete when found unnecessary.
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import {TextFilter} from 'react-text-filter';



class Faq extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    if(this.setState({ collapse: !this.state.collapse })){
        this.closeToggle();
    }
  }

    
render() {

    return (
      

        <div className="Faq-page">
        <Navbar/>
        
         
         <div className="Faq-menu">

    <title> AcceptMyCrypto FAQs </title> 
         
         <a className="Faq-menuItem" id="general" onClick={this.toggle}>
         
                  General
            </a>

            <a className="Faq-menuItem" id="seller"  onClick={this.toggle}>
                  Sellers
           </a>

           <a className="Faq-menuItem" id="buyers">
                  Buyers
           </a>
           
           <a className="Faq-menuItem" id="guest">
                  Buying as a Guest
           </a>
         
         
         </div>
    
        <div className="Faq-mainContent">
          <div className="font-17 color-deepBlue">
              <div className="ml-2" id="Faq-amh">
                AcceptMyHelp
              </div>
            </div>
          <hr className="star-light"></hr>
          
<Collapse toggler="#general" isOpen={!this.state.collapse}>
      <h4 className="faqMenuTitle">General</h4>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion1">What is acceptmycrypto.com?</Button></h4></li>
          </ul>
     
<UncontrolledCollapse toggler="#togglerQuestion1">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">Acceptmycrypto.com is a marketplace to allows sellers to list items/services in crypto currencies or US dollars. It was created to assist in the acceptance of cryptocurrencies as a viable form of payment , which is why listings have a lower price in cryptocurrency.</li>
          </ul>
     
</UncontrolledCollapse> 

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion2">Do I need to create an account? </Button></h4></li>
          </ul>
      
<UncontrolledCollapse toggler="#togglerQuestion2">
          <ul className="Faq-qnaList">  
            <li className="Faq-answer">If you would like to have a listing then yes you would need to create an account.There is an option for guest checkout as a buyer, however, we advise you to create a profile for a more complete experience.</li>
          </ul>
     
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion3">How do I contact AccpetMyCrypto?</Button></h4></li>
          </ul>

<UncontrolledCollapse toggler="#togglerQuestion3">
            <ul className="Faq-qnaList">
              <li className="Faq-answer">If you have any questions or concerns regarding listing items or services on AcceptMyCrypto please don’t hesitate to contact us. We will respond to you within 2 business days.</li>
            </ul>
      
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion4">Why do I need to verify my phone number?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion4">
            <ul className="Faq-qnaList">
              <li className="Faq-answer">At AcceptMyCrypto we ask all users to verify their phone numbers to confirm they’re a real person as well as to help in the recovery of a lost account.</li>
              {/* <li className="Faq-answer">To verify your phone number, just enter your phone number during the signup process or by going to My Page > Settings > Confirm Your Identity, and you’ll receive an automated message with a 4-digit verification code.</li> */}
              <li className="Faq-answer">After verifying your phone number, you will not receive any calls or text messages from AcceptMyCrypto.</li>
              <li className="Faq-answerNote">Note -- We are unable to verify international, prepaid, or VoIP phone numbers.</li>
            </ul>
      
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion5">How do I contact AcceptMyCrypto?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion5">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">Please click the Contact us link in the footer of the Home page and send us an email. We will respond within 2 buisness days.</li>
            <li className="Faq-answer">If for any reason the Contact us link doesn’t open an email box or you are unable to locate the link, please use our support email: support@acceptmycrypto.com</li>
          </ul>
      
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion6">How do you process payments?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion6">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">Our users have the option of utilizing Coinpayments.com and Paypal. We offer the benefit of processing payments in Us dollars (through Paypal) and Cryptocurrency (through Coinpayments).</li>
            <li className="Faq-answer">The use of CoinPayments will incur a (Non-refundable) processing fee of 2.5%.</li>
          </ul>
    
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion7">How does AcceptMyCrypto deal with cryptocurrency fluctuation?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion7">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">AcceptMyCrypto does not assume responsibility for the fluctuation of any Cryptocurrency or the market itself.</li>
          </ul>
    
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion8">Is there an age limit to list a deal item or service?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion8">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">We require all sellers to be at least 18 years of age.</li>
          </ul>
      
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion9">Is there an age limit to purchase an item?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion9">
      
          <ul className="Faq-qnaList">
            <li className="Faq-answer">If you are under 18, you may use the AcceptMyCrypto Services explicitly with involvement of a parent or guardian. Parents and guardians may create profiles for their minors.</li>
          </ul>
      
            
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion10">Who’s responsible for sale tax?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion10">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">The seller will be able to and should add the appropriate state’s sales tax to the item(s) being sold.</li>
          </ul>
      
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion11">How does shipping work?</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion11">
          <ul className="Faq-qnaList">
            <li className="Faq-answer">AcceptMyCrypto can only offer domestic shipping, at this time. International shipping through our platform will not be accepted.</li>
            <li className="Faq-answer">Once we have received the funds from the buyer we will create a shipping label for the seller.</li>
            <li className="Faq-answer">AcceptMyCrypto does not cover any shipping costs on behalf of the buyer or seller. All sellers are hereby advised, they will be responsible for any shipping fee/costs. Sellers will have the ability to add such fees/costs to the price of the item being sent or cover the fees/costs all together to provide free shipping to their customers. This is at the full discretion of the seller.</li>
          </ul>
    
</UncontrolledCollapse>

          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerQuestion12">How do I close/cancel my account</Button></h4></li>
          </ul>
    
<UncontrolledCollapse toggler="#togglerQuestion12">
          <ul className="Faq-qnaList">
            <li className="Faq-answer"> A request to close/cancel your account can be made through our Contact us link in the footer of the Home page or by clicking the link provided. We will respond within 2 business days of receipt and provide you with any further instructions, if applicable.</li>
            <li className="Faq-answer"> The account cannot be closed/canceled if there exists any open/pending sales or transactions at the time of the request. The request will be denied and will need to be re-submitted after ALL open/pending sales and transactions have been resolved.</li>
          </ul>
      
</UncontrolledCollapse>
</Collapse>
            
<Collapse toggler="#seller" isOpen={this.state.collapse}>

      <h4 className="faqMenuTitle">Sellers</h4>

    
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues1">Why should I sell something on AcceptMyCrypto?</Button></h4></li>
          </ul>
      

<UncontrolledCollapse toggler="#togglerSellerQues1">
 
      
          <ul className="Faq-qnaList">
            {/* <li><h4>Why should I sell something on AcceptMyCrypto?</h4></li> */}
          </ul>
      
    
</UncontrolledCollapse>

     
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues2">How do I get started?</Button></h4></li>
          </ul>
     

<UncontrolledCollapse toggler="#togglerSellerQues2">
 
      
          <ul className="Faq-qnaList">
            <li className="Faq-answer">Please visit our signup page and fill out the quick questionaire to see if you qualify to become a verified seller on AcceptMyCrypto.</li>
            <li className="Faq-answer">After qualifying, please follow the steps to Create a Deal.</li>
          </ul> 
      
    
</UncontrolledCollapse>

      
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues3">How do I list an Item/service?</Button></h4></li>
          </ul>
     

<UncontrolledCollapse toggler="#togglerSellerQues3">
 
      
          <ul className="Faq-qnaList">
            <li className="Faq-answer">Please refer to our step-by-step guide on how to Create a Deal.</li>
            <li className="Faq-answer">Once you setup your profile and log on you will see a Create a Deal link at the top of the page. You simply fill out the form with as much detail as possible about the item or service you are listing.</li>
          </ul> 
      
    
</UncontrolledCollapse>

     
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues4">Can I list my product/service in all categories on AcceptMyCrypto?</Button></h4></li>
          </ul>
     

<UncontrolledCollapse toggler="#togglerSellerQues4">
 
      
          <ul className="Faq-qnaList">
          <li className="Faq-answer">In order to provide an accurate and fair search function on our site, prior approval may be required to list certain products in certain categories. </li>
         </ul> 
      

</UncontrolledCollapse>


       
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues5">What type of Deals can I not post on AcceptMyCrypto?</Button></h4></li>
          </ul>
       

<UncontrolledCollapse toggler="#togglerSellerQues5">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Some products may not be listed as a matter of compliance with legal or regulatory restrictions (for example, prescription drugs) or AcceptMyCrypto policy (for example, crime scene photos). For detailed information, please see our Restricted Products Help section (being created).</li>
            </ul>
        

</UncontrolledCollapse>

       
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues6">What’s this about a cryptocurrency discount?</Button></h4></li>
          </ul>
        
      
<UncontrolledCollapse toggler="#togglerSellerQues6">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">The goal of AcceptMyCrypto is to grow the acceptance of cryptocurrencies. Sellers have the flexibility to choose a price for their listing but we require that the cryptocurrency price has at minimum 10% discount from the cash price.</li>
            </ul>   
        

</UncontrolledCollapse>

        
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues7">Do you offer fraud protection?</Button></h4></li>
          </ul>
        

        <UncontrolledCollapse toggler="#togglerSellerQues7">
 
        
            <ul className="Faq-qnaList">
            <li className="Faq-answer">Utilizing Coinpayments and Paypal provides fraud protection through the electronic processing of monetary transfers.</li>
            </ul>
        

</UncontrolledCollapse>

        
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues8">How do I get paid?</Button></h4></li>
          </ul>
       

<UncontrolledCollapse toggler="#togglerSellerQues8">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">We will first collect the funds from the buyers. Once this is successful we notify the seller on the sellers profile and through a “Funds received” email.</li>
              <li className="Faq-answer">After receiving the “Funds received” email your next step as the seller would be to send out the item(s) or provide confirmation for any service.</li>
              <li className="Faq-answer">A completed sale refers to the funds being received by us from the buyer and we have received tracking information and/or confirmation for the item(s) and/or service(s) from the seller.</li>
              <li className="Faq-answer">Once these criterias are met we will transfer the funds of a completed sale to the wallet we have on file.</li>
              <li className="Faq-answerNote">Note -- It is important that you enter in the address of the cryptocurrency you would like to receive the funds in.</li>
              <li className="Faq-answerNote">The type of cryptocurrency the item is being sold for and the type of cryptocurrency that is being received MUST match. For example, if the buyer pays in Bitcoin Cash, you must have the address of Bitcoin cash in order to receive the funds. We’re not responsible for invalid addresses.</li>
              <li className="Faq-answerNote">In the event there is an invalid address provided please contact us for further instructions.</li>
            </ul>
        

</UncontrolledCollapse>

        
          <ul className="Faq-qnaList">
            <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues9">How much does it cost to sell on AcceptMyCrypto?</Button></h4></li>
          </ul>
        

<UncontrolledCollapse toggler="#togglerSellerQues9">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">AcceptMyCrypto charges a small 2.5 % fee for each item sold or service provided through our Crypto Marketplace. These fees are subject to change at any time with or without notification.</li>
            </ul>
              
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues10">Does AcceptMyCyrpto provide tax documents at the end of the year?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerSellerQues10">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">AcceptMyCrypto will provide a history of your confirmed sales (incl. returns/refunds).</li>
            </ul>
       
        

</UncontrolledCollapse>

          
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues11">Can I cancel/delete a listing I have already posted?</Button></h4></li>
            </ul>
          

<UncontrolledCollapse toggler="#togglerSellerQues11">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Yes. You are able to cancel or delete a listing as long as the listing is not in a "pending" or "sold" state.</li>
            </ul>
        

</UncontrolledCollapse>

         
            <ul className="Faq-qnaList">
              {/* <li><h4>Sell Your Items</h4></li> */}
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues12">How do I manage my selling account?</Button></h4></li>
            </ul>
          

<UncontrolledCollapse toggler="#togglerSellerQues12">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">All our users have a profile that will allow the account holder to view all purchases and sales made with that account. The account holder will be able to toggle between purchases and sales as to ease the visibility of the profile.</li>
            </ul>
        

</UncontrolledCollapse>

       
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues13">How do I add inventory?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerSellerQues13">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">You can create a new listing/deal through the Create a Deal link at the top of the page. Please refer to our step-by-step instructions on how to Create a Deal using the link provided.</li>
            </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues14">How will I know when I have a sale?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerSellerQues14">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Once we have received the funds from the buyer (processed through Coinpayments or Paypal) we will send you a “Funds received” email explaining any further steps needed.</li>
            </ul>
        

</UncontrolledCollapse>

       
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerSellerQues15">Can I offer gift-wrap and gift messaging services to my customers on AcceptMyCrypto.com?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerSellerQues15">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">AcceptMyCrypto cannot offer gift-wrapping or messaging services, at this time. Although, you as the seller, are able to offer this service to your customers. This should be something that you add to the description section of your Deal being posted. AcceptMyCrypto is not responsible for any gifting options of any product or service sold through our platform.</li>
            </ul>
        

</UncontrolledCollapse>
</Collapse>
         
<UncontrolledCollapse toggler="buyers" isOpen={this.state.collapse} >

        <h4 className="faqMenuTitle">Buyers</h4>

         
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues1">The cryptocurrency I want to use is not supported on your site, what can I do?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerBuyersQues1">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">While we make every effort to allow the use of the most popular coins, each seller chooses which coins he or she accepts for their individual listings. AccpetMyCrypto has no control over which type Cryptocurrency the seller will accept.</li>
              <li className="Faq-answer">Currently, we allow each seller the ability to accept up to 10 different cryptocurrencies. If your Cryptocurrency of choice is not listed, please submit a "AcceptMyCrypto" request.</li>
              <li className="Faq-answer">If there is a high demand for any given Crypto, then, where possible, we will be sure to add it as an "AcceptedCrypto"</li>
            </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues2">Lost/Stolen/Damaged products, what can I do?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerBuyersQues2">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">The details of returns, exchanges and other issues that may arise are listed under our Returns/Refunds section in the footer of the Home page.</li>
                <li className="Faq-answer">Typically any issues that may arise are handled between the buyer and the seller. If communications between the buyer and seller becomes unproductive and/of volatile AcceptMyCrypto will step in and attempt to mediate and resolve the issue. AcceptMyCrypto does not condone ANY acts of discrimination or violence (written or otherwise). Any account suspected of such acts will be deactivated and the user blocked from the platform.</li>
              </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues3">How do I request a refund/return?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerBuyersQues3">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">Each individual seller will have their own Return/Refund policy. Some may offer returns and some may not. For more information on this topic please refer to the individual seller and/or thier listing. You may also refer to our Return/Refund policy located in the footer of the Home page or click the link provided.</li>
                <li className="Faq-answer">For fraudulent listings, If we determine that a listing is fake and/or fraudulent in any way we will make all efforts to ensure you receive your funds back (if a successful payment has already been processed).</li>
                <li className="Faq-answer">For any accepted Returns/Refunds AcceptMyCrypto will subtract a 2.5% processing fee from the amount of the refund. These are charges that AcceptMyCrypto has incurred for processing the transaction.</li>
              </ul>
        

</UncontrolledCollapse>

       
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues4">Can I cancel my order?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerBuyersQues4">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">The buyer has 15 minutes to pay for the item(s)/service(s) before the transaction auto-cancels. If payment has not been received in this window of time the transaction will be canceled and the item(s)/service(s) will become available for purchase again.</li>
                <li className="Faq-answer">If the payment has been accepted and received, please refer to our Return/Refund policy in the footer of the Home page or click the link provided for further instructions.</li>
              </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues5">Do I have a purchase history?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerBuyersQues5">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Your purchase history (if signed up with an activated account) is located in your profile page. Yes. please visit your profile page</li>
            </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerBuyersQues6">How can I contact the seller with any questions or concerns I may have?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerBuyersQues6">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Located in your purchase history on your profile page will be a Contact Seller button listed with the item/service purchased. This button will open a chat window for you to begin a conversation with the seller.</li>
            </ul>
        

</UncontrolledCollapse>
</UncontrolledCollapse>

<UncontrolledCollapse toggler="guest" isOpen={this.state.collapse}>

      <h4 className="faqMenuTitle">Buying as a Guest</h4>

       
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerGuestQues1">How can I purchase an item on AcceptMyCrypto as a guest?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerGuestQues1">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">AcceptMyCrypto does not require you to open an account in order to purchase item(s)/service(s). We will still need to collect some personal information to process your orders such an email address, mailing address, billing information, etc.</li>
              <li className="Faq-answer">For you to have the full experience of our Marketplace (ie. contact directly with the seller, purchase history, crypto market trends, etc.) we encourage you to register an account and begin shopping.</li>
            </ul>
        

</UncontrolledCollapse>

       
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerGuestQues2">Will I receive an order confirmation email?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerGuestQues2">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">Yes. You will receive a confirmation when the ordered has been confirmed as well as an email with your tracking information. This is why we will need to gather your email address when purchasing an item/service.</li>
              </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerGuestQues3">Can I track my order when buying as a guest?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerGuestQues3">
 
        
            <ul className="Faq-qnaList">
              <li className="Faq-answer">Yes. Please refer to the above question.</li>
            </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerGuestQues4">Can I return something if I checked out as a guest?</Button></h4></li>
            </ul>
        

<UncontrolledCollapse toggler="#togglerGuestQues4">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">As a guest, all sales are final unless we have determined the transaction to be fraudulent. Registering an account will allow you to contact the seller directly as well as the ability to take advantage of their return policy, where applicable. You can register a new account here.</li>
              </ul>
        

</UncontrolledCollapse>

        
            <ul className="Faq-qnaList">
              <li><h4><Button className="Faq-button" size="lg" color="link" id="togglerGuestQues5">How do I register an account on AcceptMyCrypto?</Button></h4></li>
            </ul>
       

<UncontrolledCollapse toggler="#togglerGuestQues5">
 
        
              <ul className="Faq-qnaList">
                <li className="Faq-answer">The registration process is a quick and easy one that will allow you to become a part of a new and exciting Crypto Marketplace. Let’s get you registered and connected with other Cryptocurrency holders and enthusiasts. Register here!</li>
              </ul>
        

</UncontrolledCollapse>
</UncontrolledCollapse>

<Footer/>
            </div>
            </div>
     
       
             
    );
}
}

export default Faq;