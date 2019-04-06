const express = require("express");
const app = express();
const router = express.Router();
const connection = require("./utils/database");
const database = require("../model/dbconnection");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const verifyToken = require("./utils/validation");
const request = require("request");
const shippo = require("shippo")(process.env.SHIPMENT_KEY); //shippo

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//All methods of deals route
class Deals {
  dealItemQuery(result) {
    let img = "";
    let images = [];
    let imagesObj = [];
    let categ = "";
    let categories = [];

    //loop through result to get distinct images, image objects, and categories
    for (let item of result) {
      //check to see if deal_image is not in the img
      if (item.deal_image !== img) {
        let parsedImageObj = JSON.parse(item.deal_image_object);

        images.push(item.deal_image); //store an array of image urls
        imagesObj.push(parsedImageObj); //store an array of image objects

        //set index image for comparison
        img = item.deal_image;
      }

      if (item.deal_category !== categ) {
        categories.push(item.deal_category);
        categ = item.deal_category;
      }
    }

    //since every object in the array is the same, we just use the first object in the array
    //reassign the deal_image property to images array, same for category and image obj
    result[0].deal_image = images;
    result[0].deal_image_object = imagesObj;
    result[0].deal_category = categories;

    return result[0];
  }

  acceptedCryptoQuery(result) {
    let acceptedCryptos = [];
    for (let crypto of result) {
      let acceptedCrypto = {};
      let cryptoName = crypto.crypto_name;
      let cryptoSymbol = crypto.crypto_symbol;
      let cryptoLogo = crypto.crypto_logo;

      //create new properties for acceptedCrypto object
      acceptedCrypto.crypto_name = cryptoName; //{crypto_name: "bitcoin"}
      acceptedCrypto.crypto_symbol = cryptoSymbol; //{crypto_name: "bitcoin", crypto_symbol: "btc"}
      acceptedCrypto.crypto_logo = cryptoLogo;

      acceptedCryptos.push(acceptedCrypto);
    }

    return acceptedCryptos;
  }
}

//create a new deals object
const deals = new Deals;

