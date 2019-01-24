var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken =  require ("./utils/validation");


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

var path = require("path");

app.use(express.static("public"));

app.set('view engine', 'ejs');

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


router.get('/load/categories/list', function (req, res) {
    
    connection.query('SELECT DISTINCT id, category_name FROM category WHERE id = 1 OR id = 3 OR id = 4 OR id = 8 OR id = 9 OR id = 10 OR id = 12;', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
});

router.get('/home/deals/:category_id', function (req, res) {
    let category_id = req.params.category_id;
    
    connection.query(
        'SELECT DISTINCT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON  categories_deals.deals_id = deals.id WHERE categories_deals.category_id = ? LIMIT 15',
        [category_id],
        function (error, results, fields) {
          if (error) console.log(error);
          res.json(results);
  
        }
      );
});





module.exports = router;