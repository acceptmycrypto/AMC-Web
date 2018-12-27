var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var verifyToken =  require ("./utils/validation");

// file-type: Detect the file type of a Buffer/Uint8Array
// multiparty: Parse http requests with content-type multipart/form-data, also known as file uploads.
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
var uploadFile =  require ("./utils/file_upload");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

router.post("/image/upload", function(request, response) {
  const form = new multiparty.Form(); // parse a file upload
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path; //get the file path
        const buffer = fs.readFileSync(path); //return the content of the path in buffer
        const type = fileType(buffer); //return { ext: 'png', mime: 'image/png' }
        const timestamp = Date.now().toString();
        const fileName = `dealsImages/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).json(data);
      } catch (error) {
        return response.status(400).json(error);
      }
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
