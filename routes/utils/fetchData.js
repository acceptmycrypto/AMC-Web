const connection = require("./database");
const request = require("request");
const async = require("async");

/**
 * Create a function using async utility module to fetch data with request module
 *
 * @param {Array} dataSet An array of uri to iterate over.
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

module.exports = fetchData
