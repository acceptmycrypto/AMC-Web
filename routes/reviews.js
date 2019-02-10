var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");
// var async = require("async");
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var keys = require("../key");

//use sendgrid
var sgMail = require("@sendgrid/mail");
var keys = require("../key");
sgMail.setApiKey(keys.sendgrid);
//email template
var path = require("path");
var fs = require('fs');
var ejs = require('ejs');

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

//to be held off until later date
router.post('/review/deal/:deal_name', verifyToken, function (req, res) {
    let deal = req.params.deal_name;
    connection.query(
        'INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES (?,?,?,?,?);',
        [req.decoded.id,req.body.deal_id,req.body.title,req.body.body,req.body.rating],
        function(error, response ,fields){
            if (error) throw error;
            //run a check of the title and body for language acceptance
            let pass = languageFilter();
            //then update display_review to 1
            if(pass)
            {

            }
            //then update deals table with avg rating and num ratings
            res.status(200).json({"success": true});
        });
});

//route for posting seller review buyer
router.post('/review/buyer/:user_id', verifyToken, function (req, res) { //need to think of better route name
    let seller_id = req.decoded._id;
    let buyer_id = req.params.user_id;
    connection.query(
        'INSERT INTO sellers_reviews_buyers (buyer_id, deal_id, seller_id, rating, body) VALUES (?,?,?,?,?);',
        [buyer_id,req.body.deal_id,seller_id,req.body.rating,req.body.body],
        function(error, response ,fields){
            if (error) throw error;
            //run a check of the body for language acceptance
            let pass = languageFilter(req.body.body);
            //
            if(pass)
            {

            }
            else{
                //insert incident into flagged user
            }
            //then update deals table with avg rating and num ratings
            res.status(200).json({"success": true});
        });
});

//route for posting buyer review seller
router.post('/seller-review/new', verifyToken, function (req, res) {
    let buyer_id = req.decoded._id;
    let { seller_id, deal_id, rating, review_body, title} = req.body;
    console.log(seller_id, deal_id, rating, review_body, title);

    let languagePass = true; //languageFilter(req.body.body);
    //
    if(languagePass)
    {
        connection.query(
            'INSERT INTO buyers_reviews_sellers (buyer_id, deal_id, seller_id, rating, body, title, display_review) VALUES (?,?,?,?,?,?,?);',
            [buyer_id, deal_id, seller_id, rating, review_body, title, '1'],
            function(error, response ,fields){
                if (error) throw error;

                connection.query(
                  'SELECT sellers_avg_rating, total_sellers_ratings FROM users WHERE users.id = ?;',
                  [seller_id],
                  function(error, res1, fields){
                    if (error) throw error;
                    //update calculation
                    let current_avg = res1[0].sellers_avg_rating;
                    // console.log(current_avg);
                    let current_total = res1[0].total_sellers_ratings;
                    // console.log(current_total);
                    // console.log(rating);
                    let new_avg_rating = ((current_avg*current_total)+rating)/(current_total+1);

                    connection.query(
                      'UPDATE users SET sellers_avg_rating = ?, total_sellers_ratings = ? WHERE id = ?',
                      [new_avg_rating, current_total+1, seller_id],
                      function(error, res_third, fields){
                          if (error) throw error;
                          res.status(200).json({success: true, message: "review accepted"});
                      });
                  });

            });

    }
    else{
        //insert incident into flagged user
        connection.query(
            'INSERT INTO buyers_reviews_sellers (buyer_id, deal_id, seller_id, rating, body, title, display_review) VALUES (?,?,?,?,?,?,?);',
            [buyer_id, deal_id, seller_id, rating, review_body, title, '0'],
            function(error, response ,fields){
                if (error) throw error;

                res.status(200).json({success: true, message: "submission under review"});
            });

    }

});

//route for getting the seller's rating
//maybe actually make this a function that can be called on load deals or loading of individual deals
//NOT USED CURRENTLY
router.get('/review/user/:user_id', (req, res) => {
    console.log("hitting route");
    //deals table has seller id, average ratings of everything in buyers reviews sellers to get the rating of seller
    //buyers reviews sellers also need a display_review column
    let seller_id = req.params.user_id;
    let reviews, avg_rating;
    sellerReviewAggregate(seller_id, function(result){
        reviews = result;
        sellerScoreAggregate(seller_id, function(result){
            avg_rating = result;
            res.json({reviews, avg_rating});
        });
    });
//     try{
//         let results = await sellerReviewAggregate(seller_id);
//         console.log('supposed to be here: ' + results);
//         res.json(results);
//     }
//    catch(e){
//        throw e;
//    }
//    res.send('hi');
});

sellerReviewAggregate = (user, callback) => {
    // console.log(res);
        // let result;
            connection.query('SELECT * FROM buyers_reviews_sellers WHERE seller_id = ?',[user], function (error, response, fields){
                if(error) throw error;
                //add deal id
                //join deals table
                //join user table to get buyer name
                // console.log('response: ' + response);
                return callback(response);
            });

    // res.json(result);
};

sellerScoreAggregate = (user, callback) => {
    connection.query('SELECT ROUND(AVG(buyers_reviews_sellers.rating),1) AS Average_Rating  FROM buyers_reviews_sellers WHERE seller_id = ?',[user], function (error, response, fields){
        if(error) throw error;
        //add deal id
        //join deals table
        //join user table to get buyer name
        // console.log(response);

        return callback(response);
    });
};

//function to be developed later for language check on ALL users submitted information that is then publicly visible
languageFilter = (arg) => {
    // npm install profanities
    // https://github.com/words/profanities
    // use it to search through text for any matches
    // only the major words should be registered, for terms used in context, human understanding is needed
    // also add feature for other users to report inappropriate reviews
    return arg;
};

//workflow brainstorm
//  - seller score show up in each card in main deals page
//  - when user clicks on a specific deal, stars and scores show up in description under main top banner
//      - clicking on the stars leads to drop down of star rating breakdown (stage 2)
//      - clicking on the stars, seller's username lead to seller's reviews page
// - seller's reviews page: an outward facing page of a seller's user profile
//      - all reviews show up on page
// - buyers can rate sellers from their own profile when they view previous deals they have purchased
//      - review page (or modal?): star rating, comments
//      - should be a quick and simple process
//      - reviews that pass initial machine language check will show up immediately
//          - human review should take place ASAP
//          - other users can report a post for language abuse
// - sellers review buyers
//      - not thought up in depth yet

//users should be led to our sites as often as possible
//  -

module.exports = router;
