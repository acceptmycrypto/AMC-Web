// aws-sdk: necessary package to work with AWS(Amazon Web Services). In our case S3 service.
// bluebird:  fully featured promise library with focus on innovative features and performance

const AWS = require('aws-sdk');
const bluebird = require('bluebird');

// configure the keys for accessing AWS
AWS.config.update({
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  region: 'us-west-1' // region of your bucket
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'acceptmycrypto',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

module.exports = uploadFile;