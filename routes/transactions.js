var express = require("express");
var app = express();
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
//coinpayment
var Coinpayments = require("coinpayments");
var keys = require("../key");
var client = new Coinpayments(keys.coinpayment);
var MERCHANT_ID = keys.coinpayment.MERCHANT_ID;
var IPN_SECRET = keys.coinpayment.IPN_SECRET;
var { verify } = require(`coinpayments-ipn`);
var CoinpaymentsIPNError = require(`coinpayments-ipn/lib/error`);
var paypal = require('paypal-rest-sdk');
var request = require("request");
//shippo
var shippo = require('shippo')(process.env.SHIPMENT_KEY);

//use sendgrid
var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.sendgrid);

var verifyToken = require("./utils/validation");

//email template
var path = require("path");
var fs = require('fs');
var ejs = require('ejs');

//paypal
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

var connection = mysql.createConnection({
  host: process.env.DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PW,
  database: process.env.DB_DB
});

//compile email template for withdraw token
var cryptoWithdrawEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/cryptoWithdrawConfirmation/cryptoWithdrawConfirmation.ejs'), 'utf-8');
var cryptoWithdrawEmailTemplate = ejs.compile(cryptoWithdrawEmailTemplateText);

//compile email template for balance deposited updated
var balanceDepositedEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/balanceDeposited/balanceDeposited.ejs'), 'utf-8');
var balanceDepositedEmailTemplate = ejs.compile(balanceDepositedEmailTemplateText);

