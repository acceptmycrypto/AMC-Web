const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const verifyToken =  require ("./utils/validation");

// file-type: Detect the file type of a Buffer/Uint8Array
// multiparty: Parse http requests with content-type multipart/form-data, also known as file uploads.
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const uploadFile =  require ("./utils/file_upload");

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

  let user_id = request.decoded;
  console.log("this is my user ID", user_id);

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