//deal item endpoint
router.get("/api/deals/:deal_id/:deal_name", function(req, res) {
  // include id param which references the deal id in route to account for if multiple users sell item with same deal_name

  let deal_query =
    "SELECT deals.id AS deal_id, deals.seller_id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.deal_status, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.item_condition, deals.weight, deals.shipping_label_status, deals.shipment_cost, deal_images.deal_image, deal_images.deal_image_object, users.id AS seller_id, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified, category.category_name AS deal_category FROM deals LEFT JOIN deal_images ON deals.id = deal_images.deal_id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.id = ? AND deals.deal_status <> ?";

  let acceptedCrypto_query =
    "SELECT * FROM cryptos_deals LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_deals.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE cryptos_deals.deal_id = ?";

  let deal_query_result, acceptedCrypto_result;

  //this is the array we pass to the client
  let dealItem = [];

  database
    .query(deal_query, [req.params.deal_id, "deleted"])
    .then(results => {
      deal_query_result = deals.dealItemQuery(results);
      dealItem.push(deal_query_result);

      return database.query(acceptedCrypto_query, [req.params.deal_id]);
    })
    .then(results => {
      acceptedCrypto_result = deals.acceptedCryptoQuery(results);
      dealItem.push(acceptedCrypto_result);
      res.json(dealItem);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
});

router.get("/api/search", function(req, res) {
  //     console.log("req search");
  //     console.log(req.query);
  //hardcoded number of search results per page to 8.  ideally should be something like 20.
  //this number needs to match the number in frontend SearchDeals.js
  var numberPerPage = 10;
  //this calculates starting from which search result to give back
  //for example, if start==0 and numberPerPage==8, then db should give back 8 results starting from result #0
  var start = numberPerPage * (req.query.page - 1);
  connection.query(
    //first query is to count the total number of results that satisfy the search
    "SELECT COUNT(DISTINCT deals.id) FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.deal_status <> ? AND ( deal_name LIKE ? OR deal_description LIKE ? OR venue_name LIKE ? OR category_name LIKE ?)",
    [
      "deleted",
      "%" + req.query.term + "%",
      "%" + req.query.term + "%",
      "%" + req.query.term + "%",
      "%" + req.query.term + "%"
    ],
    function(error, numberOfResults, fields) {
      if (error) console.log(error);
      // console.log('number of results');
      // console.log(numberOfResults);

      connection.query(
        //second query is to give back the set of search results specified by 'start' and 'numberPerPage'
        "SELECT DISTINCT deals.id, deals.deal_status, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.category, deals.item_condition, venues.venue_name, venues.venue_link, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings FROM deals LEFT JOIN venues ON deals.venue_id = venues.id LEFT JOIN cryptos_deals ON cryptos_deals.deal_id = deals.id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.deal_status <> ? AND ( deal_name LIKE ? OR deal_description LIKE ? OR venue_name LIKE ? OR category_name LIKE ?) ORDER BY deals.id DESC LIMIT ?, ?",
        [
          "deleted",
          "%" + req.query.term + "%",
          "%" + req.query.term + "%",
          "%" + req.query.term + "%",
          "%" + req.query.term + "%",
          start,
          numberPerPage
        ],
        function(error, results, fields) {
          if (error) console.log(error);
          // console.log('search results');
          // console.log(results);
          res.json({ numberOfResults: numberOfResults, results: results });
        }
      );
    }
  );
});

// load all reviews of a particular seller
router.get("/api/reviews/sellers/:seller_id", function(req, res) {
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

  if (req.query.select_rating == "5") {
    where_rating = "AND buyers_reviews_sellers.rating = 5 ";
  } else if (req.query.select_rating == "4") {
    where_rating = "AND buyers_reviews_sellers.rating = 4 ";
  } else if (req.query.select_rating == "3") {
    where_rating = "AND buyers_reviews_sellers.rating = 3 ";
  } else if (req.query.select_rating == "2") {
    where_rating = "AND buyers_reviews_sellers.rating = 2 ";
  } else if (req.query.select_rating == "1") {
    where_rating = "AND buyers_reviews_sellers.rating = 1 ";
  }

  connection.query(
    "SELECT DISTINCT seller.id AS seller_id, seller.username AS seller_name, seller.sellers_avg_rating, seller.total_sellers_ratings, users_profiles.photo AS buyer_photo, buyer.username AS buyer_name, deals.deal_name, users_purchases.payment_received AS verified_purchase, buyers_reviews_sellers.id AS review_id, buyers_reviews_sellers.rating, buyers_reviews_sellers.title AS rating_title, buyers_reviews_sellers.body AS rating_body, buyers_reviews_sellers.likes AS rating_likes, buyers_reviews_sellers.dislikes AS rating_dislikes, buyers_reviews_sellers.helpful_review AS rating_helpful_review, buyers_reviews_sellers.date_reviewed AS rating_date_reviewed FROM users seller LEFT JOIN buyers_reviews_sellers ON buyers_reviews_sellers.seller_id = seller.id LEFT JOIN users buyer ON buyers_reviews_sellers.buyer_id = buyer.id LEFT JOIN deals ON deals.id = buyers_reviews_sellers.deal_id LEFT JOIN users_purchases ON users_purchases.deal_id = buyers_reviews_sellers.deal_id LEFT JOIN users_profiles ON users_profiles.user_id = buyer.id WHERE buyers_reviews_sellers.display_review = 1 AND seller.id = ?" +
      where_rating +
      order_by,
    [req.params.seller_id],
    function(error, allReviewResults, fields) {
      if (error) console.log(error);

      connection.query(
        "SELECT rating, COUNT(rating) as num_ratings FROM buyers_reviews_sellers WHERE seller_id = ? AND display_review = 1 GROUP BY rating ORDER BY rating",
        [req.params.seller_id],
        function(error, categorizeResults, fields) {
          if (error) console.log(error);
          // console.log(allReviewResults);
          // console.log(categorizeResults);
          res.json({
            allReviews: allReviewResults,
            ratingCategories: categorizeResults
          });
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

// check if user can update the tracking number

router.post("/can_update_tracking", verifyToken, function(req, res) {
  let seller_id = req.decoded._id;
  let { deal_id } = req.body;

  let transaction_id = req.body.txn_id;

  connection.query(
    "SELECT deal_name, tracking_number FROM deals LEFT JOIN users_purchases ON deals.id = users_purchases.deal_id WHERE deals.id = ? AND deals.seller_id = ? AND shipping_label_status = ? AND (txn_id = ? OR paypal_paymentId = ?)",
    [deal_id, seller_id, "seller", transaction_id, transaction_id],
    function(error, results, fields) {
      if (error) console.log(error);
      console.log(results);
      res.json(results);
    }
  );
});

//  update tracking number for deal
router.post("/update_tracking_number", verifyToken, function(req, res) {
  let id = req.decoded._id;

  // txn_id can either be coinpayment txn_id or paypal paypal_paymentId that is passed from front end
  let { trackingNumber, trackingCarrier } = req.body;

  let transaction_id = req.body.txn_id;

  connection.query(
    "UPDATE users_purchases SET ? WHERE txn_id = ? OR paypal_paymentId = ?",
    [
      { tracking_number: trackingNumber, tracking_carrier: trackingCarrier },
      transaction_id,
      transaction_id
    ],
    function(error, results, fields) {
      if (error) res.json(error);

      // post tracking information to shippo tracking webhook
      var tracking_options = {
        url: "https://api.goshippo.com/tracks/",
        headers: {
          carrier: trackingCarrier,
          tracking_number: trackingNumber
        }
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
        }
      }

      request(tracking_options, callback);
      res.json({ message: "success" });
    }
  );
});

module.exports = router;