// api
//get list of transactions that are shared to the community and have received the payment.
//info we need to send to the client: the deal name, the user name, the crypto symbol, the venue name, date purchased
router.get("/api/transactions/community/payment_received", function (req, res) {
  connection.query(
    "SELECT users_purchases.date_purchased, users_purchases.amount, deals.deal_name, users.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = users.id WHERE permission = ? AND payment_received = ? ORDER BY users_purchases.date_purchased DESC",
    ["community", 1], //1 is true for payment received //community means any user on acceptmycrypto platform
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//coinpayment
router.post("/checkout", verifyToken, function (req, res) {
  //Inserting to user_purchases table, this doens't mean purchase is successful
  //Need to listen to IPN (instant payment notification) when payment has recieved and then update payment_recieved to true

  let user_id = req.decoded._id;
  let crypto_name = req.body.crypto_name;

  // createMatchedFriends(user_id, crypto_name);

  client.createTransaction(
    {
      currency1: "USD",
      currency2: req.body.crypto_symbol, // The currency the buyer will be sending.
      amount: req.body.amount // Expected amount to pay, where the price is expressed in currency1
    },
    function (err, paymentInfo) {
      if (err) {
        console.log("coinpayment error: ", err);
      } else {

        connection.query(
          'SELECT crypto_info.id FROM crypto_info LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE crypto_name = ?',
          [req.body.crypto_name],
          function (error, cryptoID, fields) {
            if (error) console.log(error);

            connection.query(
              "INSERT INTO users_purchases SET ?",
              {
                user_id: user_id,
                deal_id: req.body.deal_id,
                crypto_id: cryptoID[0].id,
                amount: paymentInfo.amount,
                txn_id: paymentInfo.txn_id, //coinpayment transaction address
                address: paymentInfo.address, //coinpayment temporary address
                confirms_needed: paymentInfo.confirms_needed,
                timeout: paymentInfo.timeout, //in seconds
                status_url: paymentInfo.status_url,
                qrcode_url: paymentInfo.qrcode_url
              },
              function (err, transactionInitiated) {
                if (err) {
                  console.log(err);
                }

                let time_left_hrs = paymentInfo.timeout / 60 / 60;

                //insert shipping address into table
                connection.query(
                  "INSERT INTO users_shipping_address SET ?",
                  {
                    shipping_firstname: req.body.firstName,
                    shipping_lastname: req.body.lastName,
                    shipping_address: req.body.shippingAddress,
                    shipping_city: req.body.shippingCity,
                    shipping_state: req.body.shippingState.value,
                    shipping_zipcode: req.body.zipcode,
                    txn_id: paymentInfo.txn_id
                  },
                  function (err, shipping_data, fields) {
                    if (err) throw err;
                  }
                );

                //email to user that the deal has reserved
                connection.query('SELECT deals.deal_name, users.username AS seller_name FROM deals LEFT JOIN users ON deals.seller_id = users.id WHERE deals.id = ?',
                [req.body.deal_id],
                function (error, res, fields) {
                  if (error) throw error;

                  let view_deal;
                  if (process.env.NODE_ENV == "development") {
                    view_deal = `${process.env.FRONTEND_URL}/feed/deals/${req.body.deal_id}/${res[0].deal_name}`;
                  } else {
                    view_deal = `${process.env.BACKEND_URL}/feed/deals/${req.body.deal_id}/${res[0].deal_name}`;
                  }

                  //this template is generic for both guess user and registered
                  const guest_checkout = {
                    to: req.body.user_email,
                    from: process.env.CUSTOMER_SUPPORT,
                    subject: 'You Reserved a Deal',
                    html: guest_checkout_emailTemplate(
                      {
                        deal_name: res[0].deal_name,
                        seller_name: res[0].seller_name,
                        time_left: time_left_hrs,
                        amount: paymentInfo.amount,
                        crypto: req.body.crypto_name,
                        address: paymentInfo.address,
                        view_deal: view_deal
                      })
                  };
                  sgMail.send(guest_checkout);
                });

                connection.query(
                  "UPDATE deals SET deal_status = ? WHERE id = ?",
                  ["reserved", req.body.deal_id],
                  function (err, result) {
                    if (err) {
                      console.log(err);
                    }
                    //send the paymentInfo to the client side
                    res.json({ paymentInfo, deal_status: "reserved" });
                  }
                );
              }
            );

          }
        );

      }
    }
  );

});

//this email template is sent to customer if payment has received
var guest_checkout_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/guestCheckout/guestCheckout.ejs'), 'utf-8');
var guest_checkout_emailTemplate = ejs.compile(guest_checkout_ET);


//coinpayment
router.post("/guestCheckout", function (req, res) {
  //Inserting to user_purchases table, this doens't mean purchase is successful
  //Need to listen to IPA when payment has recieved and then update payment_recieved to true

  let crypto_name = req.body.crypto_name;

  client.createTransaction(
    {
      currency1: "USD",
      currency2: req.body.crypto_symbol, // The currency the buyer will be sending.
      amount: req.body.amount // Expected amount to pay, where the price is expressed in currency1
    },
    function (err, paymentInfo) {
      if (err) {
        console.log("coinpayment error: ", err);
      } else {
        //send the paymentInfo to the client side


        connection.query(
          'SELECT crypto_info.id FROM crypto_info LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE crypto_name = ?',
          [req.body.crypto_name],
          function (error, cryptoID, fields) {
            if (error) console.log(error);

            connection.query(
              "INSERT INTO guest_users SET ?",
              {
                email: req.body.email,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone_number: req.body.phoneNumber
              },
              function (error, results, fields) {
                if (error) throw error;
                let guest_user_id = results.insertId;


                connection.query(
                  "INSERT INTO users_purchases SET ?",
                  {
                    guest_user_id: guest_user_id,
                    deal_id: req.body.deal_id,
                    crypto_id: cryptoID[0].id,
                    amount: paymentInfo.amount,
                    txn_id: paymentInfo.txn_id, //coinpayment transaction address
                    address: paymentInfo.address, //coinpayment temporary address
                    confirms_needed: paymentInfo.confirms_needed,
                    timeout: paymentInfo.timeout, //in seconds
                    status_url: paymentInfo.status_url,
                    qrcode_url: paymentInfo.qrcode_url
                  },
                  function (err, transactionInitiated) {
                    if (err) {
                      console.log(err);
                    }

                    let time_left_hrs = paymentInfo.timeout / 60 / 60;

                    //insert shipping address into table
                    connection.query(
                      "INSERT INTO users_shipping_address SET ?",
                      {
                        shipping_firstname: req.body.firstName,
                        shipping_lastname: req.body.lastName,
                        shipping_address: req.body.shippingAddress,
                        shipping_city: req.body.shippingCity,
                        shipping_state: req.body.shippingState,
                        shipping_zipcode: req.body.zipcode,
                        txn_id: paymentInfo.txn_id
                      },
                      function (err, shipping_data, fields) {
                        if (err) throw err;
                      }
                    );

                    connection.query('SELECT deals.deal_name, users.username AS seller_name FROM deals LEFT JOIN users ON deals.seller_id = users.id WHERE deals.id = ?',
                      [req.body.deal_id],
                      function (error, res, fields) {
                        if (error) throw error;

                        let view_deal;
                        if (process.env.NODE_ENV == "development") {
                          view_deal = `${process.env.FRONTEND_URL}/feed/deals/${req.body.deal_id}/${res[0].deal_name}`;
                        } else {
                          view_deal = `${process.env.BACKEND_URL}/feed/deals/${req.body.deal_id}/${res[0].deal_name}`;
                        }

                        const guest_checkout = {
                          to: req.body.email,
                          from: process.env.CUSTOMER_SUPPORT,
                          subject: 'You Reserved a Deal',
                          html: guest_checkout_emailTemplate(
                            {
                              deal_name: res[0].deal_name,
                              seller_name: res[0].seller_name,
                              time_left: time_left_hrs,
                              amount: paymentInfo.amount,
                              crypto: req.body.crypto_name,
                              address: paymentInfo.address,
                              view_deal: view_deal
                            })
                        };
                        sgMail.send(guest_checkout);
                      });

                    //update deal item to reserved
                    connection.query(
                      "UPDATE deals SET deal_status = ? WHERE id = ?",
                      ["reserved", req.body.deal_id],
                      function (err, result) {
                        if (err) {
                          console.log(err);
                        }
                        //send the paymentInfo to the client side
                        res.json({ paymentInfo, deal_status: "reserved" });

                      }
                    );

                  }
                );
              }
            );
          })

      }
    });

});

//update seller's balance per shippo tracking number
router.post("/acceptmycrypto/shippo/tracking_status", function(req, res) {
  //send back to shippo that we have recieved the webhook
  res.send('OK');

  let tracking_result = req.body.data;

  let tracking_status = tracking_result.tracking_status.status;
  let tracking_number = tracking_result.tracking_number;
  let txn_id, user_id, crypto_id;

  // We should insert into users_tracking_info regardless if the tracking_status is DELIVERED or not because we want to store if the package is for example in transit or returned
  //insert the tracking update to users_tracking_info
  connection.query("INSERT INTO users_tracking_info SET ?",
  {
    tracking_number: tracking_result.tracking_number,
    tracking_status: tracking_result.tracking_status.status,
    status_details: tracking_result.tracking_status.status_details,
    status_date: tracking_result.tracking_status.status_date,
    eta: tracking_result.eta
  },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );

  if (tracking_status === "DELIVERED") {
    //query if tracking number exists in database
    connection.query(
      "SELECT txn_id, paypal_paymentId, user_id, crypto_id, tracking_status AS delivery_status FROM users_purchases WHERE tracking_number = ?",
      [tracking_number],
      function(err, result) {
        if (err) {
          console.log(err);
        }

        txn_id = result[0].txn_id;
        paypal_id = result[0].paypal_paymentId;
        user_id = result[0].user_id;
        crypto_id = result[0].crypto_id;
        let delivery_status = result[0].tracking_status;

        let transaction_type;
        let transaction_id;

        // check to see if txn_id is not NULL or if paypal_id is not NULL
        if(txn_id){
          transaction_type = `txn_id = ?`;
          transaction_id = txn_id;
        } else if(paypal_id){
          transaction_type = `paypal_paymentId = ?`;
          transaction_id = paypal_id;
        }

        //if there is a tracking number in the database and tracking_status from the database has not delivered yet
        if (transaction_id && delivery_status !== "DELIVERED") {
           //query info relating to this purchase to make an update

          connection.query(
            `SELECT shippo_shipment_price, amount, crypto_symbol, payment_received, users_purchases.user_id, users_purchases.crypto_id, users_cryptos.crypto_address, users_cryptos.id AS users_cryptos_id, crypto_balance, deal_name, email AS user_email from users_purchases LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN users_cryptos ON users_cryptos.crypto_id = crypto_info.id LEFT JOIN deals ON users_purchases.deal_id = deals.id WHERE ${transaction_type} AND users_purchases.user_id = ? AND users_purchases.crypto_id = ?`,
            [transaction_id, user_id, crypto_id],
            async function(error, result, fields) {
              if (error) throw error;

              let {amount, crypto_symbol, payment_received, users_cryptos_id, crypto_balance, deal_name, user_email, shippo_shipment_price} = result[0];

              //check to see if payment has recevied
              if (payment_received === 1) {

                //total payout to seller
                let amountAfterFee;
                //exchange the shipping fee to crypto
                let options = {
                  method: "GET",
                  qs: {
                    symbol: crypto_symbol
                  },
                  headers: {
                    "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
                    Accept: "application/json"
                  }
                };

                  //use request to call coinmarketcap endpoint
                await request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', options, function (error, response, body) {
                  if (error) {
                    console.log(error);
                  }

                  let rateDate = JSON.parse(body);
                  let cryptoRate = rateDate.data[crypto_symbol].quote.USD.price;

                  //this is the shipping fee in crypto
                  let shippingCryptoAmount = (shippo_shipment_price/cryptoRate).toFixed(4);

                  //subtract the shipping fee
                  amountAfterFee = (amount * (0.98)) - shippingCryptoAmount;

                  //amount is the crypto amount of sale tat buyer pays
                  //since coinpase already takes .5%, we're taking 2% (total is 2.5%)

                  //update the shipping crypto amount and tracking status
                  connection.query(
                    "UPDATE users_purchases SET ? WHERE ?",
                    [{
                      shipping_fee_crypto_amount: shippingCryptoAmount,
                      tracking_status: "DELIVERED"
                    },{tracking_number}],
                    function(err, result) {
                      if (err) {
                        console.log(err);
                      }

                    }
                  );

                  //New balance that gets updated for the seller
                  let newBalance = crypto_balance + amountAfterFee;

                   //Set the new crypto balance for the seller
                  connection.query(
                    "UPDATE users_cryptos SET crypto_balance = ? WHERE id = ?",
                    [newBalance, users_cryptos_id],
                    function(err, result) {
                      if (err) {
                        console.log(err);
                      }

                      let profile_url;
                      if (process.env.NODE_ENV == "development") {
                        profile_url = process.env.FRONTEND_URL + "/profile/";

                      } else {
                        profile_url = process.env.BACKEND_URL + "/profile/";
                      }

                      const balance_deposited = {
                        to: user_email,
                        from: process.env.CUSTOMER_SUPPORT,
                        subject: '[AcceptMyCrypto Notification] Cryptocurrency Deposited!',
                        html: balanceDepositedEmailTemplate({ crypto_symbol, amountAfterFee, deal_name, profile_url })
                      };
                      sgMail.send(balance_deposited);

                    }
                );


                });

              }
            }
          );

        }


      }
    );
  }

});

router.post("/withdraw/initiate", verifyToken, function (req, res) {
  let user_id = req.decoded._id;
  let { crypto_id, crypto_symbol, user_email } = req.body;

  //send an email to the seller with a confirmation code
  let withdraw_token = Math.random().toString(36).substring(2, 10) + "-" + Math.random().toString(36).substring(2, 10) + "-" + Math.random().toString(36).substring(2, 10);
  let withdraw_token_timestamp = Date.now();

  connection.query(
    'SELECT id AS users_cryptos_id, crypto_balance, crypto_address FROM users_cryptos WHERE user_id = ? AND crypto_id = ?',
    [user_id, crypto_id],
    function (error, result, fields) {
      if (error) throw error;
      let { users_cryptos_id, crypto_balance, crypto_address } = result[0];

      //insert new token in the withdraw table
      connection.query(
        'INSERT INTO cryptos_withdraw SET ?',
        { withdraw_token, withdraw_token_timestamp, users_cryptos_id },
        function (error, result, fields) {
          if (error) throw error;

          //use sendgrid here
          const withdraw_confirmation = {
            to: user_email,
            from: process.env.CUSTOMER_SUPPORT,
            subject: "You've initiated a fund transfer from AcceptMyCrypto",
            html: cryptoWithdrawEmailTemplate({ crypto_balance, crypto_address, crypto_symbol, withdraw_token })
          };
          sgMail.send(withdraw_confirmation);

          res.json({ success: true, message: "Please check your email for the transfer confirmation token." })
        }
      )

    }
  )
});

router.post("/withdraw/confirm", verifyToken, function (req, res) {
  let user_id = 1;
  let { crypto_id, withdraw_confirmation_token } = req.body;

  connection.query(
    'SELECT withdraw_token, withdraw_token_timestamp from cryptos_withdraw WHERE withdraw_token = ?',
    [withdraw_confirmation_token],
    function (error, cryptos_withdraw_result, fields) {
      if (error) throw error;

      //5 minutes = 300,000 ms

      if (cryptos_withdraw_result.length > 0 && (cryptos_withdraw_result[0].withdraw_token_timestamp + 300000) >= Date.now()) {

        //verify if there is money in users_cryptos. We checked at the endpoint withdraw/initiate already, but we're double checking again when user hit this withdraw/confirm
        connection.query(
          'SELECT users_cryptos.id AS users_cryptos_id, crypto_address, crypto_balance, crypto_symbol FROM users_cryptos LEFT JOIN crypto_info ON users_cryptos.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name WHERE users_cryptos.user_id = ? AND users_cryptos.crypto_id = ?',
          [user_id, crypto_id],
          function (error, users_cryptos_result, fields) {
            if (error) throw error;
            let { users_cryptos_id, crypto_address, crypto_balance, crypto_symbol } = users_cryptos_result[0];

            if (crypto_balance > 0) {
              let options = {
                amount: crypto_balance,
                currency: crypto_symbol,
                address: crypto_address
              };

              client.createWithdrawal(options, function (error, transferResult) {
                if (error) {
                  //forbidden if minimum amount does not meet
                  res.status(403).json({ error: true, message: error });
                  console.log("error", error);
                } else if (transferResult.status === 1) {
                  //update the the user's cryptos table so the new balance is now 0
                  connection.query(
                    "UPDATE users_cryptos SET crypto_balance = ? WHERE id = ?",
                    [0, users_cryptos_id],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                      }
                      res.json({ success: true, message: "Successfully Transfered" })
                    }
                  );

                  //update the cryptos_withdraw table the amount of cryptos withdraw
                  connection.query(
                    "UPDATE cryptos_withdraw SET withdraw_amount = ?, coinpayment_withdraw_id = ? WHERE withdraw_token = ?",
                    [crypto_balance, 1, cryptos_withdraw_result[0].withdraw_token, transferResult.id],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                }

              });

            }

          }
        )
      } else {
        res.status(403).json({ message: "Invalid Confirmation Token" });
      }
    }
  )


});

