const app = require("./app");
const fetchData = require("./routes/utils/fetchData");

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


//Heroku tells us which port our app to use. For production, we use Heroku port. For development, we use 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("Backend server is listening on 3001");
});
