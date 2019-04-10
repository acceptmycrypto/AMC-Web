"use strict";

const database = require("../model/dbconnection");
const Deal = require("../util/deal");

//display detail page for a specific deal
exports.deal_detail_get = (req, res) => {

  let deal_query =
    "SELECT deals.id AS deal_id, deals.seller_id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.deal_status, deals.pay_in_crypto, deals.date_expired, deals.date_created, deals.item_condition, deals.weight, deals.shipping_label_status, deals.shipment_cost, deal_images.deal_image, deal_images.deal_image_object, users.id AS seller_id, users.username AS seller_name, users.sellers_avg_rating, users.total_sellers_ratings, users.phone_number_verified, category.category_name AS deal_category FROM deals LEFT JOIN deal_images ON deals.id = deal_images.deal_id LEFT JOIN users ON deals.seller_id = users.id LEFT JOIN categories_deals ON deals.id = categories_deals.deals_id LEFT JOIN category ON category.id = categories_deals.category_id WHERE deals.id = ? AND deals.deal_status <> ?";

  let acceptedCrypto_query =
    "SELECT * FROM cryptos_deals LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_deals.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE cryptos_deals.deal_id = ?";

  let deal_query_result, acceptedCrypto_result;

  //this is the array we pass to the client
  let dealItem = [];

  database
    .query(deal_query, [req.params.deal_id, "deleted"])
    .then(results => {
      deal_query_result = Deal.dealItemQuery(results);
      dealItem.push(deal_query_result);

      return database.query(acceptedCrypto_query, [req.params.deal_id]);
    })
    .then(results => {
      acceptedCrypto_result = Deal.acceptedCryptoQuery(results);
      dealItem.push(acceptedCrypto_result);
      res.json(dealItem);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};

//handle deal create on POST
exports.deal_create_post = (req, res) => {};
