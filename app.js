// require and configure dotenv at the top of the app
require("dotenv").config();

// Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//support parsing of application/json type post data
app.use(bodyParser.json());

const fetchData = require("./routes/utils/fetchData");
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

//whenver we starts the server, fetch data on development env
if (process.env.NODE_ENV = "development") {
  fetchData(options);
}

module.exports = app;
