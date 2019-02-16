import React, { Component } from 'react';
import './Faq.css';
// Router and Route is never being called, but at the same time must not be deleted. If deleted, it thows an error.
// import { BrowserRouter as Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card, Collapse } from 'reactstrap';
import Navbar from '../Navigation/Navbar/Navbar';
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import {TextFilter} from 'react-text-filter';



class Faq extends Component {
  // constructor(props) {
  //   super(props);
    
render() {

    return (
      

        <div className="App">
        <Navbar/>
         
         <div class="menu">

{/* <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
      integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
      crossorigin="anonymous"></link>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    </head> */}

    <title> AcceptMyCrypto FAQ's </title> 
         
         <a class="menuItem" id="general">
         
                  General
            </a>

            <a class="menuItem" id="seller">
                  Sellers
           </a>

           <a class="menuItem" id="togglerBuyers">
                  Buyers
           </a>
           
           <a class="menuItem" id="togglerGuest">
                  Buying as a Guest
           </a>
         
         
         </div>
    
        <div className="App_Aside">
        {/* <div className="back_to_home"> <i className="fas fa-arrow-left" id="back-arrow"></i> <span>Home</span></div> */}
          <div className="font-17 color-deepBlue">
              <div className="ml-2" id="amh">
                AcceptMyHelp
              </div>
            </div>
          <hr className="star-light"></hr>
            <div>
<UncontrolledCollapse toggler="#general" isOpen="true">

      <h4 className="faqMenuTitle">General</h4>


      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion1">What is acceptmycrypto.com?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion1">
      <CardBody>
          
          <ul className="qnaList">
            <li class="answer">Acceptmycrypto.com is a marketplace to allows sellers to list items/services in crypto currencies or US dollars. It was created to assist in the acceptance of cryptocurrencies as a viable form of payment , which is why listings have a lower price in cryptocurrency.</li>
          </ul>
      </CardBody>
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion2">Do I need to create an account? </Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion2">
      <CardBody>
          <ul className="qnaList">  
            <li class="answer">Acceptmycrypto.com is a marketplace to allows sellers to list items/services in crypto currencies or US dollars. It was created to assist in the acceptance of cryptocurrencies as a viable form of payment , which is why listings have a lower price in cryptocurrency.</li>
          </ul>
      </CardBody>

</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion3">Who should I contact to ask questions about listing deals or services?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion3">
      <CardBody>
            <ul className="qnaList">
              <li class="answer">If you have any questions or concerns regarding listing items or services on AcceptMyCrypto please don’t hesitate to contact us. We will respond to you within 24 hours.</li>
            </ul>
      </CardBody>
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion4">How do I contact AcceptMyCrypto?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion4">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">Please click the Contact us link in the footer of the Home page and send us an email. We will respond within 24 hours.</li>
            <li class="answer">If for any reason the Contact us link doesn’t open an email box or you are unable to locate the link, please use our support email: support@acceptmycrypto.com</li>
          </ul>
      </CardBody>
           
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion5">How do you process payments?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion5">
         
      <CardBody>
          <ul className="qnaList">
            <li class="answer">Our users have the option of utilizing Coinpayments.com and Paypal. We offer the benefit of processing payments in Us dollars (through Paypal) and Cryptocurrency (through Coinpayments).</li>
            <li class="answer">The use of CoinPayments will incur a (Non-refundable) processing fee of 4.5%.</li>
          </ul>
      </CardBody>
              
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion6">How does AcceptMyCrypto deal with cryptocurrency fluctuation?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion6">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">AcceptMyCrypto does not assume responsibility for the fluctuation of any Cryptocurrency or the market itself.</li>
          </ul>
      </CardBody>
              
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion7">Is there an age limit to list a deal item or service?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion7">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">We require all sellers to be at least 18 years of age.</li>
          </ul>
      </CardBody>
              
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion8">Is there an age limit to purchase an item?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion8">
 
      {/* <CardBody>
          <ul className="qnaList">
            <li><h4>Is there an age limit to purchase an item?</h4></li>
          </ul>
      </CardBody> */}
            
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion9">Who’s responsible for sale tax?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion9">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">The seller will be able to and should add the appropriate state’s sales tax to the item(s) being sold.</li>
          </ul>
      </CardBody>
              
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion10">How does shipping work?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion10">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">AcceptMyCrypto can only offer domestic shipping, at this time. International shipping through our platform will not be accepted.</li>
            <li class="answer">Once we have received the funds from the buyer we will create a printing label for the seller.</li>
            <li class="answer">AcceptMyCrypto does not cover any shipping costs on behalf of the buyer or seller. All sellers are hereby advised, they will be responsible for any shipping fee/costs. Sellers will have the ability to add such fees/costs to the price of the item being sent or cover the fees/costs all together to provide free shipping to their customers. This is at the full discretion of the seller.</li>
          </ul>
      </CardBody>
              
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerQuestion11">How do I close/cancel my account</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerQuestion11">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer"> A request to close/cancel your account can be made through our Contact us link in the footer of the Home page or by clicking the link provided. We will respond within 24 hours of receipt and provide you with any further instructions, if applicable.</li>
            <li class="answer"> The account cannot be closed/canceled if there exists any open/pending sales or transactions at the time of the request. The request will be denied and will need to be re-submitted after ALL open/pending sales and transactions have been resolved.</li>
          </ul>
      </CardBody>
    
</UncontrolledCollapse>
</UncontrolledCollapse>
</div>


{/* <div className="FormField"> */}
            
<UncontrolledCollapse toggler="#seller">

      <h4 className="faqMenuTitle">Sellers</h4>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues1">Why should I sell something on AcceptMyCrypto?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues1">
 
      <CardBody>
          <ul className="qnaList">
            {/* <li><h4>Why should I sell something on AcceptMyCrypto?</h4></li> */}
          </ul>
      </CardBody>
    
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues2">How do I get started?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues2">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">Please visit our signup page and fill out the quick questionaire to see if you qualify to become a verified seller on AcceptMyCrypto.</li>
            <li class="answer">After qualifying, please follow the steps to Create a Deal.</li>
          </ul> 
      </CardBody>
    
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues3">How do I list an Item/service?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues3">
 
      <CardBody>
          <ul className="qnaList">
            <li class="answer">Please refer to our step-by-step guide on how to Create a Deal.</li>
            <li class="answer">Once you setup your profile and log on you will see a Create a Deal link at the top of the page. You simply fill out the form with as much detail as possible about the item or service you are listing.</li>
          </ul> 
      </CardBody>
    
</UncontrolledCollapse>

      <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues4">Can I list my product/service in all categories on AcceptMyCrypto?</Button></h4></li>
          </ul>
      </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues4">
 
      <CardBody>
          <ul className="qnaList">
         </ul> 
      </CardBody>

</UncontrolledCollapse>


        <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues5">What type of Deals can I not post on AcceptMyCrypto?</Button></h4></li>
          </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues5">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">Some products may not be listed as a matter of compliance with legal or regulatory restrictions (for example, prescription drugs) or AcceptMyCrypto policy (for example, crime scene photos). For detailed information, please see our Restricted Products Help section (being created).</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues6">What’s this about a cryptocurrency discount?</Button></h4></li>
          </ul>
        </CardBody>
      
<UncontrolledCollapse toggler="#togglerSellerQues6">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">The goal of AcceptMyCrypto is to grow the acceptance of cryptocurrencies. Sellers have the flexibility to choose a price for their listing but we require that the cryptocurrency price has at minimum 10% discount from the cash price.</li>
            </ul>   
        </CardBody>

</UncontrolledCollapse>

<CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues7">Do you offer fraud protection?</Button></h4></li>
          </ul>
        </CardBody>

        <UncontrolledCollapse toggler="#togglerSellerQues7">
 
        <CardBody>
            <ul className="qnaList">
            <li class="answer">Utilizing Coinpayments and Paypal provides fraud protection through the electronic processing of monetary transfers.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues8">How do I get paid?</Button></h4></li>
          </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues8">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">We will first collect the funds from the buyers. Once this is successful we notify the seller on the sellers profile and through a “Funds received” email.</li>
              <li class="answer">After receiving the “Funds received” email your next step as the seller would be to send out the item(s) or provide confirmation for any service.</li>
              <li class="answer">A completed sale refers to the funds being received by us from the buyer and we have received tracking information and/or confirmation for the item(s) and/or service(s) from the seller.</li>
              <li class="answer">Once these criterias are met we will transfer the funds of a completed sale to the wallet we have on file.</li>
              <li class="answer">-Note- It is important that you enter in the address of the cryptocurrency you would like to receive the funds in. The type of cryptocurrency the item is being sold for and the type of cryptocurrency that is being received MUST match.  For example, if the buyer pays in Bitcoin Cash, you must have the address of Bitcoin cash in order to receive the funds. We’re not responsible for invalid addresses. In the event there is an invalid address provided please contact us for further instructions.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
          <ul className="qnaList">
            <li><h4><Button size="lg" color="link" id="togglerSellerQues9">How much does it cost to sell on AcceptMyCrypto?</Button></h4></li>
          </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues9">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">AcceptMyCrypto charges a small 2.5 % fee for each item sold or service provided through our Crypto Marketplace. These fees are subject to change at any time with or without notification.</li>
            </ul>
              
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerSellerQues10">Does AcceptMyCyrpto provide tax documents at the end of the year?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues10">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">AcceptMyCrypto will provide the appropriate tax documents for your confirmed sales (incl. returns/refunds) no later than January 31st of current tax year.</li>
            </ul>
       
        </CardBody>

</UncontrolledCollapse>

          {/* <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerSellerQue11">Can I cancel/delete a listing I have already posted?</Button></h4></li>
            </ul>
          </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues11">
 
        <CardBody>
            <ul className="qnaList">
              <li></li>
            </ul>
        </CardBody>

</UncontrolledCollapse> */}

          <CardBody>
            <ul className="qnaList">
              {/* <li><h4>Sell Your Items</h4></li> */}
              <li><h4><Button size="lg" color="link" id="togglerSellerQues12">How do I manage my selling account?</Button></h4></li>
            </ul>
          </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues12">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">All our users have a profile that will allow the account holder to view all purchases and sales made with that account. The account holder will be able to toggle between purchases and sales as to ease the visibility of the profile.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerSellerQues13">How do I add inventory?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues13">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">You can create a new listing/deal through the Create a Deal link at the top of the page. Please refer to our step-by-step instructions on how to Create a Deal using the link provided.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerSellerQues14">How will I know when I have a sale?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues14">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">Once we have received the funds from the buyer (processed through Coinpayments or Paypal) we will send you a “Funds received” email explaining any further steps needed.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerSellerQues15">Can I offer gift-wrap and gift messaging services to my customers on AcceptMyCrypto.com?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerSellerQues15">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">AcceptMyCrypto cannot offer gift-wrapping or messaging services, at this time. Although, you as the seller, are able to offer this service to your customers. This should be something that you add to the description section of your Deal being posted. AcceptMyCrypto is not responsible for any gifting options of any product or service sold through our platform.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>
</UncontrolledCollapse>
         

          {/* <div className="FormField"> */}
<UncontrolledCollapse toggler="togglerBuyers">

        <h4 className="faqMenuTitle">Buyers</h4>

          <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues1">The cryptocurrency I want to use is not supported on your site, what can I do?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues1">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">While we make every effort to allow the use of the most popular coins, each seller chooses which coins he or she accepts for their individual listings. AccpetMyCrypto has no control over which type Cryptocurrency the seller will accept.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues2">Lost/Stolen/Damaged products, what can I do?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues2">
 
        <CardBody>
        <ul className="qnaList">
                  <li class="answer">The details of returns, exchanges and other issues that may arise are listed under our Returns/Refunds section in the footer of the Home page.</li>
                  <li class="answer">Typically any issues that may arise are handled between the buyer and the seller. If communications between the buyer and seller becomes unproductive and/of volatile AcceptMyCrypto will step in and attempt to mediate and resolve the issue. AcceptMyCrypto does not condone ANY acts of discrimination or violence (written or otherwise). Any account suspected of such acts will be deactivated and the user blocked from the platform.</li>
                </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues3">How do I request a refund/return?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues3">
 
        <CardBody>
        <ul className="qnaList">
                  <li class="answer">Each individual seller will have their own Return/Refund policy. Some may offer returns and some may not. For more information on this topic please refer to the individual seller and/or thier listing. You may also refer to our Return/Refund policy located in the footer of the Home page or click the link provided.</li>
                  <li class="answer">For fraudulent listings, If we determine that a listing is fake and/or fraudulent in any way we will make all efforts to ensure you receive your funds back (if a successful payment has already been processed).</li>
                  <li class="answer">For any accepted Returns/Refunds AcceptMyCrypto will subtract a 2.5% processing fee from the amount of the refund. These are charges that AcceptMyCrypto has incurred for processing the transaction.</li>
                </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues4">Can I cancel my order?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues4">
 
        <CardBody>
        <ul className="qnaList">
                  <li class="answer">The buyer has 15 minutes to pay for the item(s)/service(s) before the transaction auto-cancels. If payment has not been received in this window of time the transaction will be canceled and the item(s)/service(s) will become available for purchase again.</li>
                  <li class="answer">If the payment has been accepted and received, please refer to our Return/Refund policy in the footer of the Home page or click the link provided for further instructions.</li>
                </ul>
        </CardBody>

</UncontrolledCollapse>

<CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues5">Do I have a purchase history?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues5">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">Your purchase history (if signed up with an activated account) is located in your profile page. Yes. please visit your profile page</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerBuyersQues6">How can I contact the seller with any questions or concerns I may have?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerBuyersQues6">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">Located in your purchase history on your profile page will be a Contact Seller button listed with the item/service purchased. This button will open a chat window for you to begin a conversation with the seller.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>
</UncontrolledCollapse>



          {/* </div> */}
            {/* <div className="FormField"> */}
<UncontrolledCollapse toggler="togglerGuest">

      <h4 className="faqMenuTitle">Buying as a Guest</h4>

      <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerGuestQues1">How can I purchase an item on AcceptMyCrypto as a guest?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerGuestQues1">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">AcceptMyCrypto does not require you to open an account in order to purchase item(s)/service(s). We will still need to collect some personal information to process your orders such an email address, mailing address, billing information, etc.</li>
              <li class="answer">For you to have the full experience of our Marketplace (ie. contact directly with the seller, purchase history, crypto market trends, etc.) we encourage you to register an account and begin shopping.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerGuestQues2">Will I receive an order confirmation email?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerGuestQues2">
 
        <CardBody>
              <ul className="qnaList">
                <li class="answer">Yes. You will receive a confirmation when the ordered has been confirmed as well as an email with your tracking information. This is why we will need to gather your email address when purchasing an item/service.</li>
              </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerGuestQues3">Can I track my order when buying as a guest?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerGuestQues3">
 
        <CardBody>
            <ul className="qnaList">
              <li class="answer">Yes. Please refer to the above question.</li>
            </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerGuestQues4">How do guest returns work?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerGuestQues4">
 
        <CardBody>
              <ul className="qnaList">
                <li class="answer">As a guest, all sales are final unless we have determined the transaction to be fraudulent. Registering an account will allow you to contact the seller directly as well as the ability to take advantage of their return policy, where applicable. You can register a new account here.</li>
              </ul>
        </CardBody>

</UncontrolledCollapse>

        <CardBody>
            <ul className="qnaList">
              <li><h4><Button size="lg" color="link" id="togglerGuestQues5">How do I register an account on AcceptMyCrypto?</Button></h4></li>
            </ul>
        </CardBody>

<UncontrolledCollapse toggler="#togglerGuestQues5">
 
        <CardBody>
              <ul className="qnaList">
                <li class="answer">The registration process is a quick and easy one that will allow you to become a part of a new and exciting Crypto Marketplace. Let’s get you registered and connected with other Cryptocurrency holders and enthusiasts. Register here!</li>
              </ul>
        </CardBody>

</UncontrolledCollapse>
</UncontrolledCollapse>
            </div>

   
        {/* </div>
        <div className="App__Form">
        <div className="FormCenter">
        <form className="FormFields">
        
        <div className="FormField">
            <label className="FormField__Label"></label>
            <UncontrolledCollapse toggler="togglerQuestion1">
  <Card>
      <CardBody>
          <ul className="qnaList">
            <li><h4>What is acceptmycrypto.com?</h4></li>
              <ul className="qnaList">
                <li >Acceptmycrypto.com is a marketplace to allows sellers to list items/services in crypto currencies or US dollars. It was created to assist in the acceptance of cryptocurrencies as a viable form of payment , which is why listings have a lower price in cryptocurrency.</li>
              </ul>
</ul>
</CardBody>
 </Card>
</UncontrolledCollapse> 

             <UncontrolledCollapse toggler="togglerQuestion2">
  <Card>
      <CardBody>
        <ul className="qnaList">
            <li><h4>Do I need to create an account?</h4></li>
              <ul className="qnaList">
                <li>If you would like to have a listing then yes you would need to create an account.There is an option for guest checkout as a buyer, however, we advise you to create a profile for a more complete experience</li>
              </ul>
            </ul>
              </CardBody>
              </Card>
              </UncontrolledCollapse>

  
          </div>

          
        </form>
      </div> */}
        </div>
      // </div>
      
      
      
    );
}
}

export default Faq;