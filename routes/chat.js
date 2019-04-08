var express = require("express");
var app = express();
var router = express.Router();
var connection = require("./utils/database");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var verifyToken = require("./utils/validation");
//use sendgrid
var sgMail = require("@sendgrid/mail");
var keys = require("../key");
sgMail.setApiKey(keys.sendgrid);
//email template
var path = require("path");
var fs = require('fs');
var ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//compile email template
var chatMessageEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/chatMessage/chatMessage.ejs'), 'utf-8');
var chatMessageEmailTemplate = ejs.compile(chatMessageEmailTemplateText);

//get chat sessions
router.post("/chat_sessions", verifyToken, (req, res) => {
  //a user can be a buyer or seller
  let user_id = req.decoded._id;

  connection.query(
    "SELECT DISTINCT chat_sessions.id AS chat_session_id, chat_sessions.date_created AS chat_session_date, chat_session_participants.message_read, deal_id, date_joined, chat_session_participants.user_id, chat_session_participants.seller_id, chat_session_participants.buyer_id, deal_name, featured_deal_image, seller.username AS seller_name, seller_profile.photo as seller_photo, buyer.username AS buyer_name, buyer_profile.photo AS buyer_photo from chat_sessions LEFT JOIN chat_session_participants ON chat_sessions.id = chat_session_participants.chat_session_id LEFT JOIN deals ON chat_sessions.deal_id = deals.id LEFT JOIN users seller ON chat_session_participants.seller_id = seller.id LEFT JOIN users buyer ON chat_session_participants.buyer_id = buyer.id LEFT JOIN users_profiles buyer_profile ON buyer_profile.user_id = buyer.id LEFT JOIN users_profiles seller_profile ON seller_profile.user_id = seller.id WHERE chat_session_participants.user_id = ? AND participant_status = ? ORDER BY chat_session_date DESC",
    [user_id, "normal"],
    function(error, results, fields) {
      if (error) console.log(error);
      res.json(results);
    }
  );
});

