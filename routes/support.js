var express = require('express');
var app = express();
var router = express.Router();
var connection = require("./utils/database");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('express-flash')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

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