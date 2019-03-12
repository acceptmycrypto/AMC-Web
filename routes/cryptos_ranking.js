var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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

router.get('/api/cryptosranking_venues', function(req, res) {
  connection.query(
    'SELECT crypto_id, crypto_name, crypto_symbol, crypto_logo, crypto_price, count(venue_id) as venues_count FROM cryptos_venues LEFT JOIN crypto_metadata ON cryptos_venues.crypto_id = crypto_metadata.id LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name GROUP BY crypto_id ORDER by venues_count DESC',
    function(err, venues_count, fields) {
      if(err) console.log(err);
      res.json(venues_count);
    }
  );
});

router.get('/api/cryptosranking_transactions', function(req, res) {
  connection.query(
    'SELECT users_purchases.crypto_id, crypto_metadata.crypto_name, crypto_metadata.crypto_symbol, crypto_info.crypto_logo, crypto_metadata.crypto_price, count(users_purchases.crypto_id) as total_transactions FROM users_purchases LEFT JOIN crypto_metadata ON users_purchases.crypto_id = crypto_metadata.id LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name GROUP BY users_purchases.crypto_id ORDER BY total_transactions DESC',
    function(err, transaction_count, fields) {
      res.json(transaction_count);
    }
  );
});
module.exports = router;