//compile email template
//this email template is sent to customer if payment has received
var customer_invoice_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/customerInvoice/customerInvoice.ejs'), 'utf-8');
var customer_invoice_emailTemplate = ejs.compile(customer_invoice_ET);

//this email template is sent to us if item has been ordered
var item_ordered_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/itemOrdered/itemOrdered.ejs'), 'utf-8');
var item_ordered_emailTemplate = ejs.compile(item_ordered_ET);

//this email template is sent to customer if item has been canceled
var item_canceled_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/itemCanceled/itemCanceled.ejs'), 'utf-8');
var item_canceled_emailTemplate = ejs.compile(item_canceled_ET);

//this email template is sent to customer if item has been canceled
var seller_tracking_number_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/sellerTrackingNeeded/sellerTrackingNeeded.ejs'), 'utf-8');
var seller_tracking_number_needed_EmailTemplate = ejs.compile(seller_tracking_number_ET);

//this email template is sent to customer if item has been canceled
var seller_shipping_label_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/sellerShippingLabel/sellerShippingLabel.ejs'), 'utf-8');
var seller_shipping_label_EmailTemplate = ejs.compile(seller_shipping_label_ET);

//this email template is sent to customer if item has been canceled
var buyer_tracking_url_ET = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/buyerTrackingUrl/buyerTrackingUrl.ejs'), 'utf-8');
var buyer_tracking_url_EmailTemplate = ejs.compile(buyer_tracking_url_ET);

