var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");

var shippo = require('shippo')(process.env.SHIPMENT_KEY);


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


router.get('/newshipment', function (req, res) {


    var addressFrom  = {
        "name": "Mr Shippotester",
        "street1":"215 Clayton St.",
        "city":"San Francisco",
        "state":"CA",
        "zip":"94117",
        "country":"US",
        "phone":"+1 555 341 9393",
        "email":"support@goshippo.com",
    };

    var addressTo = {
        "name": "Mr Hippo",
        "street1": "250 Joralemon Street",
        "street2": "",
        "city": "Brooklyn",
        "state": "NY",
        "zip": " 11201",
        "country": "US",
        "phone": "+1 555 341 9393",
        "email": "mrhippo@goshippo.com",
    };
  
    // parcel object dict
    var parcel = {
        "length":"5",
        "width":"5",
        "height":"5",
        "distance_unit":"in",
        "weight":"2",
        "mass_unit":"lb"
    };
  
    shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": false
    }, function(err, shipment){
        
        // get the cheapest rate for the shipment 
        var cheapest_rate = shipment.rates.filter(function (rate){
            if(rate.attributes.length > 0){
                for(var i = 0; i<rate.attributes.length; i++){
                    if(rate.attributes[i] == "CHEAPEST"){
                        return rate;
                    }
                }
            }
        })

        // get the cheapest rate's object id to be used in the creating the shipment transaction
        var rate_object_id = cheapest_rate[0].object_id;

        shippo.transaction.create({
            "rate": rate_object_id,
            "label_file_type": "PDF",
            "async": false
        }, function(err, transaction) {
            if(err) throw err;
           res.json({shipment, transaction});
           console.log(transaction);
           
        });
    });
  });


  router.post("/tracking-info", function(req, res) {
    console.log("117", res.req.body);
    res.json(res.transaction_updated);
  });

  router.post("/", function (req,res){
    console.log("123", res.req.body);
    // res.json(res.transaction_updated.body.data);
    res.json(res.transaction_updated);
  })

module.exports = router;