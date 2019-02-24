// creating clarifai - image recognition
const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/
const clar = new Clarifai.App({
  apiKey: 'a8a324ce95b74254ad0ece04c0a8171e'
});

const clarifyObj = (x) => clar.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" }).then(generalModel => {
  return generalModel.predict(x);
}).then(generalResponse => {
  console.log("======================");
  // console.log(generalResponse);
  var concepts = generalResponse['outputs'][0]['data']['concepts'];
  console.log(concepts);
})

module.exports = clarifyObj;