const Deal = {
  dealItemQuery: result => {
    let img = "";
    let images = [];
    let imagesObj = [];
    let categ = "";
    let categories = [];

    //loop through result to get distinct images, image objects, and categories
    for (let item of result) {
      //check to see if deal_image is not in the img
      if (item.deal_image !== img) {
        let parsedImageObj = JSON.parse(item.deal_image_object);

        images.push(item.deal_image); //store an array of image urls
        imagesObj.push(parsedImageObj); //store an array of image objects

        //set index image for comparison
        img = item.deal_image;
      }

      if (item.deal_category !== categ) {
        categories.push(item.deal_category);
        categ = item.deal_category;
      }
    }

    //since every object in the array is the same, we just use the first object in the array
    //reassign the deal_image property to images array, same for category and image obj
    result[0].deal_image = images;
    result[0].deal_image_object = imagesObj;
    result[0].deal_category = categories;

    return result[0];
  },

  acceptedCryptoQuery: result => {
    let acceptedCryptos = [];
    for (let crypto of result) {
      let acceptedCrypto = {};
      let cryptoName = crypto.crypto_name;
      let cryptoSymbol = crypto.crypto_symbol;
      let cryptoLogo = crypto.crypto_logo;

      //create new properties for acceptedCrypto object
      acceptedCrypto.crypto_name = cryptoName; //{crypto_name: "bitcoin"}
      acceptedCrypto.crypto_symbol = cryptoSymbol; //{crypto_name: "bitcoin", crypto_symbol: "btc"}
      acceptedCrypto.crypto_logo = cryptoLogo;

      acceptedCryptos.push(acceptedCrypto);
    }

    return acceptedCryptos;
  },

  sum: (a, b) => {
    return a + b;
  }
};

module.exports = Deal;
