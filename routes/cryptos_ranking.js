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

// api
router.get('/api/cryptosranking', function(req, res) {
  connection.query(
    'SELECT crypto_id, count(venue_id) as total FROM cryptos_venues GROUP BY crypto_id',
    function(err, venues_count, fields) {
      for (var i in venues_count) {
        connection.query(
          'UPDATE crypto_metadata SET ? WHERE ?',
          [
            { venues_count: venues_count[i].total },
            { id: venues_count[i].crypto_id }
          ],
          function(err, res) {
            if (err) {
              console.log(err);
            }
          }
        );
      }

      connection.query(
        'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name ORDER by venues_count DESC',
        function(err, data, fields) {
          res.json(data);
        }
      );
    }
  );
});

module.exports = router;