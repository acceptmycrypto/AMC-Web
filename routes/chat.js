var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require("request");//backend version of ajax, gets entire html
var verifyToken =  require ("./utils/validation");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

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

//get chat sessions
router.post('/chat_sessions', verifyToken, (req, res) => {
  //a user can be a buyer or seller
  let user_id = req.decoded._id;
  console.log(user_id);

  connection.query("SELECT chat_sessions.id AS chat_session_id, chat_sessions.date_created AS chat_session_date, deal_name, featured_deal_image, seller.username AS seller_name, buyer.username AS buyer_name, users_profiles.photo AS buyer_photo FROM chat_sessions LEFT JOIN deals ON chat_sessions.deal_id = deals.id LEFT JOIN users buyer ON chat_sessions.buyer_id = buyer.id LEFT JOIN users seller ON chat_sessions.seller_id = seller.id LEFT JOIN users_profiles ON users_profiles.user_id = buyer.id WHERE chat_sessions.buyer_id = ? OR chat_sessions.seller_id = ? AND chat_status = ? ORDER BY chat_session_date", [user_id, user_id, 'normal'],
    function (error, results, fields) {

      if (error) console.log(error);
      console.log(results);
      res.json(results);
  });
})

//create new chat session
router.post('/chat_session/new', verifyToken, (req, res) => {
  let buyer_id = req.decoded._id;
  let { seller_id, deal_id } = req.body;
  let buyer_username, seller_username, buyer_firstname, seller_firstname;

  connection.query("SELECT username, first_name FROM users WHERE id IN (?, ?)", [buyer_id, seller_id],
    function (error, results, fields) {

      if (error) console.log(error);

      buyer_username = results[0].username;
      buyer_firstname = results[0].first_name;

      seller_username = results[1].username;
      seller_firstname = results[1].first_name;

      connection.query('INSERT INTO chat_sessions (deal_id, buyer_id, seller_id) VALUES (?,?,?)',
      [buyer_id, seller_id, deal_id],
        function(error, response ,fields){
            if (error) throw error;
            res.status(200).json({success: true, message: "Chat session created"});
        });
  });
})

//delete chat session
router.post('/chat_session/delete', verifyToken, (req, res) => {
  let buyer_id = req.decoded._id;
  let {id} = req.body;

  //update chat session to deleted
  connection.query(
    'UPDATE chat_sessions SET ? WHERE ?',
    [{chat_status: "deleted"}, {id}],
    function (err, result){
        if (err){
            console.log("error during delete");
            console.log(err);
        }

        res.json(result)
    }
  )
})

//get messages
router.post('/chat_session/messages', verifyToken, (req, res) => {
  let buyer_id = req.decoded._id;
  let {chat_session_id} = req.body;

  connection.query("SELECT message, date_message_sent, message_owner_id, buyer_id, seller_id, chat_session_id FROM chat_messages LEFT JOIN chat_sessions ON chat_session_id = chat_sessions.id WHERE chat_session_id = ? ORDER BY date_message_sent", [chat_session_id],
    function (error, results, fields) {

      if (error) console.log(error);
      console.log(results);
      res.json(results);
  });
})

//create new message
router.post('/chat_session/messages/new', verifyToken, (req, res) => {
  let message_owner_id = req.decoded._id;
  let {chat_session_id, message} = req.body;

  connection.query("INSERT INTO chat_messages (chat_session_id, message_owner_id, message) VALUES (?,?,?)", [chat_session_id, message_owner_id, message],
    function (error, results, fields) {

      if (error) console.log(error);

      res.json(results);
  });
})

module.exports = router;