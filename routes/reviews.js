var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");

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
router.post('/review/seller/:user_id', verifyToken, function (req, res) { //need to think of better route name
    let buyer_id = req.decoded._id;
    let seller_id = req.params.user_id;
    let pass = languageFilter(req.body.body);
    //
    if(pass)
    {
        connection.query(
            'INSERT INTO buyers_reviews_sellers (buyer_id, deal_id, seller_id, rating, body, display_review) VALUES (?,?,?,?,?,?);',
            [req.decoded.id,req.body.deal_id,seller_id,req.body.rating,req.body.body,'1'],
            function(error, response ,fields){
                if (error) throw error;
                //run a check of the body for language acceptance
          
                //then update deals table with avg rating and num ratings  

                res.status(200).json({"success": true});  
            });
        
    }
    else{
        //insert incident into flagged user
        connection.query(
            'INSERT INTO buyers_reviews_sellers (buyer_id, deal_id, seller_id, rating, body, display_review) VALUES (?,?,?,?,?,?);',
            [req.decoded.id,req.body.deal_id,seller_id,req.body.rating,req.body.body,'0'],
            function(error, response ,fields){
                if (error) throw error;
                //run a check of the body for language acceptance
          
                //then update deals table with avg rating and num ratings    
            });

    }
  
});

//route for getting the seller's rating
//maybe actually make this a function that can be called on load deals or loading of individual deals
router.get('/review/user/:user_id', verifyToken, function (req, res) {
    //deals table has seller id, average ratings of everything in buyers reviews sellers to get the rating of seller
    //buyers reviews sellers also need a display_review column
    let seller_id = req.params.user_id;
    //query below gets specified seller rating based on user id
    connection.query('SELECT buyers_reviews_sellers.seller_id, buyers_reviews_sellers.buyer_id, buyers_reviews_sellers.rating, buyers_reviews_sellers.body, ROUND(AVG(buyers_reviews_sellers.rating),1) AS Average_Rating FROM buyers_reviews_sellers WHERE seller_id = ?',[seller_id], function (error, response, fields){
        //add deal id
        //join deals table 
        //join user table to get buyer name
    });
});

reviewAggregate = (user) => {
    
}


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