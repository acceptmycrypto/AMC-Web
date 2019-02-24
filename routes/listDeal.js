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


// creating clarifai - image recognition
const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/
const clar = new Clarifai.App({
 apiKey: process.env.CLARIFAI_KEY
});

const clarifaiFunc = require("./utils/clarifai_checker");


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
 
  const form = new multiparty.Form(); // parse a file upload
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path; //get the file path
        const buffer = fs.readFileSync(path); //return the content of the path in buffer
        // let x = "https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-1/1550954878593.jpg"
        
        let buff = buffer.toString('base64');

        // console.log(buff);
        // const clarifyStuff = clarifaiFunc.generalClarifai(x);

        
        // 

        const modWithBytes = await clarifaiFunc.moderationClarifaiBytes(buff);
        const nsfwWithBytes = await clarifaiFunc.nsfwClarifaiBytes(buff);
        // console.log(modWithBytes[0].name); 
        // console.log(nsfwWithBytes[0].name);
        //  modWithBytes[0].name will be either safe or drug, gore, suggestive, explicit
        //  nsfwWithBytes[0].name will be either nsfw or sfw
        if(modWithBytes[0].name === "safe" && nsfwWithBytes[0].name === "sfw"){
          const clarifaiWithBytes = await clarifaiFunc.generalClarifaiBytes(buff);
          const hashtags = [clarifaiWithBytes[0]["name"], clarifaiWithBytes[1]["name"], clarifaiWithBytes[2]["name"]];
          const type = fileType(buffer); //return { ext: 'png', mime: 'image/png' }
          const timestamp = Date.now().toString();
          const fileName = `dealsImages/user_id-${user_id}/${timestamp}`;
  
          let data = await uploadFile(buffer, fileName, type);
          
  
          return response.status(200).json({data, hashtags});

        } else{
          let data = null;
          let hashtags = null;
            return response.json({data, hashtags});
        }

        
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
        let imageObj = JSON.stringify(images[i])
        dealImageRecord.push(deal_id, images[i].Location, images[i].Key, imageObj) //image[i].Location is the image url
        imagesRow.push(dealImageRecord);
      }
      connection.query("INSERT INTO deal_images(deal_id, deal_image, deal_image_key, deal_image_object)  VALUES ?", [imagesRow],
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

      //Fourth insert into cryptos_deals table and users_cryptos
      connection.query("SELECT id AS crypto_id FROM crypto_metadata WHERE crypto_symbol IN (?)", [selected_cryptos],
      function (error, selectedCryptoIds, fields) {
        if (error) console.log(error);

        let cryptos_deals = []; //[[1,1], [2,1]] for inserting into crypto_deals
        let selectedCryptosIds_arr = []; //[1,2] used in the filter function

        //create a nested array for insertion into cryptos_deals table
        for (let i = 0; i < selectedCryptoIds.length; i++) {
          let cryptosDeals_records = [];

          cryptosDeals_records.push(selectedCryptoIds[i].crypto_id, deal_id)
          cryptos_deals.push(cryptosDeals_records);

          //used in filter function
          selectedCryptosIds_arr.push(selectedCryptoIds[i].crypto_id);
        }

        //create an array of cryptos id that are not existed yet in users_cryptos
        //Then insert into users_cryptos table where selected cryptos are not existed yet in the user's portfolio
        connection.query("SELECT crypto_id from users_cryptos where user_id = ?", [seller_id],
        function (error, results, fields) {
          if (error) res.status(400).json({message: `Failed to create deal: ${error}`});

          let users_cryptos = []; //for inserting into users_cryptos
          let cryptoPorfolioIds_arr = []; //making a array of cryptos ids [1, 2]

          for (let i = 0; i < results.length; i++) {
            cryptoPorfolioIds_arr.push(results[i].crypto_id);
          }

          //compare two arrays to find the unique cryptos_ids
          //use filtering for both ways
          let unique2 = selectedCryptosIds_arr.filter(function(obj) { return cryptoPorfolioIds_arr.indexOf(obj) == -1; });


          //create a nested array for insertion [[1,1], [2,1]] where seller_id is the second indexof inner nested array
          for (let j = 0; j < unique2.length; j++) {
            let usersCryptos_records = [];

            usersCryptos_records.push(unique2[j], seller_id)

            users_cryptos.push(usersCryptos_records);
          }

          //insert into users_cryptos if there is a new crypto that has not yet existed in users's crypto portfolio
          if (users_cryptos.length > 0) {
            console.log("executed");
            connection.query("INSERT INTO users_cryptos(crypto_id, user_id) VALUES ?", [users_cryptos],
            function (error, results, fields) {
              if (error) console.log(error);
              console.log(results);
            });
          }

        });

        //insert into cryptos_deals
        connection.query("INSERT INTO cryptos_deals(crypto_id, deal_id) VALUES ?", [cryptos_deals],
        function (error, results, fields) {
          if (error) res.status(400).json({message: `Failed to create deal: ${error}`});

          res.json({deal_id, phone_number_verified});

        });
      });

  });

});

