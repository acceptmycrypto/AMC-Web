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

    connection.query('SELECT DISTINCT id, category_name FROM category WHERE id = 1 OR id = 3 OR id = 4 OR id = 8 OR id = 9 OR id = 10 OR id = 12 OR id = 13;', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
});

router.get('/load/categories/list/mobile', function (req, res) {

    connection.query('SELECT DISTINCT id, category_name FROM category WHERE id = 1 OR id = 2 OR id = 3 OR id = 4 OR id = 5 OR id = 6 OR id = 7 OR id = 8 OR id = 9 OR id = 10 OR id = 11 OR id = 12 OR id = 13;', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
    });
});

// comment out later
router.get('/home/deals/:category_id', function (req, res) {
    let category_id = req.params.category_id;

    connection.query(
        'SELECT DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON  categories_deals.deals_id = deals.id WHERE categories_deals.category_id = ? AND deals.deal_status <> ? ORDER BY deals.date_created DESC LIMIT 16',
        [category_id, "deleted"],
        function (error, results, fields) {
          if (error) console.log(error);
          res.json(results);

        }
      );
});



router.get('/home/categorized/deals', function (req, res) {
    // let category_id = req.params.category_id;

    let select_statement = 'DISTINCT category.category_name AS category_name, category.id AS category_id, deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.id AS seller_id, users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified FROM category LEFT JOIN categories_deals ON category.id = categories_deals.category_id LEFT JOIN deals ON categories_deals.deals_id = deals.id LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id'

    let recent_select_statement = 'DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.id AS seller_id, users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified FROM deals LEFT JOIN categories_deals ON categories_deals.deals_id = deals.id LEFT JOIN category ON category.id = categories_deals.category_id LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id'

    let query_statement = "";
    for(let i = 0; i < 14; i++){
        query_statement += `(SELECT ${select_statement} WHERE category.id = ${i} AND (deals.deal_status IS NULL OR deals.deal_status <> 'deleted') ORDER BY deals.date_created DESC LIMIT 16)`
        if(i !== 13){
            query_statement += ` UNION ALL `
        }
    }
    connection.query(
       query_statement,
        function (error, results, fields) {
          if (error) console.log(error);

          let cat_1 =[], cat_2 =[], cat_3 =[], cat_4 = [], cat_5 = [], cat_6 = [], cat_7 = [], cat_8 = [], cat_9 =[], cat_10 =[], cat_11=[], cat_12=[], cat_13 =[];
            for(let i = 0; i< results.length; i++){
                switch(results[i].category_id){
                    case 1:
                        cat_1.push(results[i]);
                        break;
                    case 2:
                        cat_2.push(results[i]);
                        break;
                    case 3:
                        cat_3.push(results[i]);
                        break;
                    case 4:
                        cat_4.push(results[i]);
                        break;
                    case 5:
                        cat_5.push(results[i]);
                        break;
                    case 6:
                        cat_6.push(results[i]);
                        break;
                    case 7:
                        cat_7.push(results[i]);
                        break;
                    case 8:
                        cat_8.push(results[i]);
                        break;
                    case 9:
                        cat_9.push(results[i]);
                        break;
                    case 10:
                        cat_10.push(results[i]);
                        break;
                    case 11:
                        cat_11.push(results[i]);
                        break;
                    case 12:
                        cat_12.push(results[i]);
                        break;
                    default:
                        cat_13.push(results[i]);
                        break;
                }
            }
                let cat_all = []

                all_results = [cat_1, cat_2, cat_3, cat_4, cat_5, cat_6, cat_7, cat_8, cat_9, cat_10, cat_11, cat_12, cat_13];
                all_results.sort(function(a,b){
                    return b.length - a.length;
                })

                // let category_list =[];
                // for(let j = 0; j<7; j++){
                //     category_list.push(all_results[j][0].category_name);

                // }

                connection.query( `(SELECT ${recent_select_statement} WHERE deals.deal_status <> ? ORDER BY deals.date_created DESC LIMIT 16)`,
                    ["deleted"],
                    function(error, recent_deals, fields) {
                        // if (error) console.log(error);
                        // console.log('search results');
                        // console.log(results);
                        res.json({recent_deals, all_results});
                    }
                );


                // res.json(all_results);

        }
      );
});


router.get('/api/category', function(req, res) {
    console.log("req search");
    console.log(req.query);
    //hardcoded number of search results per page to 8.  ideally should be something like 20.
    //this number needs to match the number in frontend SearchDeals.js
    var numberPerPage = 10;
    //this calculates starting from which search result to give back
    //for example, if start==0 and numberPerPage==8, then db should give back 8 results starting from result #0
    var start = numberPerPage*(req.query.page-1);

    let category_count_filter, category_deal_filter;
    if(req.query.term !== "Most Recent Deals"){
        category_count_filter = ` WHERE ( category_name LIKE ?) `;
        category_deal_filter = ` WHERE (category_name LIKE ?) AND deals.deal_status <> ? LIMIT ?, ? `;
        category_count_array = ['%'+req.query.term+'%'];
        category_deal_array = ['%'+req.query.term+'%', "deleted", start, numberPerPage];
    }else{
        category_count_filter = ``;
        category_deal_filter = ` LIMIT ?, ? `;
        category_count_array = [];
        category_deal_array = [start, numberPerPage];
    }
    connection.query(
        //first query is to count the total number of results that satisfy the search
        `SELECT COUNT(DISTINCT deals.id) FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id ${category_count_filter}`,
        category_count_array,
        function(error, numberOfResults, fields) {
            if (error) console.log(error);
            console.log('number of results');
            console.log(numberOfResults);

            connection.query(
                //second query is to give back the set of search results specified by 'start' and 'numberPerPage'
                `SELECT DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.id AS seller_id,users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id ${category_deal_filter}` ,
                category_deal_array,
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