//ipn (listen to coinpayment's events) - instant payment notification
router.post("/checkout/notification", function (req, res, next) {
  res.send("ok");
  
  if (!req.get(`HMAC`) || !req.body || !req.body.ipn_mode || req.body.ipn_mode !== `hmac` || MERCHANT_ID !== req.body.merchant) {
    return next(new Error(`Invalid request`));
  }

  let isValid, error, hmac;

  try {
    hmac = req.get("HMAC");
    isValid = verify(hmac, IPN_SECRET, req.body);
  } catch (e) {
    error = e;
  }

  //The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.
  if (error && error instanceof CoinpaymentsIPNError) {
    return next(error);
  }

  if (!isValid) {
    return next(new Error(`Hmac calculation does not match`));
  }

  return next();
}, function (req, res, next) {

  console.log("transaction_id", req.body);
  //handle events
  connection.query(
    'SELECT status, users.email, users.username, guest_users.email AS guest_email, amount, crypto_symbol, deal_name, deals.seller_id, deals.shipping_label_status, users_purchases.deal_id, seller.email AS seller_email, shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode FROM users_purchases LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN guest_users ON users_purchases.guest_user_id = guest_users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN users seller ON deals.seller_id = seller.id LEFT JOIN users_shipping_address ON users_shipping_address.txn_id = users_purchases.txn_id WHERE users_purchases.txn_id = ?',
    [req.body.txn_id],
    function (err, data_status, fields) {

      if(data_status.length === 0 || undefined) {
        console.log(`Unable to get ${req.body.txn_id} in the database`);
      }

      let current_status = data_status[0].status;
      let deal_name = data_status[0].deal_name;
      let deal_id = data_status[0].deal_id;
      let shipping_label_status = data_status[0].shipping_label_status;
      let email = data_status[0].email || data_status[0].guest_email;
      let seller_email = data_status[0].seller_email;
      let { shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode } = data_status[0];

      if (current_status === "0" && req.body.status === "1") {
        //update the status in the table to "1"
        //meaning: Funds received and confirmed, sending to you shortly...
        //send email to acceptmycrypto's support to notify user has sent the payment
        connection.query('UPDATE users_purchases SET ? WHERE ?',
          [{ status: req.body.status }, { txn_id: req.body.txn_id }],
          function (error, results, fields) {
            if (error) throw error;

            const handle_order = {
              to: process.env.CUSTOMER_SUPPORT,
              from: process.env.CUSTOMER_SUPPORT,
              subject: 'Item Ordered',
              html: item_ordered_emailTemplate({ txn_id: req.body.txn_id, deal_name: req.body.deal_name })
            };
            sgMail.send(handle_order);
          });

      }

      if (current_status === "1" && req.body.status === "100") {
        //update the status in the table to "100"
        //meaning: payment has received in coinpayment address
        //send an email to user saying the payment has been recieved. ship the order

        let view_order;
        if (process.env.NODE_ENV == "development") {
          view_order = process.env.FRONTEND_URL + "/profile/";

        } else {
          view_order = process.env.BACKEND_URL + "/profile/";
        }

        connection.query('UPDATE users_purchases SET status = ?, payment_received = ? WHERE ?',
          [req.body.status, 1, { txn_id: req.body.txn_id }],
          function (error, results, fields) {
            if (error) throw error;

            connection.query(
              "UPDATE deals SET deal_status = ? WHERE id = ?",
              ["sold", data_status[0].deal_id],
              function (err, result) {
                if (err) {
                  console.log(err);
                }
                //send the paymentInfo to the client side
                // res.json({ deal_status: "sold" });
              }
            );
          });


          let supply_tracking_number_link;
          if (process.env.NODE_ENV == "development") {
            supply_tracking_number_link = `${process.env.FRONTEND_URL}/trackingNumber/${req.body.txn_id}/${deal_name}`;
          } else {
            supply_tracking_number_link = `${process.env.BACKEND_URL}/trackingNumber/${req.body.txn_id}/${deal_name}`;
          }

          if (shipping_label_status === "prepaid") {
            createShippmentInfo(req.body.txn_id, deal_name, seller_email, email);
          } else if (shipping_label_status === "seller") {

            const seller_tracking_number_needed = {
              to: seller_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `A User Has Purchased ${deal_name}`,
              html: seller_tracking_number_needed_EmailTemplate({ deal_name, txn_id: req.body.txn_id, shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode, supply_tracking_number_link })
            };
            sgMail.send(seller_tracking_number_needed);

            //send the buyer an email for customer invoice
            //for "seller" shiping option
            const confirm_payment_with_customer = {
              to: email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: 'Order Confirmation',
              html: customer_invoice_emailTemplate({ deal_name: deal_name, txn_id: req.body.txn_id, view_order })
            };
            sgMail.send(confirm_payment_with_customer);
          }

      }

      if (current_status === "0" && req.body.status === "-1") {
        //update the status in the table to "-1"
        //meaning: payment has been timeout
        //send an email to user saying the payment has been canceled
        connection.query('UPDATE users_purchases SET ? WHERE ?',
          [{ status: req.body.status }, { txn_id: req.body.txn_id }],
          function (error, results, fields) {
            if (error) throw error;

            //update the deal item back to available
            connection.query(
              "UPDATE deals SET deal_status = ? WHERE id = ?",
              ["available", data_status[0].deal_id],
              function (err, result) {
                if (err) {
                  console.log(err);
                }
                //send the paymentInfo to the client side
                // res.json({ deal_status: "available" });
              }
            );

            const cancel_order = {
              to: email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: 'Payment Timed Out',
              html: item_canceled_emailTemplate(
                {
                  txn_id: req.body.txn_id,
                  amount: req.body.amount,
                  crypto_symbol: req.body.crypto_symbol,
                  deal_name: req.body.deal_name,
                  sign_in: process.env.BACKEND_URL
                })
            };
            sgMail.send(cancel_order);
          });
      }

    }
  );

  return next();
});

