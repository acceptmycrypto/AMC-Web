// require and configure dotenv at the top of the
require("dotenv").config();

// Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// support parsing of application/json type post data
app.use(bodyParser.json());

const connection = require("./routes/utils/database");
const request = require("request");
const async = require("async");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("client/build"));
} else app.use(express.static("public"));

//allow the api to be accessed by other apps
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

//routers
const navbarRoutes = require("./routes/navbar.js");
const adminRoutes = require("./routes/admin.js");
const cryptoRoutes = require("./routes/crypto.js");
const apiRoutes = require("./routes/api.js");
const supportRoutes = require("./routes/support.js");
const userProfileRoutes = require("./routes/user_profile.js");
const friendProfileRoutes = require("./routes/friend_profile.js");
const matchedFriendsRoutes = require("./routes/matched_friends.js");
const dealsRoutes = require("./routes/deals.js");
const signUpRoutes = require("./routes/signup.js");
const signInRoutes = require("./routes/signin.js");
const transactionsRoutes = require("./routes/transactions.js");
const cryptosRankingRoutes = require("./routes/cryptos_ranking.js");
const notificationRoutes = require("./routes/cryptos_ranking.js");
const settingsRoutes = require("./routes/settings.js");
const reviewRoutes = require("./routes/reviews.js");
const listDealRoutes = require("./routes/listDeal.js");
const chatRoutes = require("./routes/chat.js");
const homepageRoutes = require("./routes/homepage.js");

app.use("/", navbarRoutes);
app.use("/", adminRoutes);
app.use("/", cryptoRoutes);
app.use("/", apiRoutes);
app.use("/", supportRoutes);
app.use("/", userProfileRoutes);
app.use("/", friendProfileRoutes);
app.use("/", matchedFriendsRoutes);
app.use("/", dealsRoutes);
app.use("/", signUpRoutes);
app.use("/", signInRoutes);
app.use("/", transactionsRoutes);
app.use("/", cryptosRankingRoutes);
app.use("/", notificationRoutes);
app.use("/", settingsRoutes);
app.use("/", reviewRoutes);
app.use("/", listDealRoutes);
app.use("/", chatRoutes);
app.use("/", homepageRoutes);

//important! must be placed after routes
//Use for react routers
if (process.env.NODE_ENV === "production") {
  // catch all routes
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//pass options as a param to request
//make a get request to coinmarketcap to get latest crypto info
const options = [
  {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
    qs: {
      symbol: "BTC,ETH,LTC,BCH,DASH,ETC,DOGE,XRP,EOS,XVG"
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
      Accept: "application/json"
    }
  },
  {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
      symbol: "BTC,ETH,LTC,BCH,DASH,ETC,DOGE,XRP,EOS,XVG"
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
      Accept: "application/json"
    }
  }
];

/**
 * Create a function using async utility module to fetch data
 *
 * @param {...Array} dataSet An array of uri to iterate over.
 * rest parameter syntax allows us to represent an indefinite number of arguments
 * as an array
 */

function fetchData(dataSet) {

  async.map(
    dataSet,
    function(option, callback) {
      request(option, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          callback(null, info);
        } else {
          callback(error || response.statusCode);
        }
      });
    },
    function(err, results) {
      if (err) console.log(err);
      // insertCryptos(results);
      updateCryptos(results);
    }
  );

  function insertCryptos(Cryptoresults) {
    let coin_info = Cryptoresults[0].data;
    let coin_metadata = Cryptoresults[1].data;

    for (let i in coin_metadata) {
      let crypto_name = coin_metadata[i].name;
      let crypto_symbol = coin_metadata[i].symbol;
      let crypto_price = coin_metadata[i].quote.USD.price;

      connection.query(
        "INSERT IGNORE INTO crypto_metadata SET ?",
        {
          crypto_name: crypto_name,
          crypto_symbol: crypto_symbol,
          crypto_price: crypto_price
        },
        function(err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    for (let j in coin_info) {
      let crypto_site = coin_info[j].urls.website[0];
      let crypto_logo = coin_info[j].logo;
      let crypto_metadata_name = coin_info[j].name;

      connection.query(
        "INSERT IGNORE INTO crypto_info SET ?",
        {
          crypto_logo: crypto_logo,
          crypto_link: crypto_site,
          crypto_metadata_name
        },
        function(err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }

  function updateCryptos(Cryptoresults) {
    let coin_info = Cryptoresults[0].data;
    let coin_metadata = Cryptoresults[1].data;

    for (let i in coin_metadata) {
      let crypto_name = coin_metadata[i].name;
      let crypto_symbol = coin_metadata[i].symbol;
      let crypto_price = coin_metadata[i].quote.USD.price;

      connection.query(
        "UPDATE IGNORE crypto_metadata SET ?",
        {
          crypto_name: crypto_name,
          crypto_symbol: crypto_symbol,
          crypto_price: crypto_price
        },
        function(err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    for (let j in coin_info) {
      let crypto_site = coin_info[j].urls.website[0];
      let crypto_logo = coin_info[j].logo;
      let crypto_metadata_name = coin_info[j].name;

      connection.query(
        "UPDATE IGNORE crypto_info SET ?",
        {
          crypto_logo: crypto_logo,
          crypto_link: crypto_site,
          crypto_metadata_name
        },
        function(err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  }
}

fetchData(options);

//Heroku tells us which port our app to use. For production, we use Heroku port. For development, we use 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("Backend server is listening on 3001");
});
