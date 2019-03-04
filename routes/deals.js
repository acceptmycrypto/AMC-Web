var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var verifyToken = require("./utils/validation");
var request = require("request");

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
router.post('/api/deals', verifyToken, function (req, res) {
  let id = req.decoded._id;


  if (id) { //if login

    // Create a multi nested SQL query

    //1) query the users_cryptos table to get the crypto_id that the user is interested/owned

    //2) query the venues that accept those cryptos

    // 3) query the deals that offered by those venues
    //update query to include sellers as users in addition to larger venue vendors
    connection.query(
      'SELECT DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id WHERE deals.venue_id IN (SELECT DISTINCT venue_id FROM cryptos_venues WHERE crypto_id IN (SELECT DISTINCT crypto_id FROM users_cryptos WHERE user_id = ?)) OR deals.id IN (SELECT DISTINCT deal_id FROM cryptos_deals WHERE crypto_id IN (SELECT DISTINCT crypto_id FROM users_cryptos WHERE user_id = ?) AND users.phone_number_verified = ?)',
      [id, id, 1],
      function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);

      }
    );
  }
});

//get a deal_item api
// include id param which references the deal id in route to account for if multiple users sell item with same deal_name
router.get('/api/deals/:deal_id/:deal_name', function (req, res) {
  //important! we set this venue name a here so it's available to be used for crytoAccept list querry
  let venue_name;
  let seller_name;

  // specify specific column names rather than * because don't want to select all users (seller) info
  connection.query(
    'SELECT deals.id AS deal_id, deals.venue_id, deals.seller_id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.deal_status, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, deals.weight, deals.shipping_label_status, deals.shipment_cost, deal_images.deal_image, deal_images.deal_image_object, venues.id AS venues_id, venues.venue_name, venues.venue_description, venues.venue_link, venues.accepted_crypto, users.id AS seller_id, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings, category.category_name AS deal_category FROM deals LEFT JOIN deal_images ON deals.id = deal_images.deal_id LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.id = ? AND deals.deal_status <> ?',
    [req.params.deal_id, "deleted"],
    function (error, result, fields) {

      if (error) throw error;

      let newDealItem = [];
      let img = "";
      let images = [];
      let imagesObj = [];
      let categ = "";
      let categories = [];

      //loop through the result array
      //if deal_image from the looping result has not been pushed to the images array
      //Push it to the images array and assign the new image value to the global variable img
      //same for deal_category
      for (let i in result) {
        if (result[i].deal_image !== img) {
          let parsedImageObj = JSON.parse(result[i].deal_image_object);

          images.push(result[i].deal_image); //store an array of image urls
          imagesObj.push(parsedImageObj); //store an array of image objects
          img = result[i].deal_image;
        }

        if (result[i].deal_category !== categ) {
          categories.push(result[i].deal_category);
          categ = result[i].deal_category;
        }
      }


      //since every object in the array is the same, we just use the first object in the array
      //reassign the deal_image property to images array
      result[0].deal_image = images;
      result[0].deal_image_object = imagesObj;
      result[0].deal_category = categories;

      //push the first object into an emptry array so we can use it on the client side for mapping
      newDealItem.push(result[0]);

      //assign the venue name to the variable venue_name that we defined earlier
      venue_name = newDealItem[0].venue_name;

      seller_name = newDealItem[0].seller_name;


      if (venue_name !== null) {
        //query the acceptedCryptos list from the given venue
        // venues.venue_name, venues.venue_description, crypto_metadata.crypto_name, crypto_metadata.crypto_symbol
        connection.query(
          'SELECT * FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE venue_name = ?',
          [venue_name],
          function (error, results, fields) {

            if (error) throw error;

            let venue = [];

            for (venueObj in results) {
              let cryptoName = results[venueObj].crypto_name;
              let cryptoSymbol = results[venueObj].crypto_symbol;
              let cryptoLogo = results[venueObj].crypto_logo;

              let acceptedCrypto = {};
              acceptedCrypto.crypto_name = cryptoName; //{crypto_name: "bitcoin"}
              acceptedCrypto.crypto_symbol = cryptoSymbol; //{crypto_name: "btc", crypto_symbol: "btc"}
              acceptedCrypto.crypto_logo = cryptoLogo;

              venue.push(acceptedCrypto);
            }
            newDealItem.push(venue);
            res.json(newDealItem);
          }
        );

      }
      else {
        connection.query(
          'SELECT * FROM cryptos_deals LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_deals.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE cryptos_deals.deal_id = ?',
          [req.params.deal_id],
          function (error, results, fields) {

            if (error) throw error;

            let seller = [];

            for (sellerObj in results) {
              let cryptoName = results[sellerObj].crypto_name;
              let cryptoSymbol = results[sellerObj].crypto_symbol;
              let cryptoLogo = results[sellerObj].crypto_logo;

              let acceptedCrypto = {};
              acceptedCrypto.crypto_name = cryptoName; //{crypto_name: "bitcoin"}
              acceptedCrypto.crypto_symbol = cryptoSymbol; //{crypto_name: "btc", crypto_symbol: "btc"}
              acceptedCrypto.crypto_logo = cryptoLogo;

              seller.push(acceptedCrypto);
            }
            newDealItem.push(seller);
            res.json(newDealItem);
          }
        );

      }

    }
  );
});

