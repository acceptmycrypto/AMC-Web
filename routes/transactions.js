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

//use sendgrid
var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.sendgrid);

var verifyToken =  require ("./utils/validation");

//email template
var path = require("path");
var fs = require('fs');
var ejs = require('ejs');

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
router.get("/api/transactions/community/payment_received", function(req, res) {
  connection.query(
    "SELECT users_purchases.date_purchased, users_purchases.amount, deals.deal_name, users.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = users.id WHERE permission = ? AND payment_received = ? ORDER BY users_purchases.date_purchased DESC",
    ["community", 1], //1 is true for payment received //community means any user on acceptmycrypto platform
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//coinpayment
router.post("/checkout", verifyToken, function(req, res) {
  //Inserting to user_purchases table, this doens't mean purchase is successful
  //Need to listen to IPA when payment has recieved and then update payment_recieved to true

  let user_id = req.decoded._id;
  let crypto_name = req.body.crypto_name;

  createMatchedFriends(user_id, crypto_name);

  client.createTransaction(
    {
      currency1: "USD",
      currency2: req.body.crypto_symbol, // The currency the buyer will be sending.
      amount: req.body.amount // Expected amount to pay, where the price is expressed in currency1
    },
    function(err, paymentInfo) {
      if (err) {
        console.log("coinpayment error: ", err);
      } else {

        connection.query(
          'SELECT crypto_info.id FROM crypto_info LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE crypto_name = ?',
          [req.body.crypto_name],
          function(error, cryptoID, fields) {
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
              function(err, transactionInitiated) {
                if (err) {
                  console.log(err);
                }

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
                  function(err, shipping_data, fields) {
                    if (err) throw err;
                  }
                );

                //update deal item to reserved
                connection.query(
                  "UPDATE deals SET deal_status = ? WHERE id = ?",
                  ["reserved", req.body.deal_id],
                  function(err, result) {
                    if (err) {
                      console.log(err);
                    }
                     //send the paymentInfo to the client side
                    res.json({paymentInfo, deal_status: "reserved"});
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

//payout
//once we verified that the item has been shipped to the buyer
//this route needs to be programatically called once tracking number has been verified
//we need to listen to shippo for the endpoint
router.get("/payout", function(req, res) {
  //sample txn_id, user_id, and crypto_id (needs to query the right one)
  let txn_id = "CPDB7P3MAVEJMZ7N73TNSX2KBX";
  let user_id = 1;
  let crypto_id = 1;

  //get the balance and amount of the transaction from our database
  connection.query(
    "SELECT amount, crypto_symbol, payment_received, users_purchases.user_id, users_purchases.crypto_id, users_cryptos.crypto_address, users_cryptos.id AS users_cryptos_id, crypto_balance, deal_name, email AS user_email from users_purchases LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN users_cryptos ON users_cryptos.crypto_id = crypto_info.id LEFT JOIN deals ON users_purchases.deal_id = deals.id where txn_id = ? AND users_purchases.user_id = ? AND users_purchases.crypto_id = ?",
    [txn_id, user_id, crypto_id],
    function(error, result, fields) {
      if (error) throw error;

      let {amount, crypto_symbol, payment_received, crypto_address, users_cryptos_id, crypto_balance, deal_name, user_email} = result[0];
      console.log(result[0]);
      //update the crypto balance of the seller
      if (payment_received === 100) {
        let amountAfterFee = amount * (0.98) //since coinpase already takes .5%, we're taking 2% (totoal is 2.5%)
        let newBalance = crypto_balance + amountAfterFee;

        connection.query(
          "UPDATE users_cryptos SET crypto_balance = ? WHERE id = ?",
          [newBalance, users_cryptos_id],
          function(err, result) {
            if (err) {
              console.log(err);
            }

            const balance_deposited = {
              to: user_email,
              from: process.env.CUSTOMER_SUPPORT,
              subject: '[AcceptMyCrypto Notification] Cryptocurrency Deposited!',
              html: balanceDepositedEmailTemplate({ crypto_symbol, amountAfterFee, deal_name })
            };
            sgMail.send(balance_deposited);

          }
        );
      }

    }
  );
});

router.post("/withdraw/initiate", verifyToken, function(req, res) {
  let user_id = req.decoded._id;
  let {crypto_id, crypto_symbol, user_email} = req.body;

  //send an email to the seller with a confirmation code
  let withdraw_token = Math.random().toString(36).substring(2,10)+"-"+Math.random().toString(36).substring(2,10)+"-"+Math.random().toString(36).substring(2,10);
  let withdraw_token_timestamp = Date.now();

  connection.query(
    'SELECT id AS users_cryptos_id, crypto_balance, crypto_address FROM users_cryptos WHERE user_id = ? AND crypto_id = ?',
    [user_id, crypto_id],
    function(error, result, fields) {
        if (error) throw error;
        let {users_cryptos_id, crypto_balance, crypto_address} = result[0];

        //insert new token in the withdraw table
        connection.query(
          'INSERT INTO cryptos_withdraw SET ?',
          {withdraw_token, withdraw_token_timestamp, users_cryptos_id},
          function(error, result, fields) {
              if (error) throw error;

              //use sendgrid here
              const withdraw_confirmation = {
                to: user_email,
                from: process.env.CUSTOMER_SUPPORT,
                subject: "You've initiated a fund transfer from AcceptMyCrypto",
                html: cryptoWithdrawEmailTemplate({ crypto_balance, crypto_address, crypto_symbol, withdraw_token })
              };
              sgMail.send(withdraw_confirmation);

              console.log(withdraw_token);
              res.json({success: true, message: "Please check your email for the transfer confirmation token."})
          }
        )

    }
  )
});

router.post("/withdraw/confirm", verifyToken, function(req, res) {
  let user_id = 1;
  let {crypto_id, withdraw_confirmation_token} = req.body;

  connection.query(
    'SELECT withdraw_token, withdraw_token_timestamp from cryptos_withdraw WHERE withdraw_token = ?',
    [withdraw_confirmation_token],
    function(error, cryptos_withdraw_result, fields) {
        if (error) throw error;

        //5 minutes = 300,000 ms

        if (cryptos_withdraw_result.length > 0 && (cryptos_withdraw_result[0].withdraw_token_timestamp + 300000)  >= Date.now()) {

          //verify if there is money in users_cryptos. We checked at the endpoint withdraw/initiate already, but we're double checking again when user hit this withdraw/confirm
          connection.query(
            'SELECT users_cryptos.id AS users_cryptos_id, crypto_address, crypto_balance, crypto_symbol FROM users_cryptos LEFT JOIN crypto_info ON users_cryptos.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name WHERE users_cryptos.user_id = ? AND users_cryptos.crypto_id = ?',
            [user_id, crypto_id],
            function(error, users_cryptos_result, fields) {
                if (error) throw error;
                let {users_cryptos_id, crypto_address, crypto_balance, crypto_symbol} = users_cryptos_result[0];

                if (crypto_balance > 0) {
                  console.log("call coinpayment")
                  let options = {
                    amount: crypto_balance,
                    currency: crypto_symbol,
                    address: crypto_address
                  };

                  client.createWithdrawal(options, function(error, transferResult) {
                    if (error) {
                      //forbidden if minimum amount does not meet
                      res.status(403).json({error: true, message: error});
                      console.log("error", error);
                    } else if (transferResult.status === 1) {
                        //update the the user's cryptos table so the new balance is now 0
                        connection.query(
                          "UPDATE users_cryptos SET crypto_balance = ? WHERE id = ?",
                          [0, users_cryptos_id],
                          function(err, result) {
                            if (err) {
                              console.log(err);
                            }
                            res.json({success: true, message: "Successfully Transfered"})
                          }
                        );

                        //update the cryptos_withdraw table the amount of cryptos withdraw
                        connection.query(
                          "UPDATE cryptos_withdraw SET withdraw_amount = ?, coinpayment_withdraw_id = ? WHERE withdraw_token = ?",
                          [crypto_balance, 1, cryptos_withdraw_result[0].withdraw_token, transferResult.id],
                          function(err, result) {
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
          res.status(403).json({message: "Invalid Confirmation Token"});
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

//ipa (listen to coinpayment's events)
router.post("/checkout/notification", function (req, res, next) {
  if(!req.get(`HMAC`) || !req.body || !req.body.ipn_mode || req.body.ipn_mode !== `hmac` || MERCHANT_ID !== req.body.merchant) {
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
  //handle events
  connection.query(
    'SELECT status, email, amount, crypto_symbol, deal_name, users_purchases.deal_id FROM users_purchases LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE txn_id = ?',
    [req.body.txn_id],
    function(err, data_status, fields) {
      let current_status = data_status[0].status;

      if (current_status === "0" && req.body.status === "1") {
        //update the status in the table to "1"
        //meaning: Funds received and confirmed, sending to you shortly...
        //send email to acceptmycrypto's support to notify user has sent the payment
        connection.query('UPDATE users_purchases SET ? WHERE ?',
        [{ status: req.body.status}, { txn_id: req.body.txn_id }],
        function (error, results, fields) {
          if (error) throw error;

          const handle_order = {
            to: process.env.CUSTOMER_SUPPORT,
            from: process.env.CUSTOMER_SUPPORT,
            subject: 'Item Ordered',
            html: item_ordered_emailTemplate({ txn_id: req.body.txn_id })
          };
          sgMail.send(handle_order);
        });
      }

      if (current_status === "1" && req.body.status === "100") {
        //update the status in the table to "100"
        //meaning: payment has received in coinpayment address
        //send an email to user saying the payment has been recieved. ship the order

        //this link doesn't work locally
        let view_order = process.env.BACKEND_URL + "/profile/";

        connection.query('UPDATE users_purchases SET status = ?, payment_received = ? WHERE ?',
        [req.body.status, 1, { txn_id: req.body.txn_id }],
        function (error, results, fields) {
          if (error) throw error;

          //update the deal item to sold
          connection.query(
            "UPDATE deals SET deal_status = ? WHERE id = ?",
            ["sold", data_status[0].deal_id],
            function(err, result) {
              if (err) {
                console.log(err);
              }
               //send the paymentInfo to the client side
              res.json({deal_status: "sold"});
            }
          );

          const confirm_payment_with_customer = {
            to: data_status[0].email,
            from: process.env.CUSTOMER_SUPPORT,
            subject: 'Order Confirmation',
            html: customer_invoice_emailTemplate({ txn_id: req.body.txn_id, view_order })
          };
          sgMail.send(confirm_payment_with_customer);
        });
      }

      if (current_status === "0" && req.body.status === "-1") {
        //update the status in the table to "-1"
        //meaning: payment has been timeout
        //send an email to user saying the payment has been canceled
        connection.query('UPDATE users_purchases SET ? WHERE ?',
        [{ status: req.body.status}, { txn_id: req.body.txn_id }],
        function (error, results, fields) {
          if (error) throw error;

          //update the deal item back to available
          connection.query(
            "UPDATE deals SET deal_status = ? WHERE id = ?",
            ["available", data_status[0].deal_id],
            function(err, result) {
              if (err) {
                console.log(err);
              }
               //send the paymentInfo to the client side
              res.json({deal_status: "available"});
            }
          );

          const cancel_order = {
            to: data_status[0].email,
            from: process.env.CUSTOMER_SUPPORT,
            subject: 'Payment Timed Out',
            html: item_canceled_emailTemplate(
              { txn_id: req.body.txn_id,
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

//paypal
router.post('/paypal/execute-payment', function(req, res) {
  console.log("paypal", req.body);
})

function createMatchedFriends(user_id, crypto_name){
  connection.query(
    "SELECT id FROM crypto_metadata WHERE ?", [{crypto_name}], function(error, results, fields) {
      if (error) throw error;
      let crypto_id = results[0].id;

      connection.query(
        "SELECT DISTINCT user_id, date_purchased FROM users_purchases WHERE ? AND payment_received = 1 AND user_id NOT IN (SELECT matched_friend_id FROM users_matched_friends WHERE user_id = ?) AND NOT ? ORDER BY users_purchases.date_purchased DESC",
         [{crypto_id}, {user_id}, {user_id}],
         function(error, results, fields) {
          if (error) throw error;

          else if(results.length > 0){
            let matches = [];

            let limitedIDArray = results.slice(0,3);

            console.log(JSON.stringify(limitedIDArray));


            for (let j = 0; j< limitedIDArray.length; j++){
                matches.push([user_id, limitedIDArray[j].user_id]);
                matches.push([limitedIDArray[j].user_id, user_id]);
            }

            let sql =  "INSERT INTO users_matched_friends (user_id, matched_friend_id) VALUES ?"

            connection.query( sql, [matches], function(error, results, fields) {
                if (error) throw error;
                console.log("Number of records inserted: " + results.affectedRows);

              }
            );

          }
          else{
            console.log('No Matches');
          }


        }
      );


    }
  );
}

module.exports = router;

