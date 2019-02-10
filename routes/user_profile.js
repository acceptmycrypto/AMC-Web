var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");


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



router.post('/profile', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let id = req.decoded._id;
    connection.query('SELECT users.id, users.username, users.first_name, users.last_name, users.email, users_profiles.bio, users_profiles.photo, users_profiles.user_location, users_profiles.birthday  FROM users LEFT JOIN users_profiles ON users.id = users_profiles.user_id WHERE users.id = ?;', [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/profile/crypto', verifyToken, function (req, res) {
    let id = req.decoded._id;
    connection.query('SELECT users_cryptos.id, users_cryptos.user_id, users_cryptos.crypto_id, users_cryptos.crypto_address, crypto_info.crypto_metadata_name, crypto_info.crypto_logo, crypto_info.crypto_link, crypto_metadata.crypto_symbol, crypto_metadata.crypto_price   FROM users_cryptos LEFT JOIN crypto_info ON users_cryptos.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE users_cryptos.user_id = ?;', [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


router.put('/profile/addAddress', verifyToken, function (req, res) {
    let { id, crypto_address } = req.body
    let user_id = req.decoded._id;
    console.log(id, crypto_address);
    connection.query('UPDATE users_cryptos SET ? WHERE  ? AND ?', [{ crypto_address }, { id }, { user_id }], function (error, results, fields) {
        if (error) throw error;

        res.json(results);
    });
});

router.post('/profile/friends', verifyToken, function (req, res) {
    let id = req.decoded._id;
    connection.query('SELECT users.id, users.username, users.first_name, users.last_name, users_profiles.photo, users_profiles.user_location FROM users LEFT JOIN users_profiles ON users.id = users_profiles.user_id WHERE users.id IN (SELECT matched_friend_id AS id FROM users_matched_friends WHERE user_id = ? AND both_accepted = 1)', [id], function (error, results, fields) {
        let shuffledfriendsArray = shuffle(results);

        let friendsArray = shuffledfriendsArray.slice(0, 11);

        res.json(friendsArray);

    });

});

router.post('/profile/matched/friends', verifyToken, function (req, res) {
    let id = req.decoded._id;
    connection.query('SELECT users.id, users.username, users_profiles.photo FROM users LEFT JOIN users_profiles ON users.id = users_profiles.user_id WHERE users.id IN (SELECT matched_friend_id AS id FROM users_matched_friends WHERE user_id = ? AND user_accepted = 0 AND both_accepted = 0)', [id], function (error, results, fields) {
        // let shuffledfriendsArray = shuffle(results);

        // let friendsArray = shuffledfriendsArray.slice(0,11);

        res.json(results);

    });

});

router.post("/profile/user/transactions", verifyToken, function (req, res) {
    let id = req.decoded._id;
    connection.query(
        'SELECT users_purchases.id AS users_purchases_id, users_purchases.date_purchased, users_purchases.amount, deals.deal_name, deals.id AS deal_id, deals.featured_deal_image, buyer.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol, users_purchases.txn_id, users_purchases.qrcode_url, users_purchases.status, users_purchases.payment_received, users_purchases.timeout, users_purchases.address, seller.id AS seller_id, seller.username AS seller_name, buyers_reviews_sellers.date_reviewed FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users buyer ON users_purchases.user_id = buyer.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = buyer.id LEFT JOIN users seller ON deals.seller_id = seller.id LEFT JOIN buyers_reviews_sellers ON users_purchases.buyers_reviews_sellers_id = buyers_reviews_sellers.id WHERE buyer.id = ? ORDER BY users_purchases.date_purchased DESC',
        //   [id, 1], //1 is true for payment received
        [id],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});

router.post("/profile/user/transaction-review", verifyToken, function (req, res) {
  let id = req.decoded._id;
  let {txn_id} = req.body;
  connection.query(
      'SELECT users_purchases.id AS users_purchases_id, users_purchases.date_purchased, users_purchases.amount, deals.deal_name, deals.id AS deal_id, deals.featured_deal_image, buyer.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol, users_purchases.txn_id, users_purchases.qrcode_url, users_purchases.status, users_purchases.payment_received, users_purchases.timeout, users_purchases.address, seller.id AS seller_id, seller.username AS seller_name FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users buyer ON users_purchases.user_id = buyer.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = buyer.id LEFT JOIN users seller ON deals.seller_id = seller.id WHERE txn_id = ?',
      [txn_id],
      function (error, results, fields) {
          if (error) console.log(error);
          res.json(results);
      }
  );
});


//grab the cryptos list for user to select
router.post("/crypto/left", verifyToken, function (req, res) {
    let id = req.decoded._id;
    connection.query(
        'SELECT crypto_metadata.crypto_name, crypto_metadata.crypto_symbol FROM crypto_metadata WHERE crypto_metadata.crypto_name NOT IN (SELECT crypto_metadata.crypto_name FROM users_cryptos LEFT JOIN crypto_metadata ON users_cryptos.crypto_id = crypto_metadata.id WHERE users_cryptos.user_id = ?)',
        [id],
        function (error, results, fields) {

            if (error) throw error;

            res.json(results);
        }
    );
});

//add cryptos to user crypto portfolio
router.post("/add/cryptos", verifyToken, function (req, res) {
    let id = req.decoded._id;
    let selectedCryptos = req.body.cryptoProfile;

    connection.query("SELECT id FROM crypto_metadata WHERE crypto_name IN (?)", [selectedCryptos], function (error, results, fields) {
        console.log(" line 133 Results,", results);
        let cryptoNames = "";
        for (let i in results) {
            console.log("results[i]", results[i]);
            console.log("results[i].id", results[i].id);

            cryptoNames +=  "('" + id + "','" + results[i].id + "'),";
        }

        cryptoNames = cryptoNames.substr(0, cryptoNames.length - 1);
        console.log("cryptoNames", cryptoNames)
        let cryptoQuery = 'INSERT INTO users_cryptos (user_id, crypto_id) VALUES ' + cryptoNames;
        connection.query(cryptoQuery, function (error, results, fields) {
            if (error) throw error;
            console.log("line 147 Results", results)


        });

        res.json(results);

    });

    }
);


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



module.exports = router;