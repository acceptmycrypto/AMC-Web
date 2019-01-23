var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken =  require ("./utils/validation");


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






router.get('/landing/results', function (req, res) {

    connection.query('SELECT landing_users_cryptos.landing_cryptos_id, landing_cryptos.crypto_name, COUNT(*) as Count FROM landing_users_cryptos LEFT JOIN landing_cryptos ON landing_users_cryptos.landing_cryptos_id = landing_cryptos.id WHERE landing_users_cryptos.landing_cryptos_id > 0 GROUP BY landing_users_cryptos.landing_cryptos_id ORDER BY Count DESC LIMIT 10;',
     function (error, results, fields) {

        res.json(results);
    });
});





module.exports = router;