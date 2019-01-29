var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require("request");//backend version of ajax, gets entire html
var verifyToken =  require ("./utils/validation");
const Chatkit = require('@pusher/chatkit-server')

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCELOCATOR,
  key: process.env.CHATKIT_KEY
})

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

//create new user
router.post('/chat/new', verifyToken, (req, res) => {
  let buyer_id = req.decoded._id;
  let { seller_id } = req.body;
  let buyer_username, buyer_firstname, seller_username, seller_firstname;

  connection.query("SELECT username, first_name FROM users WHERE id IN (?, ?)", [buyer_id, seller_id],
    function (error, results, fields) {

      if (error) console.log(error);

      buyer_username = results[0].username;
      buyer_firstname = results[0].first_name;

      seller_username = results[1].username;
      seller_firstname = results[1].first_name;

      //create buyer user if not exist
      chatkit.getUser({
        id: buyer_username
      })
        .then(user => console.log('got a user', user))
        .catch(err => {
          if (err.status === 404) {
            chatkit.createUser({
              id: buyer_username,
              name: buyer_username,
            })
              .then(() => {
                console.log('User created successfully');
              }).catch((err) => {
                console.log("buyer", err);
              });
          }
        })

      //create seller user if not exist
      chatkit.getUser({
        id: seller_username
      })
      .then(user => console.log('got a user', user))
      .catch(err => {
        if (err.status === 404) {
          chatkit.createUser({
            id: seller_username,
            name: seller_username,
          })
            .then(() => {
              console.log('User created successfully');
            }).catch((err) => {
              console.log("seller", err);
            });
        }
      })
      
  });




  // chatkit
  //   .createUser({
  //     id: buyer_id,
  //     name: seller_name
  //   })
  //   .then(() => res.sendStatus(201))
  //   .catch(error => {
  //     if (error.error_type === 'services/chatkit/user_already_exists') {
  //       res.sendStatus(200)
  //     } else {
  //       res.status(error.status).json(error)
  //     }
  //   })
})

//might not needed
// router.post('/authenticate', (req, res) => {
//   const authData = chatkit.authenticate({ userId: req.query.user_id })
//   res.status(authData.status).send(authData.body)
// })


module.exports = router;