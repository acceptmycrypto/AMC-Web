var express = require('express');
var app = express();
var router = express.Router();
var connection = require("./utils/database");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

//api
router.get('/api/venues_submit', function(req, res) {
  connection.query('SELECT * FROM userInput', function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/api/cryptos_venues', function(req, res) {
  connection.query(
    'SELECT venues.venue_name, venues.venue_description, crypto_metadata.crypto_name FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id',
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

module.exports = router;