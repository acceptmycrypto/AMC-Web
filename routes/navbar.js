var connection = require("./utils/database");
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


router.post('/navbar/photo',verifyToken, function (req, res) {
    var id = req.decoded._id;
    connection.query('SELECT users_profiles.photo, users.id AS user_id FROM users_profiles LEFT JOIN users ON users.id = users_profiles.user_id WHERE users.id = ?;', [id], function (error, results, fields) {
        if (error) throw error;

        res.json({photo: results[0].photo, user_id: results[0].user_id});
    });
});

//getting the seller photo for the deal item for the buyer
router.get('/seller-photo/:seller_id', function (req, res) {
  let seller_id = req.params.seller_id;

  connection.query('SELECT users_profiles.photo FROM users_profiles LEFT JOIN users ON users.id = users_profiles.user_id WHERE users.id = ?;', [seller_id], function (error, results, fields) {
      if (error) throw error;
      res.json(results[0].photo);
  });
});

router.post('/loggedIn', verifyToken, function (req, res){
    if(req.decoded._id){
        res.json({"message": "Right Token"});
    }else{
        res.status(403).json({"message": "No Token"});
    }
});

router.get("/category/parent", function(req, res) {
    //The first 13 records are the parent categories
    connection.query(
      "SELECT * FROM category limit 13", function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );

  });



module.exports = router;