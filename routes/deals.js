var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var verifyToken = require("./utils/validation");

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
      'SELECT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN users ON deals.seller_id = users.id WHERE venue_id IN (SELECT DISTINCT venue_id FROM cryptos_venues WHERE crypto_id IN (SELECT DISTINCT crypto_id FROM users_cryptos WHERE user_id = ?)) OR seller_id IN (SELECT DISTINCT seller_id FROM cryptos_sellers WHERE crypto_id IN (SELECT DISTINCT crypto_id FROM users_cryptos WHERE user_id = ?))',
      [id, id],
      function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);

      }
    );
  }
});

//get a deal_item api
// include id param which references the deal id in route to account for if multiple users sell item with same deal_name 
router.get('/api/deals/:id/:deal_name', function (req, res) {
  //important! we set this venue name a here so it's available to be used for crytoAccept list querry
  let venue_name;
  let seller_name;

  // specify specific column names rather than * because don't want to select all users (seller) info
  connection.query(
    'SELECT deals.id AS deal_id, deals.venue_id, deals.seller_id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, deals.deal_avg_rating, deals.total_deal_ratings, deal_images.deal_image, venues.id AS venues_id, venues.venue_name, venues.venue_description, venues.venue_link, venues.accepted_crypto, users.id AS seller_id, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN deal_images ON deals.id = deal_images.deal_id LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN users ON deals.seller_id = users.id WHERE deals.id = ?',
    [req.params.id],
    function (error, deal_images_result, fields) {

      console.log(deal_images_result);
      if (error) throw error;

      let newDealItem = [];
      let images = [];

      //find images in the objects and add to images array
      for (let i in deal_images_result) {
        images.push(deal_images_result[i].deal_image);
      }

      //since every object in the array is the same, we just use the first object in the array
      //reassign the deal_image property to images array
      deal_images_result[0].deal_image = images;

      //push the first object into an emptry array so we can use it on the client side for mapping
      newDealItem.push(deal_images_result[0]);

      //assign the venue name to the variable venue_name that we defined earlier
      venue_name = newDealItem[0].venue_name;

      seller_name = newDealItem[0].seller_name;

      console.log("venue_name", venue_name);
      console.log("seller_name", seller_name);

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
      else{
        connection.query(
          'SELECT * FROM cryptos_sellers LEFT JOIN users ON users.id = cryptos_sellers.seller_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_sellers.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE users.username = ?',
          [seller_name],
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

  
// load all reviews of the seller
router.get('/api/reviews/sellers/:seller_id', function (req, res) {
  
  
    connection.query(
      'SELECT seller.id AS seller_id, seller.username AS seller_name, seller.sellers_avg_rating, seller.total_sellers_ratings, buyer.username AS buyer_name, deals.deal_name FROM users seller LEFT JOIN buyers_reviews_sellers ON buyers_reviews_sellers.seller_id = seller.id LEFT JOIN users buyer ON buyers_reviews_sellers.buyer_id = buyer.id LEFT JOIN deals ON deals.id = buyers_reviews_sellers.deal_id LEFT JOIN users_purchases ON  WHERE seller.id = ? AND buyers_reviews_sellers.display_review = 1',
      [req.params.seller_id],
      function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);

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

});

module.exports = router;
