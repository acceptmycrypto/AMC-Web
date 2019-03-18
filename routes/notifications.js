var connection = require("./utils/database");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

var path = require("path");

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));


router.get('/notification', function(req, res){
    connection.query(
        'SELECT notifications.id, notifications.unread, users.id, users.username, venues.venue_name, deals.deal_name, deals.deal_description',
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


module.exports = router;