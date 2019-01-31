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
        'SELECT DISTINCT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON  categories_deals.deals_id = deals.id WHERE categories_deals.category_id = ? ORDER BY deals.date_created DESC LIMIT 15',
        [category_id],
        function (error, results, fields) {
          if (error) console.log(error);
          res.json(results);
  
        }
      );
});



router.get('/home/categorized/deals', function (req, res) {
    // let category_id = req.params.category_id;
    
    let select_statement = 'DISTINCT category.category_name AS category_name, category.id AS category_id, deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON categories_deals.deals_id = deals.id LEFT JOIN category ON category.id = categories_deals.category_id'

    let query_statement = "";
    for(let i = 0; i < 14; i++){
        query_statement += `(SELECT ${select_statement} WHERE categories_deals.category_id = ${i} ORDER BY deals.date_created DESC LIMIT 15)`
        if(i !== 13){
            query_statement += `UNION ALL`
        }
    }
    connection.query(
       query_statement,
        function (error, results, fields) {
          if (error) console.log(error);
          res.json(results);
  
        }
      );
});


router.get('/category', function(req, res) {
    console.log("req search");
    console.log(req.query);
    //hardcoded number of search results per page to 8.  ideally should be something like 20.
    //this number needs to match the number in frontend SearchDeals.js
    var numberPerPage = 8;
    //this calculates starting from which search result to give back
    //for example, if start==0 and numberPerPage==8, then db should give back 8 results starting from result #0
    var start = numberPerPage*(req.query.page-1);
    connection.query(
        //first query is to count the total number of results that satisfy the search
        'SELECT COUNT(DISTINCT deals.id) FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE ( category_name LIKE ?)',
        ['%'+req.query.term+'%'],
        function(error, numberOfResults, fields) {
            if (error) console.log(error);
            console.log('number of results');
            console.log(numberOfResults);

            connection.query(
                //second query is to give back the set of search results specified by 'start' and 'numberPerPage'
                'SELECT DISTINCT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE (category_name LIKE ?) LIMIT ?, ?',
                ['%'+req.query.term+'%', start, numberPerPage],
                function(error, results, fields) {
                    if (error) console.log(error);
                    console.log('search results');
                    console.log(results);
                    res.json({numberOfResults:numberOfResults,results:results});
                }
            );
        }
    );
});





module.exports = router;