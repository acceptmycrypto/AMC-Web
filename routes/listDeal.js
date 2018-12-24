var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var verifyToken =  require ("./utils/validation");
var imageUpload = require('./utils/file_upload');
const formData = require('express-form-data')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(formData.parse())

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

const multiUpload = imageUpload.array('images')

router.post("/image/upload", function(req, res) {
  multiUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }
    console.log("images", req.file)
    console.log("images location", req.file.location);
    return res.json({'imageUrl': req.file.location});
  });
})

// api
// router.post('/listdeal', verifyToken, function(req, res) {
//   let id = req.decoded._id;
//   //what is needed to insert into the tables?


//   if (id) { //if login


//   }
// });

module.exports = router;