// route for testing
router.get('/newShippingLabel/:txn_id/:deal_name', function (req, res) {
  let { txn_id, deal_name } = req.params;
  let seller_email = "avanika@acceptmycrypto.com";
  let buyer_email = "avanika@acceptmycrypto.com";
  connection.query("SELECT users_shipping_address.shipping_firstname AS buyer_firstname, users_shipping_address.shipping_lastname AS buyer_lastname, users_shipping_address.shipping_address AS buyer_address, users_shipping_address.shipping_city AS buyer_city, users_shipping_address.shipping_state AS buyer_state, users_shipping_address.shipping_zipcode AS buyer_zipcode, seller.first_name AS seller_firstname, seller.last_name AS seller_lastname, seller.address AS seller_address, seller.city AS seller_city, seller.state AS seller_state,seller.zipcode AS seller_zipcode, deals.length, deals.width, deals.height, deals.weight FROM users_shipping_address LEFT JOIN users_purchases ON  users_shipping_address.txn_id = users_purchases.txn_id LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users seller ON deals.seller_id = seller.id WHERE users_shipping_address.txn_id = ?",
    [txn_id],
    function (err, shipping_data, fields) {
      if (err) throw err;
      shipping_data = shipping_data[0];
      let addressFrom = {
        "name": `${shipping_data.seller_firstname} ${shipping_data.seller_lastname}`,
        "street1": shipping_data.seller_address,
        "city": shipping_data.seller_city,
        "state": shipping_data.seller_state,
        "zip": shipping_data.seller_zipcode,
        "country": "US"
      };

      let addressTo = {
        "name": `${shipping_data.buyer_firstname} ${shipping_data.buyer_lastname}`,
        "street1": shipping_data.buyer_address,
        "city": shipping_data.buyer_city,
        "state": shipping_data.buyer_state,
        "zip": shipping_data.buyer_zipcode,
        "country": "US"
      };

      let parcel = {
        "length": shipping_data.length,
        "width": shipping_data.width,
        "height": shipping_data.height,
        "distance_unit": "in",
        "weight": shipping_data.weight,
        "mass_unit": "lb"
      };


      Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      //current date timestamp
      let date = new Date();

      // add 2 days (48 hrs to timestamp)
      let date_48 = date.addDays(2);

      // date_48_ISO is date_48 as an ISO date timestamp
      // date_48_ISO will be the shipment date for the seller so the seller has 48 hrs from now to ship the item
      let date_48_ISO = date_48.toISOString();

      shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "address_return": addressFrom,
        "shipment_date": date_48_ISO,
        "parcels": [parcel],
        "async": false
      }, function (err, shipment) {

        // get the cheapest rate for the shipment
        let cheapest_rate = shipment.rates.filter(function (rate) {
          if (rate.attributes.length > 0) {
            for (let i = 0; i < rate.attributes.length; i++) {
              if (rate.attributes[i] == "CHEAPEST") {
                return rate;
              }
            }
          }
        })

        // get the cheapest rate's object id to be used in the creating the shipment transaction
        let rate_object_id = cheapest_rate[0].object_id;


        shippo.transaction.create({
          "rate": rate_object_id,
          "label_file_type": "PDF",
          "async": false
        }, function (err, transaction) {
          if (err) throw err;
          console.log({ shipment, transaction });
          // res.json({ shipment, transaction });
          // console.log(transaction);
          console.log("transaction.label_url", transaction.label_url);
          console.log("transaction.tracking_url_provider", transaction.tracking_url_provider);


          connection.query("UPDATE users_purchases SET ? WHERE ?", [{ shipment_date: shipment.shipment_date, shipping_label_url: transaction.label_url, shippo_shipment_price: cheapest_rate[0].amount, tracking_number: transaction.tracking_number, tracking_carrier:  "usps", tracking_status: transaction.tracking_status, tracking_url_provider: transaction.tracking_url_provider, eta: transaction.eta, shippo_shipment_id: shipment.object_id, shippo_transaction_id: transaction.object_id }, { txn_id }], function (error, results, fields) {
            if (error) throw error;

            const seller_shipping_label = {
              to: seller_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `A User Has Purchased ${deal_name}`,
              html: seller_shipping_label_EmailTemplate({ deal_name: deal_name, txn_id: txn_id, shipping_label_url: transaction.label_url })
            };
            sgMail.send(seller_shipping_label);


            const buyer_tracking_url = {
              to: buyer_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `Your Purchased Item Will Be Shipping Soon`,
              html: buyer_tracking_url_EmailTemplate({ deal_name: deal_name, txn_id: txn_id, tracking_number: transaction.tracking_number, tracking_url_provider: transaction.tracking_url_provider })
            };
            sgMail.send(buyer_tracking_url);


          });

        });
      });

    }
  );

})

