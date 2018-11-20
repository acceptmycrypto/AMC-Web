var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('express-flash')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

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

//User queries
router.post('/support/create', function(req, res) {
  var query = connection.query(
    'INSERT INTO userQueries SET ?',
    req.body,
    function(err, response) {
      req.flash('info', 'Thank you for contacting us. We\'ll get back to you within 24 hours.');
      res.redirect('/');
    }
  );
});

module.exports = router;