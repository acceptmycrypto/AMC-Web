-- Create a fake user to list these items
INSERT INTO users (verified_email, email_verification_token, username, first_name, last_name, phone_number_verified, email, password, address, city, state, zipcode) VALUES
(1, "893b5842-99dc-4ddd-bdd1-a86fb5003703", "AcceptMyCrypto", "Simon", "Nguyen", 1, "sampleseller@acceptmycrypto.com", "3hDdhjasd*3ads83p", "123 Ave St", "San Francisco", "CA", "12345");

INSERT INTO users_profiles (user_id, photo) VALUES
(1, "fa-user-secret");

-- Deal # 1 ----------------------------------------------------------------

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Adorable Baby Boy Hat",
'{"blocks":[{"key":"9lcs","text":"Adorable Baby Boy Hat","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-1/1551731654957.jpg",
35.00,
29.75,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(1,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-1/1551731654957.jpg",
"dealsImages/user_id-1/1551731654957.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-1/1551731654957.jpg","key":"dealsImages/user_id-1/1551731654957.jpg","Key":"dealsImages/user_id-1/1551731654957.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(1,1);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(1,2);

-- Deal # 2 ----------------------------------------------------------------

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"GG Marmont matelassé mini bag",
'{"blocks":[{"key":"9lcs","text":"GG Marmont matelassé mini bag","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551740943525.jpg",
980.00,
686.75,
"Used",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(1,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551740943525.jpg",
"dealsImages/user_id-2/1551740943525.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551740943525.jpg","key":"dealsImages/user_id-2/1551740943525.jpg","Key":"dealsImages/user_id-2/1551740943525.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(2,7);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(2,2);

-- Deal # 3 ----------------------------------------------------------------

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Sony PlayStation Vita WiFi [PlayStation Vita]",
'{"blocks":[{"key":"9lcs","text":"Sony PlayStation Vita WiFi [PlayStation Vita]","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551741570885.jpg",
265.00,
238.50,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(1,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551741570885.jpg",
"dealsImages/user_id-2/1551741570885.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551741570885.jpg","key":"dealsImages/user_id-2/1551741570885.jpg","Key":"dealsImages/user_id-2/1551741570885.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(2,3);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(2,2);
