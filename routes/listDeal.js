const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const verifyToken =  require ("./utils/validation");
var request = require("request");

// file-type: Detect the file type of a Buffer/Uint8Array
// multiparty: Parse http requests with content-type multipart/form-data, also known as file uploads.
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const uploadFile =  require ("./utils/file_upload");

// create S3 instance
const s3 = new AWS.S3();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PW,
  database: process.env.DB_DB
});

router.post("/image/upload", verifyToken, function(request, response) {
  let user_id = request.decoded._id;
  console.log("this is my user ID", user_id);

  const form = new multiparty.Form(); // parse a file upload
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path; //get the file path
        const buffer = fs.readFileSync(path); //return the content of the path in buffer
        const type = fileType(buffer); //return { ext: 'png', mime: 'image/png' }
        const timestamp = Date.now().toString();
        const fileName = `dealsImages/user_id-${user_id}/${timestamp}`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).json(data);
      } catch (error) {
        return response.status(400).json(error);
      }
    });
})

router.post("/image/remove", verifyToken, function(request, response) {

  let params = {
    Bucket: process.env.AMAZON_BUCKET,
    Key: request.body.imageKey
   };

   s3.deleteObject(params, function (err, data) {
    if (data) {
        console.log("File deleted successfully");
    }
    else {
        console.log("Check if you have sufficient permissions : "+err);
    }
  });

  let user_id = request.decoded;
  console.log("imageKey", request.body.imageKey);

})

router.post("/cryptocurrency/exchange", verifyToken, async function(req, res) {
  //call coinmarketcap api to get the exchange rate
  let crypto = req.body.crypto_symbol;
  let discountPrice = parseFloat(req.body.price_in_crypto);

  let options = {
      method: "GET",
      qs: {
        symbol: crypto
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
        Accept: "application/json"
      }
    }
  ;

  //use request to call coinmarketcap endpoint
  await request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', options, function (error, response, body) {
    if (error) {
      console.log(error);
    }

    let rateDate = JSON.parse(body);
    let cryptoRate = rateDate.data[crypto].quote.USD.price;
    let cryptoAmount = (discountPrice/cryptoRate).toFixed(4);

    return res.status(200).json(cryptoAmount);
  });


})

router.post('/listdeal', verifyToken, function(req, res) {
  //info needed to insert into tables
  let {dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos} = req.body
  let seller_id = req.decoded._id;
  let phone_number_verified;

  //deals table
  //deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition
  let deal_name = dealName;
  let deal_description = JSON.stringify(textDetailRaw);
  let item_condition;
  if (selectedCondition.value) {
    item_condition = selectedCondition.value;
  }
  let featured_deal_image = images[0].Location;
  let pay_in_dollar = priceInUSD;
  let pay_in_crypto = priceInCrypto;

  //Check if phone number is verified
  connection.query("SELECT phone_number_verified FROM users WHERE id = ?", [seller_id],
    function (error, results, fields) {

      if (error) console.log(error);

      phone_number_verified = results[0].phone_number_verified;

      // if (phone_number_verified === 0) { //if not verified, we need to verify user
      //   res.json(phone_number_verified)
      // }

  });



  //First insert into deals table
  // INSERT INTO users_shipping_address SET ?
  let deals_rows = {seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition};

  connection.query("INSERT INTO deals SET ?",
    deals_rows,
    function (error, results, fields) {
      if (error) console.log(error);
      deal_id = results.insertId; //assign the new deal_id

      //Second insert images into deal_images table
      //create image rows with the deal id to be inserted into deal_images table
      let imagesRow = [];
      for (let i = 0; i < images.length; i++) {
        let dealImageRecord = [];
        dealImageRecord.push(deal_id, images[i].Location)
        imagesRow.push(dealImageRecord);
      }
      connection.query("INSERT INTO deal_images(deal_id, deal_image)  VALUES ?", [imagesRow],
      function (error, results, fields) {
        if (error) console.log(error);
      });

      //Third insert categories into categories_deals table
      //get the cetegory_id
      connection.query("SELECT id AS category_id FROM category WHERE category_name IN (?)", [selectedCategory],
      function (error, results, fields) {
        if (error) console.log(error);

        let categories_deals = [];
        for (let i = 0; i < results.length; i++) {
          let records = [];
          records.push(results[i].category_id, deal_id)
          categories_deals.push(records);
        }

        connection.query("INSERT INTO categories_deals(category_id, deals_id) VALUES ?", [categories_deals],
        function (error, results, fields) {
          if (error) console.log(error);
        });
      });

      //Fourth insert into cryptos_deals table
      connection.query("SELECT id AS crypto_id FROM crypto_metadata WHERE crypto_symbol IN (?)", [selected_cryptos],
      function (error, results, fields) {
        if (error) console.log(error);

        let cryptos_deals = [];
        for (let i = 0; i < results.length; i++) {
          let records = [];
          records.push(results[i].crypto_id, deal_id)
          cryptos_deals.push(records);
        }

        connection.query("INSERT INTO cryptos_deals(crypto_id, deal_id) VALUES ?", [cryptos_deals],
        function (error, results, fields) {
          if (error) res.status(400).json({message: `Failed to create deal: ${error}`});

          res.json({deal_id, phone_number_verified});

        });
      });

  });



});

//to be used for /verification/check
let phone_number;

router.post('/verification/start', verifyToken, function(req, res) {
  let seller_id = req.decoded._id;

  phone_number = parseInt(req.body.phoneNumber.replace(/[^0-9\.]+/g, "")); //replace 111-111-1111 with 1111111111

  let state = req.body.sellerState.value;

  let {sellerAddress, sellerCity, sellerZipcode} = req.body;

  connection.query("UPDATE users SET ? WHERE ?",
  [
    { address: sellerAddress,
      city: sellerCity,
      state,
      zipcode: sellerZipcode
    }, {id: seller_id}],
  function (error, results, fields) {
    if (error) console.log(error);
  });

  let options = {
    method: "POST",
    url: "https://api.authy.com/protected/json/phones/verification/start",
    form: {
      api_key: process.env.TWILIO_API_KEY,
      phone_number: phone_number,
      via: 'SMS',
      country_code: 1,
      code_length: 4
    }
  };

  request(options, function (error, response, body) {
    if (error) console.log("Twilio error:", error);

    res.json(body)

  });
})

router.post('/verification/check', verifyToken, function(req, res) {

  let seller_id = req.decoded._id;
  console.log("SELLER", seller_id);

  let options = {
    method: "GET",
    url: "https://api.authy.com/protected/json/phones/verification/check",
    form: {
      api_key: process.env.TWILIO_API_KEY,
      phone_number: phone_number,
      verification_code: req.body.phoneCode,
      country_code: 1,
    }
  };

  request(options, function (error, response, body) {
    if (error) console.log(error);

    let status = JSON.parse(body);

    //update seller to verified if code entered is correct
    if (status.success) {

      connection.query(
        'UPDATE users SET ? WHERE ?',
        [{phone_number_verified: 1}, {id: seller_id}],
        function(error, results, fields) {
          if (error) throw error;
          console.log(results);
          res.json(body);
        }
      );
    }

  });
})

// moved route "category/parent" to navbar.js route file


module.exports = router;