// create shippo label and tracking number for coinpayment transaction
function createShippmentInfo(txn_id, deal_name, seller_email, buyer_email) {

  connection.query("SELECT users_shipping_address.shipping_firstname AS buyer_firstname, users_shipping_address.shipping_lastname AS buyer_lastname, users_shipping_address.shipping_address AS buyer_address, users_shipping_address.shipping_city AS buyer_city, users_shipping_address.shipping_state AS buyer_state, users_shipping_address.shipping_zipcode AS buyer_zipcode, seller.first_name AS seller_firstname, seller.last_name AS seller_lastname, seller.address AS seller_address, seller.city AS seller_city, seller.state AS seller_state,seller.zipcode AS seller_zipcode, deals.length, deals.width, deals.height, deals.weight FROM users_shipping_address LEFT JOIN users_purchases ON  users_shipping_address.txn_id = users_purchases.txn_id LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users seller ON deals.seller_id = seller.id WHERE users_shipping_address.txn_id = ?",
    [txn_id],
    function (err, shipping_data, fields) {
      if (err) throw err;
      shipping_data = shipping_data[0];
      let addressFrom = {
        "name": `${shipping_data.seller_firstname} ${shipping_data.seller_lastname}`,
        "street1": shipping_data.seller_address,
        "city": shipping_data.seller_city,
        "state": shipping_data.seller_state,
        "zip": shipping_data.seller_zipcode,
        "country": "US"
      };

      let addressTo = {
        "name": `${shipping_data.buyer_firstname} ${shipping_data.buyer_lastname}`,
        "street1": shipping_data.buyer_address,
        "city": shipping_data.buyer_city,
        "state": shipping_data.buyer_state,
        "zip": shipping_data.buyer_zipcode,
        "country": "US"
      };

      let parcel = {
        "length": shipping_data.length,
        "width": shipping_data.width,
        "height": shipping_data.height,
        "distance_unit": "in",
        "weight": shipping_data.weight,
        "mass_unit": "lb"
      };


      Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      //current date timestamp
      let date = new Date();

      // add 2 days (48 hrs to timestamp)
      let date_48 = date.addDays(2);

      // date_48_ISO is date_48 as an ISO date timestamp
      // date_48_ISO will be the shipment date for the seller so the seller has 48 hrs from now to ship the item
      let date_48_ISO = date_48.toISOString();

      shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "address_return": addressFrom,
        "shipment_date": date_48_ISO,
        "parcels": [parcel],
        "async": false
      }, function (err, shipment) {

        // get the cheapest rate for the shipment
        let cheapest_rate = shipment.rates.filter(function (rate) {
          if (rate.attributes.length > 0) {
            for (let i = 0; i < rate.attributes.length; i++) {
              if (rate.attributes[i] == "CHEAPEST") {
                return rate;
              }
            }
          }
        })

        // get the cheapest rate's object id to be used in the creating the shipment transaction
        let rate_object_id = cheapest_rate[0].object_id;


        shippo.transaction.create({
          "rate": rate_object_id,
          "label_file_type": "PDF",
          "async": false
        }, function (err, transaction) {
          if (err) throw err;
          console.log({ shipment, transaction });
          // res.json({ shipment, transaction });
          // console.log(transaction);


          connection.query("UPDATE IGNORE users_purchases SET ? WHERE ?", [{ shipment_date: shipment.shipment_date, shipping_label_url: transaction.label_url, shippo_shipment_price: cheapest_rate[0].amount, tracking_number: transaction.tracking_number, tracking_carrier:  "usps", tracking_status: transaction.tracking_status, tracking_url_provider: transaction.tracking_url_provider, eta: transaction.eta, shippo_shipment_id: shipment.object_id, shippo_transaction_id: transaction.object_id }, { txn_id }], function (error, results, fields) {
            if (error) throw error;

            const seller_shipping_label = {
              to: seller_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `A User Has Purchased ${deal_name}`,
              html: seller_shipping_label_EmailTemplate({ deal_name, txn_id, shipping_label_url: transaction.label_url })
            };
            sgMail.send(seller_shipping_label);


            const buyer_tracking_url = {
              to: buyer_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `Your Purchased Item Will Be Shipping Soon`,
              html: buyer_tracking_url_EmailTemplate({ deal_name, txn_id, tracking_number: transaction.tracking_number, tracking_url_provider: transaction.tracking_url_provider })
            };
            sgMail.send(buyer_tracking_url);


          });

        });
      });


    }
  );

}

