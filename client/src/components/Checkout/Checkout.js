import React from "react";
import "./Checkout.css";
import Countdown from 'react-countdown-now';
import { Link } from "react-router-dom";

const Checkout = props => (
  <div style={{textAlign: "center"}}>
    <div className="send-payment-header">
      <h3>Scan QR code or copy/paste payment address into wallet</h3>
      <h5 className="send-crypto-amount">Please send <strong>{props.showTransaction.amount} <span>{props.showPaidIn}
      </span></strong> to the below address</h5>
    </div>
    <div className="send-payment">
      <div>
        <img src={props.showTransaction.qrcode_url} alt="QR code"/>
      </div>

      <div>
        <div className="payment-address">
          <p>AcceptMyCrypto Payment Address:</p>
          <strong><p id="coinpayment-address">{props.showTransaction.address}</p></strong>
        </div>
        <div className="payment-timeout">*If no payment received in <strong ><Countdown date={Date.now() + props.showTimeout} /></strong>, the purchase order will be canceled.</div>
        <div>Once payment has received, we'll email you the order transaction.</div>

        <Link to="/profile">
          <div className="done-sending-payment">
            <button>Done</button>
          </div>
        </Link>

      </div>
    </div>

  </div>
);

export default Checkout;
