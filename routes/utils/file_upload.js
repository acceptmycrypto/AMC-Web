// multer: middleware for handling data files. Primarily used for uploading files.
// multer-s3: multer extension for an easy file upload to Amazon S3 service.
// aws-sdk: necessary package to work with AWS(Amazon Web Services). In our case S3 service.

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    region: 'us-west-1' // region of your bucket
});

const s3 = new aws.S3();

const imageUpload = multer({
  storage: multerS3({
    s3: s3, //instance of Amazon S3
    bucket: 'acceptmycrypto', //name of our bucket
    acl: 'public-read', //access control for the file (‘public read’ means that anyone can view files). //https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl
    metadata: function (req, file, cb) { //callback function to set metadata of uploaded files
      console.log("metaddata file", file)
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) { //The name of the file. We use time stamp to set up the name of the file
      cb(null, Date.now().toString())
    }
  })
})

module.exports = imageUpload;