//create new chat session
router.post("/chat_session/new", verifyToken, (req, res, next) => {
  //this endpont is hit when user/buyer click "message seller"
  let user_id = req.decoded._id;
  let buyer_id = user_id; //buyer_id in this case is the user when Messaging the seller
  let { seller_id, deal_id } = req.body;

  //check to see if user and seller has started a conversation on this deal
  connection.query(
    "SELECT chat_sessions.id, participant_status FROM chat_sessions LEFT JOIN chat_session_participants ON chat_sessions.id = chat_session_participants.chat_session_id WHERE deal_id = ? AND seller_id = ? AND user_id = ?",
    [deal_id, seller_id, user_id],
    function(error, results, fields) {
      let chat_session_id;

      if (error) console.log(error);

      //if result is 0, create a new chat session
      if (results.length === 0) {
        //create a new chat session first
        connection.query(
          "INSERT INTO chat_sessions (deal_id) VALUES (?)",
          [deal_id],
          function(error, response, fields) {
            if (error) throw error;
            //send the new chat session info to the front end
            let new_chat_session_id = response.insertId;

            //create an array of two records to insert for both buyer and seller
            let chat_participants = [
              [new_chat_session_id, buyer_id, seller_id, buyer_id],
              [new_chat_session_id, seller_id, seller_id, buyer_id]
            ];

            //insert the participants to the new created chat session
            connection.query(
              "INSERT INTO chat_session_participants (chat_session_id, user_id, seller_id, buyer_id) VALUES ?",
              [chat_participants],
              function(error, chatMessages, fields) {
                if (error) console.log(error);

              }
            );

            //get info about the new created record chat session
            connection.query(
              "SELECT DISTINCT chat_sessions.id AS chat_session_id, chat_sessions.date_created AS chat_session_date, deal_id, chat_session_participants.seller_id, chat_session_participants.buyer_id, deal_name, pay_in_dollar, pay_in_crypto,featured_deal_image, seller.username AS seller_name, seller_profile.photo as seller_photo, buyer.username AS buyer_name, buyer_profile.photo AS buyer_photo from chat_sessions LEFT JOIN chat_session_participants ON chat_sessions.id = chat_session_participants.chat_session_id LEFT JOIN deals ON chat_sessions.deal_id = deals.id LEFT JOIN users seller ON chat_session_participants.seller_id = seller.id LEFT JOIN users buyer ON chat_session_participants.buyer_id = buyer.id LEFT JOIN users_profiles buyer_profile ON buyer_profile.user_id = buyer.id LEFT JOIN users_profiles seller_profile ON seller_profile.user_id = seller.id WHERE chat_sessions.id = ?",
              [new_chat_session_id],
              function(error, chatSession, fields) {
                if (error) console.log(error);

                connection.query(
                  "SELECT DISTINCT message, date_message_sent, message_owner_id, buyer_id, seller_id, chat_messages.chat_session_id FROM chat_messages LEFT JOIN chat_sessions ON chat_messages.chat_session_id = chat_sessions.id LEFT JOIN chat_session_participants ON chat_session_participants.chat_session_id = chat_sessions.id WHERE chat_messages.chat_session_id = ? ORDER BY date_message_sent",
                  [new_chat_session_id],
                  function(error, chatMessages, fields) {
                    if (error) console.log(error);

                    res.json({chatSession, chatMessages});
                  }
                );
              }
            );
          }
        );
      }

      if (results.length > 0 && results[0].participant_status === "deleted") {
        //update participant_status back to normal
        chat_session_id = results[0].id;

        connection.query(
          "UPDATE chat_session_participants SET participant_status = ? WHERE user_id = ? AND chat_session_id = ?",
          ["normal", user_id, chat_session_id ],
          function(err, result) {
            if (err) {
              console.log("error during delete");
              console.log(err);
            }
          }
        );

      }

      //get info about the selected chat session
      if(results.length > 0) {
        chat_session_id = results[0].id;

        connection.query(
          "SELECT DISTINCT chat_sessions.id AS chat_session_id, chat_sessions.date_created AS chat_session_date, deal_id, chat_session_participants.seller_id, chat_session_participants.buyer_id, deal_name, pay_in_dollar, pay_in_crypto,featured_deal_image, seller.username AS seller_name, seller_profile.photo as seller_photo, buyer.username AS buyer_name, buyer_profile.photo AS buyer_photo from chat_sessions LEFT JOIN chat_session_participants ON chat_sessions.id = chat_session_participants.chat_session_id LEFT JOIN deals ON chat_sessions.deal_id = deals.id LEFT JOIN users seller ON chat_session_participants.seller_id = seller.id LEFT JOIN users buyer ON chat_session_participants.buyer_id = buyer.id LEFT JOIN users_profiles buyer_profile ON buyer_profile.user_id = buyer.id LEFT JOIN users_profiles seller_profile ON seller_profile.user_id = seller.id WHERE chat_sessions.id = ?",
          [chat_session_id],
          function(error, chatSession, fields) {
            if (error) console.log(error);

            connection.query(
              "SELECT DISTINCT message, date_message_sent, message_owner_id, buyer_id, seller_id, chat_messages.chat_session_id FROM chat_messages LEFT JOIN chat_sessions ON chat_messages.chat_session_id = chat_sessions.id LEFT JOIN chat_session_participants ON chat_session_participants.chat_session_id = chat_sessions.id WHERE chat_messages.chat_session_id = ? ORDER BY date_message_sent",
              [chat_session_id],
              function(error, chatMessages, fields) {
                if (error) console.log(error);

                res.json({chatSession, chatMessages});
              }
            );
          }
        );
      }


    }
  );
});

//delete chat session
router.post("/chat_session/delete", verifyToken, (req, res) => {
  let user_id = req.decoded._id; //user_id who's making the delete
  let { chat_session_id } = req.body;

  //update chat session to deleted
  connection.query(
    "UPDATE chat_session_participants SET participant_status = ? WHERE user_id = ? AND chat_session_id = ?",
    ["deleted", user_id, chat_session_id ],
    function(err, result) {
      if (err) {
        console.log("error during delete");
        console.log(err);
      }
      res.json(result);

    }
  );
});

