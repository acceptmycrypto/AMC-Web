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



router.post('/update/photo', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let user_id = req.decoded._id;
    let photo = req.body.selectedPhoto;
    connection.query('UPDATE users_profiles SET ? WHERE ? ;', [{photo}, {user_id}], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


router.post('/update/username', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let id = req.decoded._id;
    let username = req.body.newUsername;
    connection.query('SELECT username FROM users WHERE ?;', [{username}], function (error, results, fields) {
        if (error) throw error;
        if(results.length < 1){
            connection.query('UPDATE users SET ? WHERE ? ;', [{username}, {id}], function (error, results, fields) {
                if (error) throw error;
                res.json(results);
            });
        }else{
            res.json({responseMessage: "Username is taken. Enter a different Username"});
        }
        
    });
});



module.exports = router;