router.get('/api/search', function(req, res) {
//     console.log("req search");
//     console.log(req.query);
    //hardcoded number of search results per page to 8.  ideally should be something like 20.
    //this number needs to match the number in frontend SearchDeals.js
    var numberPerPage = 4;
    //this calculates starting from which search result to give back
    //for example, if start==0 and numberPerPage==8, then db should give back 8 results starting from result #0
    var start = numberPerPage*(req.query.page-1);
    connection.query(
        //first query is to count the total number of results that satisfy the search
        'SELECT COUNT(DISTINCT deals.id) FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE ( deal_name LIKE ? OR deal_description LIKE ? OR venue_name LIKE ? OR category_name LIKE ?)',
        ['%'+req.query.term+'%','%'+req.query.term+'%','%'+req.query.term+'%','%'+req.query.term+'%'],
        function(error, numberOfResults, fields) {
            if (error) console.log(error);
            // console.log('number of results');
            // console.log(numberOfResults);

            connection.query(
                //second query is to give back the set of search results specified by 'start' and 'numberPerPage'
                'SELECT DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.deal_status <> ? AND ( deal_name LIKE ? OR deal_description LIKE ? OR venue_name LIKE ? OR category_name LIKE ?) LIMIT ?, ?',
                ['deleted', '%'+req.query.term+'%','%'+req.query.term+'%','%'+req.query.term+'%','%'+req.query.term+'%', start, numberPerPage],
                function(error, results, fields) {
                    if (error) console.log(error);
                    // console.log('search results');
                    // console.log(results);
                    res.json({numberOfResults:numberOfResults,results:results});
                }
            );
        }
    );
});


  // load all reviews of a particular seller
  router.get('/api/reviews/sellers/:seller_id', function (req, res) {
    // console.log(req.params.seller_id);
    // console.log(req.query.order);
    let order_by = "";
    let where_rating = "";
    if (req.query.order == "rating" && req.query.direction == "desc") {
      order_by = "ORDER BY buyers_reviews_sellers.rating DESC";
    } else if (req.query.order == "rating") {
      order_by = "ORDER BY buyers_reviews_sellers.rating";
    } else {
      order_by = "ORDER BY buyers_reviews_sellers.date_reviewed";
    }

    if(req.query.select_rating == "5"){
        where_rating = "AND buyers_reviews_sellers.rating = 5 "
    } else if(req.query.select_rating == "4"){
      where_rating = "AND buyers_reviews_sellers.rating = 4 "
    }else if(req.query.select_rating == "3"){
      where_rating = "AND buyers_reviews_sellers.rating = 3 "
    }else if(req.query.select_rating == "2"){
      where_rating = "AND buyers_reviews_sellers.rating = 2 "
    }else if(req.query.select_rating == "1"){
      where_rating = "AND buyers_reviews_sellers.rating = 1 "
    }


    connection.query(
      'SELECT DISTINCT seller.id AS seller_id, seller.username AS seller_name, seller.sellers_avg_rating, seller.total_sellers_ratings, users_profiles.photo AS buyer_photo, buyer.username AS buyer_name, deals.deal_name, users_purchases.payment_received AS verified_purchase, buyers_reviews_sellers.id AS review_id, buyers_reviews_sellers.rating, buyers_reviews_sellers.title AS rating_title, buyers_reviews_sellers.body AS rating_body, buyers_reviews_sellers.likes AS rating_likes, buyers_reviews_sellers.dislikes AS rating_dislikes, buyers_reviews_sellers.helpful_review AS rating_helpful_review, buyers_reviews_sellers.date_reviewed AS rating_date_reviewed FROM users seller LEFT JOIN buyers_reviews_sellers ON buyers_reviews_sellers.seller_id = seller.id LEFT JOIN users buyer ON buyers_reviews_sellers.buyer_id = buyer.id LEFT JOIN deals ON deals.id = buyers_reviews_sellers.deal_id LEFT JOIN users_purchases ON users_purchases.deal_id = buyers_reviews_sellers.deal_id LEFT JOIN users_profiles ON users_profiles.user_id = buyer.id WHERE buyers_reviews_sellers.display_review = 1 AND seller.id = ?' + where_rating + order_by,
      [req.params.seller_id],
      function (error, allReviewResults, fields) {
        if (error) console.log(error);

        connection.query(
          'SELECT rating, COUNT(rating) as num_ratings FROM buyers_reviews_sellers WHERE seller_id = ? AND display_review = 1 GROUP BY rating ORDER BY rating',
          [req.params.seller_id],
          function (error, categorizeResults, fields) {
            if (error) console.log(error);
            // console.log(allReviewResults);
            // console.log(categorizeResults);
            res.json({allReviews: allReviewResults, ratingCategories: categorizeResults});

          }
        );

      }
    );
  });


  //get the accepted cryptos from a venue
  // router.get('/api/deals/venue_name', function(req, res) {
  //   connection.query(
  //     'SELECT venues.venue_name, venues.venue_description, crypto_metadata.crypto_name, crypto_metadata.crypto_symbol FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id WHERE venue_name = ?',
  //     [venue_name],
  //     function(error, results, fields) {
  //       if (error) throw error;

  //       let venue = '';
  //       let crypto = '';
  //       let cryptoSymbol = '';
  //       let cryptocurrencies = [];
  //       let crypto_symbols = [];
  //       let newObj = {};

  //       results.map((venueObj) => {

  //         if (venueObj.venue_name !== venue) {
  //           venue = venueObj.venue_name;
  //           crypto = venueObj.crypto_name;
  //           cryptoSymbol = venueObj.crypto_symbol;

  //           //when it's a new venue_name, empty the cryptocurrencies array
  //           cryptocurrencies = [];
  //           cryptocurrencies.push(crypto);
  //           crypto_symbols = [];
  //           crypto_symbols.push(cryptoSymbol);
  //           newObj[venueObj.venue_name] = [cryptocurrencies, crypto_symbols];

  //         } else {
  //           crypto = venueObj.crypto_name;
  //           cryptocurrencies.push(crypto);
  //           cryptoSymbol = venueObj.crypto_symbol;
  //           crypto_symbols.push(cryptoSymbol);
  //           newObj[venueObj.venue_name] = [cryptocurrencies, crypto_symbols];
  //         }

  //         return newObj;
  //       });

  //       res.json(newObj);
  //     }
  //   );
  // });


// });

//  update tracking number for deal
router.post('/update_tracking_number', verifyToken, function (req, res) {
  let id = req.decoded._id;

  // txn_id can either be coinpayment txn_id or paypal paypal_paymentId that is passed from front end
  let {txn_id, trackingNumber} = req.body;

    connection.query(
      'UPDATE users_purchases SET tracking_number = ? WHERE txn_id = ? OR paypal_paymentId = ?',
      [trackingNumber, txn_id, txn_id],
      function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
      }
    );
});

module.exports = router;