// create shippo label and tracking number for coinpayment transaction
function createShippmentInfoPaypal(txn_id, deal_name, seller_email, buyer_email) {

  connection.query("SELECT users_shipping_address.shipping_firstname AS buyer_firstname, users_shipping_address.shipping_lastname AS buyer_lastname, users_shipping_address.shipping_address AS buyer_address, users_shipping_address.shipping_city AS buyer_city, users_shipping_address.shipping_state AS buyer_state, users_shipping_address.shipping_zipcode AS buyer_zipcode, seller.first_name AS seller_firstname, seller.last_name AS seller_lastname, seller.address AS seller_address, seller.city AS seller_city, seller.state AS seller_state,seller.zipcode AS seller_zipcode, deals.length, deals.width, deals.height, deals.weight FROM users_shipping_address LEFT JOIN users_purchases ON  users_shipping_address.users_purchases_id = users_purchases.id LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users seller ON deals.seller_id = seller.id WHERE users_purchases.paypal_paymentId = ?",
    [txn_id],
    function (err, shipping_data, fields) {
      if (err) throw err;
      shipping_data = shipping_data[0];
      let addressFrom = {
        "name": `${shipping_data.seller_firstname} ${shipping_data.seller_lastname}`,
        "street1": shipping_data.seller_address,
        "city": shipping_data.seller_city,
        "state": shipping_data.seller_state,
        "zip": shipping_data.seller_zipcode,
        "country": "US"
      };

      let addressTo = {
        "name": `${shipping_data.buyer_firstname} ${shipping_data.buyer_lastname}`,
        "street1": shipping_data.buyer_address,
        "city": shipping_data.buyer_city,
        "state": shipping_data.buyer_state,
        "zip": shipping_data.buyer_zipcode,
        "country": "US"
      };

      let parcel = {
        "length": shipping_data.length,
        "width": shipping_data.width,
        "height": shipping_data.height,
        "distance_unit": "in",
        "weight": shipping_data.weight,
        "mass_unit": "lb"
      };


      Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      //current date timestamp
      let date = new Date();

      // add 2 days (48 hrs to timestamp)
      let date_48 = date.addDays(2);

      // date_48_ISO is date_48 as an ISO date timestamp
      // date_48_ISO will be the shipment date for the seller so the seller has 48 hrs from now to ship the item
      let date_48_ISO = date_48.toISOString();

      shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "address_return": addressFrom,
        "shipment_date": date_48_ISO,
        "parcels": [parcel],
        "async": false
      }, function (err, shipment) {

        // get the cheapest rate for the shipment
        let cheapest_rate = shipment.rates.filter(function (rate) {
          if (rate.attributes.length > 0) {
            for (let i = 0; i < rate.attributes.length; i++) {
              if (rate.attributes[i] == "CHEAPEST") {
                return rate;
              }
            }
          }
        })

        // get the cheapest rate's object id to be used in the creating the shipment transaction
        let rate_object_id = cheapest_rate[0].object_id;


        shippo.transaction.create({
          "rate": rate_object_id,
          "label_file_type": "PDF",
          "async": false
        }, function (err, transaction) {
          if (err) throw err;
          console.log({ shipment, transaction });
          // res.json({ shipment, transaction });
          // console.log(transaction);


          connection.query("UPDATE IGNORE users_purchases SET ? WHERE ?", [{ shipment_date: shipment.shipment_date, shipping_label_url: transaction.label_url, shippo_shipment_price: cheapest_rate[0].amount, tracking_number: transaction.tracking_number, tracking_carrier:  "usps", tracking_status: transaction.tracking_status, tracking_url_provider: transaction.tracking_url_provider, eta: transaction.eta, shippo_shipment_id: shipment.object_id, shippo_transaction_id: transaction.object_id }, { txn_id }], function (error, results, fields) {
            if (error) throw error;

            const seller_shipping_label = {
              to: seller_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `A User Has Purchased ${deal_name}`,
              html: seller_shipping_label_EmailTemplate({ deal_name, txn_id, shipping_label_url: transaction.label_url })
            };
            sgMail.send(seller_shipping_label);


            const buyer_tracking_url = {
              to: buyer_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: `Your Purchased Item Will Be Shipping Soon`,
              html: buyer_tracking_url_EmailTemplate({ deal_name, txn_id, tracking_number: transaction.tracking_number, tracking_url_provider: transaction.tracking_url_provider })
            };
            sgMail.send(buyer_tracking_url);



          });


        });
      });


    }
  );

}

//route for tracking shipment
//do we still need this?
router.post("/tracking-info/", function (req, res) {
  console.log("117", res.req.body);

  let tracking_result = res.req.body.data;
  let tracking_info = res.tracking_status;

  connection.query("INSERT INTO users_tracking_info SET ?",
    {
      tracking_number: tracking_result.tracking_number,
      tracking_status: tracking_result.tracking_status.status,
      status_details: tracking_result.tracking_status.status_details,
      status_date: tracking_result.tracking_status.status_date,
      eta: tracking_result.eta,
    },
  function (err, result) {
    if (err) {
      console.log(err);
    }
    res.json(JSON.stringify(tracking_result));
  }
);

});

