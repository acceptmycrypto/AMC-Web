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

router.get('/landing/users/dropdown', function (req, res) {

    connection.query('SELECT * FROM landing_cryptos', function (error, results, fields) {
        if (error) throw error;

        res.json(results);
    });

    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    console.log("line 49", path.resolve(__dirname, './client/build', 'index.html'))
});

router.post('/landing/users/votes', function (req, res) {
    console.log(req.body);
    var selectedCryptos = req.body.cryptoProfile;
    var email = req.body.email;
    // First we make a query to see if user exists in the database
    connection.query('SELECT * FROM landing_users WHERE email = ?',[email], function(error, result, fields) {
        if (error) throw error;

        // if we find the user exists in the database, we send "User already exists" to the client
        if (result[0]) return res.status(404).json({ error: 'User already exists' });

        connection.query('INSERT INTO landing_users (email) VALUES(?)', [email], function(error, result, fields) {
            if (error) throw error;
            var user_id = result.insertId;
            var newUserCryptoRow ="";

            for (var i in selectedCryptos){
                newUserCryptoRow +=  "('" + user_id + "','" + selectedCryptos[i]  + "'),";
            }
            allUserCryptoRows = newUserCryptoRow.substr(0,newUserCryptoRow.length-1);
            var userCryptoQuery = 'INSERT INTO landing_users_cryptos (landing_users_id, landing_cryptos_id) VALUES ' + allUserCryptoRows;
            // insertUserCryptoLanding(userCryptoQuery);
            connection.query(userCryptoQuery, function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });

            }

        )

        res.json(result);

    }
  );

});



module.exports = router;