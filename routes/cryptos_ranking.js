var express = require("express");
var app = express();
var router = express.Router();
var connection = require("./utils/database");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

router.get("/api/cryptosranking_deals", function(req, res) {
  connection.query(
    "SELECT crypto_id, crypto_name, crypto_symbol, crypto_logo, crypto_price, count(deal_id) as deals_count FROM cryptos_deals LEFT JOIN crypto_metadata ON cryptos_deals.crypto_id = crypto_metadata.id LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name GROUP BY crypto_id ORDER by deals_count DESC",
    function(err, deals_count, fields) {
      if (err) console.log(err);
      res.json(deals_count);
    }
  );
});

router.get("/api/cryptosranking_transactions", function(req, res) {
  //this is taking paypal transactions into account, making query return a null row
  //added condition WHERE crypto_id is not null
  connection.query(
    "SELECT up.crypto_id, cm.crypto_name, cm.crypto_symbol, ci.crypto_logo, cm.crypto_price, count(up.crypto_id) as total_transactions FROM users_purchases up LEFT JOIN crypto_metadata cm ON up.crypto_id = cm.id LEFT JOIN crypto_info ci ON cm.crypto_name = ci.crypto_metadata_name WHERE up.crypto_id IS NOT NULL GROUP BY up.crypto_id ORDER BY total_transactions DESC",
    function(err, transaction_count, fields) {
      if (err) console.log(err);
      res.json(transaction_count);
    }
  );
});

module.exports = router;