//paypal
let users_purchase_id_paypal;
router.post("/paypal/create", verifyToken, function (req, res) {

  let user_id = req.decoded._id;
  let { deal_id, deal_name, pay_in_dollar, deal_description } = req.body.dealItem;
  let { firstName, lastName, shippingAddress, shippingCity, shippingState, zipcode } = req.body;

  let description = JSON.parse(deal_description);

  let dealUrl;
  if (process.env.NODE_ENV == "development") {
    dealUrl = `${process.env.FRONTEND_URL}/feed/deals/${deal_id}/${deal_name}`;
  } else {
    dealUrl = `${process.env.BACKEND_URL}/feed/deals/${deal_id}/${deal_name}`;
  }

  let encodedDealURL = encodeURI(dealUrl); //turn spaces in url to %20


  let create_payment = JSON.stringify({
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: encodedDealURL,
      cancel_url: encodedDealURL
    },
    transactions: [{
      item_list: {
        items: [{
          name: deal_name,
          sku: deal_id,
          price: pay_in_dollar,
          currency: "USD",
          quantity: 1
        }]
      },
      amount: {
        currency: "USD",
        total: pay_in_dollar
      },
      description: encodedDealURL
    }]
  });


  paypal.payment.create(create_payment, function (error, payment) {
    let links = {};
    if (error) {
      console.error(JSON.stringify(error));
    } else {
      payment.links.forEach(function (linkObj) {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method
        };
      })

      if (links.hasOwnProperty('approval_url')) {
        connection.query(
          "INSERT INTO users_purchases SET ?",
          {
            user_id,
            deal_id,
            paypal_amount: pay_in_dollar
          },
          function (err, transactionInitiated) {
            if (err) {
              console.log(err);
            }

            users_purchase_id_paypal = transactionInitiated.insertId;
            //insert shipping address into table
            connection.query(
              "INSERT INTO users_shipping_address SET ?",
              {
                users_purchases_id: transactionInitiated.insertId,
                shipping_firstname: firstName,
                shipping_lastname: lastName,
                shipping_address: shippingAddress,
                shipping_city: shippingCity,
                shipping_state: shippingState.value,
                shipping_zipcode: zipcode
              },
              function (err, shipping_data, fields) {
                if (err) throw err;
              }
            );
          }
        );

        // Redirect the customer to links['approval_url'].href
        res.json({ success: true, link: links['approval_url'].href })
      } else {
        res.json({ success: false, message: "No Link" })
      }

    }
  });

})

router.post("/paypal/execute", verifyToken, function (req, res) {
  let { deal_name, deal_id, user_email } = req.body;

  let paymentId = req.body.paymentId;
  let payerId = { payer_id: req.body.payerId }; //has to be in this format according to paypal doc

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error("execute error", JSON.stringify(error));
    } else {
      if (payment.state == 'approved') {

        //update multiple records for users_purchases
        connection.query("UPDATE users_purchases SET ? WHERE ?",
          [
            {
              paypal_paymentId: paymentId,
              paypal_payerId: req.body.payerId,
              status: "100",
              payment_received: 1
            },
            { id: users_purchase_id_paypal }
          ],
          function (err, transactionInitiated) {
            if (err) {
              console.log(err);
            }
          }
        );

        //update deal item to sold
        connection.query(
          "UPDATE deals SET deal_status = ? WHERE id = ?",
          ["sold", deal_id],
          function (err, result) {
            if (err) {
              console.log(err);
            }

            let view_order;
            if (process.env.NODE_ENV == "development") {
              view_order = process.env.FRONTEND_URL + "/profile/";

            } else {
              view_order = process.env.BACKEND_URL + "/profile/";
            }

            //send buyer an email invoice
            const confirm_payment_with_customer = {
              to: user_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: 'Order Confirmation',
              html: customer_invoice_emailTemplate(
                { deal_name, txn_id: paymentId, view_order })
            };
            sgMail.send(confirm_payment_with_customer);

            connection.query("SELECT users.email AS seller_email FROM users LEFT JOIN deals ON deals.seller_id = users.id WHERE deals.id = ?",
              [deal_id],
              function (err, result) {
                if (err) {
                  console.log(err);

                }

                let seller_email = result[0].seller_email;
                connection.query("SELECT shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode FROM users_shipping_address WHERE users_purchases_id = ?",
                  [users_purchase_id_paypal],
                  function (err, res) {
                    if (err) {
                      console.log(err);

                    }

                    let{shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode} = res[0];


                    let supply_tracking_number_link;
                    if (process.env.NODE_ENV == "development") {
                      supply_tracking_number_link = `${process.env.FRONTEND_URL}/trackingNumber/${paymentId}/${deal_name}`;
                    } else {
                      supply_tracking_number_link = `${process.env.BACKEND_URL}/trackingNumber/${paymentId}/${deal_name}`;
                    }

                    if (shipping_label_status === "prepaid") {
                      createShippmentInfoPaypal(paymentId, deal_name, seller_email, user_email);
                    } else if (shipping_label_status === "seller") {
                      const seller_tracking_number_needed = {
                        to: seller_email,
                        from: process.env.CUSTOMER_SUPPORT,
                        subject: `A User Has Purchased ${deal_name}`,
                        html: seller_tracking_number_needed_EmailTemplate({ deal_name: deal_name, txn_id: paymentId, shipping_firstname, shipping_lastname, shipping_address, shipping_city, shipping_state, shipping_zipcode, supply_tracking_number_link })
                      };
                      sgMail.send(seller_tracking_number_needed);
                    }

                    //send the paymentInfo to the client side
                    res.json({ success: true, message: "payment completed successfully", deal_status: "sold" });
                          });

              });

          }
        );
      } else {
        res.json({ success: false, message: "payment not completed" })
      }
    }
  });


});

function createMatchedFriends(user_id, crypto_name) {
  connection.query(
    "SELECT id FROM crypto_metadata WHERE ?", [{ crypto_name }], function (error, results, fields) {
      if (error) throw error;
      let crypto_id = results[0].id;

      connection.query(
        "SELECT DISTINCT user_id, date_purchased FROM users_purchases WHERE ? AND payment_received = 1 AND user_id NOT IN (SELECT matched_friend_id FROM users_matched_friends WHERE user_id = ?) AND NOT ? ORDER BY users_purchases.date_purchased DESC",
        [{ crypto_id }, { user_id }, { user_id }],
        function (error, results, fields) {
          if (error) throw error;

          else if (results.length > 0) {
            let matches = [];

            let limitedIDArray = results.slice(0, 3);

            console.log(JSON.stringify(limitedIDArray));


            for (let j = 0; j < limitedIDArray.length; j++) {
              matches.push([user_id, limitedIDArray[j].user_id]);
              matches.push([limitedIDArray[j].user_id, user_id]);
            }

            let sql = "INSERT INTO users_matched_friends (user_id, matched_friend_id) VALUES ?"

            connection.query(sql, [matches], function (error, results, fields) {
              if (error) throw error;
              console.log("Number of records inserted: " + results.affectedRows);

            }
            );

          }
          else {
            console.log('No Matches');
          }


        }
      );


    }
  );
}

module.exports = router;