router.post('/listdeal/edit', verifyToken, function(req, res) {
   //info needed to insert into tables
   let {dealName, selectedCategory, editingDealId, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos} = req.body
   let seller_id = req.decoded._id;
   let phone_number_verified;
   console.log(req.body);

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

   //update deals table
   connection.query("UPDATE deals SET ? WHERE ?",
  [
    { deal_name,
      deal_description,
      featured_deal_image,
      item_condition,
      pay_in_dollar,
      pay_in_crypto
    }, {id: editingDealId}],
      function (error, results, fields) {
        if (error) console.log(error);
  });

  //update cryptos_deals
  let toBeKeptCryptosID = "SELECT crypto_id, crypto_symbol FROM cryptos_deals LEFT JOIN crypto_metadata ON cryptos_deals.crypto_id = crypto_metadata.id WHERE crypto_symbol IN (?) AND deal_id = ?";
  let newCryptosID = "SELECT id AS crypto_id FROM crypto_metadata WHERE crypto_symbol IN (?)"

  //query the crypto_ids needed to be kept
  connection.query(toBeKeptCryptosID, [selected_cryptos, editingDealId],
  function (error, toBeKeptCryptoResult, fields) {
    if (error) console.log(error);

    let toBeKeptCryptosArr = [];
    for (let i = 0; i < toBeKeptCryptoResult.length; i++) {
      toBeKeptCryptosArr.push(toBeKeptCryptoResult[i].crypto_id); //cryptos_ids [2,3]
      console.log(toBeKeptCryptosArr);
    }

    //delete the crypto_id that users de-select
    if (toBeKeptCryptosArr.length > 0) {
      connection.query("DELETE FROM cryptos_deals WHERE crypto_id NOT IN (?) AND deal_id = ?", [toBeKeptCryptosArr, editingDealId],
      function (error, exisitingCryptoResult, fields) {
        if (error) console.log(error);
      });
    } else {
      connection.query("DELETE FROM cryptos_deals WHERE deal_id = ?", [editingDealId],
      function (error, exisitingCryptoResult, fields) {
        if (error) console.log(error);
      });
    }

    //insert new cryptos_ids into cryptos_deals
    connection.query(newCryptosID, [selected_cryptos],
      function (error, newCryptoResult, fields) {
        if (error) console.log(error);

        let cryptos_deals = [];
        for (let i = 0; i < newCryptoResult.length; i++) {
          let records = [];
          records.push(newCryptoResult[i].crypto_id, editingDealId)
          cryptos_deals.push(records);
        }

        connection.query("INSERT INTO cryptos_deals(crypto_id, deal_id) VALUES ? ON DUPLICATE KEY UPDATE crypto_id=VALUES(crypto_id),deal_id=VALUES(deal_id)",
        [cryptos_deals], //cryptos_deals = [[1,2], [3, 2]]
        function (error, results, fields) {
          if (error) console.log(error);
        });
    });
  });


  //update category deals
  let toBeKeptCategoryID = "SELECT category_id FROM categories_deals LEFT JOIN category ON categories_deals.category_id = category.id WHERE category_name IN (?) AND categories_deals.deals_id = ?";
  let newCategoryID = "SELECT id AS category_id FROM category WHERE category_name IN (?)"

  connection.query(toBeKeptCategoryID, [selectedCategory, editingDealId],
    function (error, toBeKeptCategoryResult, fields) {
      if (error) console.log(error);

      let toBeKeptCategoryArr = [];
      for (let i = 0; i < toBeKeptCategoryResult.length; i++) {
        toBeKeptCategoryArr.push(toBeKeptCategoryResult[i].category_id);
      }

      if (toBeKeptCategoryArr.length > 0) {
        connection.query("DELETE FROM categories_deals WHERE category_id NOT IN (?) AND categories_deals.deals_id = ?", [toBeKeptCategoryArr, editingDealId],
        function (error, exisitingCetegoryResult, fields) {
          if (error) console.log(error);
        });
      } else {
        connection.query("DELETE FROM categories_deals WHERE categories_deals.deals_id = ?", [editingDealId],
        function (error, exisitingCetegoryResult, fields) {
          if (error) console.log(error);
        });
      }

      connection.query(newCategoryID, [selectedCategory],
        function (error, newCategoryResult, fields) {
          if (error) console.log(error);

          let category_deals = [];
          for (let i = 0; i < newCategoryResult.length; i++) {
            let records = [];
            records.push(newCategoryResult[i].category_id, editingDealId)
            category_deals.push(records);
          }

          connection.query("INSERT INTO categories_deals(category_id, deals_id) VALUES ? ON DUPLICATE KEY UPDATE category_id=VALUES(category_id),deals_id=VALUES(deals_id)",
          [category_deals],
          function (error, results, fields) {
            if (error) console.log(error);
          });
      });
    });

  //update deal_images
  let toBeKeptImageID = "SELECT deal_image_key FROM deal_images WHERE deal_image_key IN (?) AND deal_id = ?";
  let newImageKeys = [];
  for (let i in images) {
    newImageKeys.push(images[i].Key);
    console.log("deal_image_key", newImageKeys);
  }

  const removeImageOnAWS = (imagesToBeRemoved) => {
    let keysArr = [];
    for (let i in imagesToBeRemoved) {
      let keyObj = {Key: imagesToBeRemoved[i].deal_image_key}
      keysArr.push(keyObj);
    }

    let params = {
      Bucket: process.env.AMAZON_BUCKET,
      Delete: {
        Objects: keysArr
      }
    };

    s3.deleteObjects(params, function (err, data) {
      console.log()
      if (data) {
          console.log("File deleted successfully");
      }
      else {
          console.log(err);
      }
    });
  }

  const insertNewImages = (images) => {
    //prep for inserting new images
    let imagesRow = [];
    for (let i = 0; i < images.length; i++) {
      let dealImageRecord = [];
      let imageObj = JSON.stringify(images[i])
      dealImageRecord.push(images[i].Location, images[i].Key, editingDealId, imageObj) //image[i].Location is the image url
      imagesRow.push(dealImageRecord);
    }

    connection.query("INSERT IGNORE INTO deal_images(deal_image, deal_image_key, deal_id, deal_image_object) VALUES ?",
    [imagesRow],
    function (error, results, fields) {
      if (error) console.log(error);
    });
  }

  connection.query(toBeKeptImageID, [newImageKeys, editingDealId],
  function (error, toBeKeptImageResult, fields) {
    if (error) console.log(error);

    let toBeKeptImageArr = [];
    for (let i = 0; i < toBeKeptImageResult.length; i++) {
      toBeKeptImageArr.push(toBeKeptImageResult[i].deal_image_key);
      console.log("image to be kept", toBeKeptImageArr);
    }

    //delete images that users removed
    if (toBeKeptImageArr.length > 0) {

      connection.query("SELECT * FROM deal_images WHERE deal_image_key NOT IN (?) AND deal_id = ?", [toBeKeptImageArr, editingDealId],
      function (error, imagesToBeRemoved, fields) {
        if (error) console.log(error);

        //delete images users removed from the database
        connection.query("DELETE FROM deal_images WHERE deal_image_key NOT IN (?) AND deal_id = ?",
        [toBeKeptImageArr, editingDealId],
        function (error, result, fields) {
          if (error) console.log(error);
        });

        //inserting new images user selects
        insertNewImages(images)

        //delete image on AWS
        removeImageOnAWS(imagesToBeRemoved);

        res.json({success: true, message: "Updated Successfully."});
      });

    } else {
      connection.query("SELECT * FROM deal_images WHERE deal_id = ?", [editingDealId],
        function (error, imagesToBeRemoved, fields) {

          if (error) console.log(error);

          //delete images users removed from the database
          connection.query("DELETE FROM deal_images WHERE deal_id = ?",
          [editingDealId],
          function (error, result, fields) {
            if (error) console.log(error);
          });

          //inserting new images
          insertNewImages(images)

          //delete image on AWS
          removeImageOnAWS(imagesToBeRemoved);

          res.json({success: true, message: "Updated Successfully."});
        });
    }

  });

})

router.post('listdeal/delete', verifyToken, function(req, res) {
  let user_id = req.decoded._id;
  let {deal_id} = req.body.deal_id;
})

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