//get messages
router.post("/chat_session/messages", verifyToken, (req, res) => {
  let buyer_id = req.decoded._id;
  let { chat_session_id } = req.body;

  //once user has read the message (selected the chat session), we update message_read to True
  connection.query(
    "UPDATE chat_session_participants SET message_read = ? WHERE user_id = ? AND chat_session_id = ?",
    [1, buyer_id, chat_session_id ],
    function(err, result) {
      if (err) {
        console.log(err);
      }
    }
  );

  //get info about the selected chat session
  connection.query(
    "SELECT DISTINCT chat_sessions.id AS chat_session_id, chat_sessions.date_created AS chat_session_date, deal_id, chat_session_participants.seller_id, chat_session_participants.buyer_id, deal_name, pay_in_dollar, pay_in_crypto,featured_deal_image, seller.username AS seller_name, seller_profile.photo as seller_photo, buyer.username AS buyer_name, buyer_profile.photo AS buyer_photo from chat_sessions LEFT JOIN chat_session_participants ON chat_sessions.id = chat_session_participants.chat_session_id LEFT JOIN deals ON chat_sessions.deal_id = deals.id LEFT JOIN users seller ON chat_session_participants.seller_id = seller.id LEFT JOIN users buyer ON chat_session_participants.buyer_id = buyer.id LEFT JOIN users_profiles buyer_profile ON buyer_profile.user_id = buyer.id LEFT JOIN users_profiles seller_profile ON seller_profile.user_id = seller.id WHERE chat_sessions.id = ?",
    [chat_session_id],
    function(error, chatSession, fields) {
      if (error) console.log(error);

      connection.query(
        "SELECT DISTINCT message, date_message_sent, message_owner_id, buyer_id, seller_id, chat_messages.chat_session_id FROM chat_messages LEFT JOIN chat_sessions ON chat_messages.chat_session_id = chat_sessions.id LEFT JOIN chat_session_participants ON chat_session_participants.chat_session_id = chat_sessions.id WHERE chat_messages.chat_session_id = ? ORDER BY date_message_sent",
        [chat_session_id],
        function(error, chatMessages, fields) {
          if (error) console.log(error);
          console.log(chatSession);
          res.json({chatSession, chatMessages});
        }
      );

    }
  );

});

//create new message
router.post("/chat_session/messages/new", verifyToken, (req, res) => {
  let message_owner_id = req.decoded._id;
  let { chat_session_id, message, recipientEmailUser_id } = req.body;

  connection.query(
    "INSERT INTO chat_messages (chat_session_id, message_owner_id, message) VALUES (?,?,?)",
    [chat_session_id, message_owner_id, message],
    function(error, results, fields) {
      if (error) console.log(error);

      let message_id = results.insertId;
      // update the date_created column to the time of message sent
      //Double check this query to make sure it doesn't open to sql injection attack
      connection.query(
        "UPDATE chat_sessions, (SELECT date_message_sent FROM chat_messages WHERE chat_messages.id = ?) AS chat_message SET date_created = chat_message.date_message_sent WHERE chat_sessions.id = ?",
        [message_id, chat_session_id ],
        function(err, result) {
          if (err) {
            console.log(err);
          }

          res.json(results);
        }
      );

      //update the message_read of message recipient to false
      connection.query(
        "UPDATE chat_session_participants SET message_read = ? WHERE user_id = ? AND chat_session_id = ?",
        [0, recipientEmailUser_id, chat_session_id],
        function(err, result) {
          if (err) {
            console.log(err);
          }
        }
      );

      //send emails to buyers and sellers
      connection.query(
        "Select email from users WHERE id = ?",
        [recipientEmailUser_id],
        function(err, result) {
          if (err) console.log(err);

          let recipientEmailUser_email = result[0].email;

          let chatURL;
          if (process.env.NODE_ENV == "development") {
            chatURL = process.env.FRONTEND_URL+"/chat";
          } else {
            chatURL = process.env.BACKEND_URL+"/chat/";
          }

          //notify participant via email
          //use sendgrid to send email
          const chat_message_email = {
            to: recipientEmailUser_email,
            from: process.env.CUSTOMER_SUPPORT,
            subject: '[AcceptMyCrypto] You have a new message.',
            html: chatMessageEmailTemplate({ chatURL })
          };

         sgMail.send(chat_message_email);

        }
      );

    }
  );

});

module.exports = router;
