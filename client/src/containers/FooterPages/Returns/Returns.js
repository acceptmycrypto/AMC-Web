import React, { Component } from "react";
import "./Returns.css";
import Layout from "../../Layout";

class Returns extends Component {
  render() {
    return (
      <div>
        <Layout>
          <div className="returns-page">
            <div className="Returns-mainContent">
              <div className="font-17 color-deepBlue">
                <div className="ml-2" id="returns-amr">
                  AcceptMyReturns
                </div>
              </div>
              <hr className="star-light" />
              <div />

              <h4 className="returnsMenuTitle">Returns/Refunds Policy</h4>

              <ul className="returns-listItem">
                <li>
                  ALL SALES ARE FINAL. We accept returns for refund, but NOT
                  exchange, for items damaged in transit, lost/stolen (if
                  applicable), and/or the transaction was proven to be
                  fraudulent.
                </li>
              </ul>

              <h4 className="returnsMenuTitle">Refunds and Exchanges</h4>

              <ul className="returns-listItem">
                <li>
                  To be eligible for a refund or exchange, you must first set up
                  communication with us within 7 days of receiving the item at
                  support@acceptmycrypto.com to alert us of any of the above
                  mentioned criterias. Upon receipt of the damaged item we will
                  ship out a replacement, if available. If a replacement is not
                  available we will refund the full purchase price of your item
                  excluding a 2.5% processing fee (this amount is subject to
                  change at any time with or without notice, please check this
                  policy periodically to stay current on any changes).
                </li>
              </ul>

              <h4 className="returnsMenuTitle">None Refundable Items</h4>

              <ul className="returns-listItem">
                <li className="returnsListSubItem">Gift Cards</li>
                <li className="returnsListSubItem">Any Services</li>
                <li className="returnsListSubItem">Any Event Tickets</li>
              </ul>
              <ul id="returns-listSubItem">
                <li>We will always require a receipt or proof of purchase.</li>
              </ul>

              <h4 className="returnsMenuTitle">Refunds (If applicable)</h4>

              <ul className="returns-listItem">
                <li>
                  Once your return is received and inspected we will send you an
                  email to notify you that we have received your returned item.
                  If your return is approved, then your replacement or refund
                  will be processed and a credit will automatically be applied
                  to the wallet used when purchasing the Deal. Depending on the
                  method of payment this can take up to 7-10 business days.
                </li>
              </ul>

              <h4 className="returnsMenuTitle">Shipping</h4>

              <ul className="returns-listItem">
                <li>
                  You will be responsible for paying for your own shipping costs
                  for returning your item. Shipping costs are non-refundable.
                </li>
              </ul>

              <h4 className="returns-listItem">Lost and Stolen Packages</h4>

              <ul className="returns-listItem">
                <li>
                  AcceptMyCrypto is not responsible for lost or stolen packages
                  confirmed to be delivered to the address entered for an order.
                  Upon inquiry, AcceptMyCrypto will confirm delivery to the
                  address provided, date of delivery, tracking information and
                  shipping carrier information for the customer to investigate.
                </li>
              </ul>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default Returns;
