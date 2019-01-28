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

router.post('/chat', verifyToken, (req, res) => {
  let seller_id = req.decoded._id;
  let seller_name;

  connection.query("SELECT username FROM users WHERE id = ?", [seller_id],
    function (error, results, fields) {

      if (error) console.log(error);

      seller_name = results[0].username;

  });

  chatkit
    .createUser({
      id: seller_id,
      name: seller_name
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

//might not needed
// router.post('/authenticate', (req, res) => {
//   const authData = chatkit.authenticate({ userId: req.query.user_id })
//   res.status(authData.status).send(authData.body)
// })


module.exports = router;