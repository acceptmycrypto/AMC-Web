-- Create a fake user to list these items
INSERT INTO users (verified_email, email_verification_token, username, first_name, last_name, phone_number_verified, email, password, address, city, state, zipcode) VALUES
(1, "893b5842-99dc-4ddd-bdd1-a86fb5003703", "AcceptMyCrypto", "Simon", "Nguyen", 1, "soldseller@acceptmycrypto.com", "3hDdhjasd*3ads83p", "123 Ave St", "San Francisco", "CA", "12345");

INSERT INTO users_profiles (user_id, photo) VALUES
(1, "fa-user-secret");

-- Deal # 1 ----------------------------------------------------------------
-- Apparel & Accessories

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
-- Luxury

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
(2,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551740943525.jpg",
"dealsImages/user_id-2/1551740943525.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551740943525.jpg","key":"dealsImages/user_id-2/1551740943525.jpg","Key":"dealsImages/user_id-2/1551740943525.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(2,7);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(2,2);

-- Deal # 3 ----------------------------------------------------------------
-- movies music games

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
(3,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551741570885.jpg",
"dealsImages/user_id-2/1551741570885.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551741570885.jpg","key":"dealsImages/user_id-2/1551741570885.jpg","Key":"dealsImages/user_id-2/1551741570885.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(3,3);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(3,2);

-- Deal # 4 ----------------------------------------------------------------
-- Electronics, Computers & Office

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"iPhone XR Red 64gb",
'{"blocks":[{"key":"9lcs","text":"iPhone XR Red 64gb","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551742824972.jpg",
749.99,
599.99,
"Used",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(4,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551742824972.jpg",
"dealsImages/user_id-2/1551742824972.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551742824972.jpg","key":"dealsImages/user_id-2/1551742824972.jpg","Key":"dealsImages/user_id-2/1551741570885.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(4,4);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(4,2);


-- Deal # 5 ----------------------------------------------------------------
-- Home, Garden & Tools

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Evergreen Garden Cardinal Flight Color-Changing Plastic Solar Powered Outdoor Mobile Wind Chime - 5”W x 5”D x 26.5”H",
'{"blocks":[{"key":"9lcs","text":"Evergreen Garden Cardinal Flight Color-Changing Plastic Solar Powered Outdoor Mobile Wind Chime - 5”W x 5”D x 26.5”H","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745411712.jpg",
24.49,
12.24,
"Used",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(5,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745411712.jpg",
"dealsImages/user_id-2/1551745411712.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745411712.jpg","key":"dealsImages/user_id-2/1551745411712.jpg","Key":"dealsImages/user_id-2/1551745411712.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(5,5);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(5,2);

-- Deal # 6 ----------------------------------------------------------------
-- Pet Supplies

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"ihreesy Handmade Cotton Weaving Pet Houses for Dog(Puppy) and Cats",
'{"blocks":[{"key":"9lcs","text":"ihreesy Handmade Cotton Weaving Pet Houses for Dog(Puppy) and Cats","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745679773.jpg",
23.99,
17.51,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(6,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745679773.jpg",
"dealsImages/user_id-2/1551745679773.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551745679773.jpg","key":"dealsImages/user_id-2/1551745679773.jpg","Key":"dealsImages/user_id-2/1551745679773.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(6,6);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(6,2);

-- Deal # 7 ----------------------------------------------------------------
-- Health & Beauty

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Red Lipstick Classic Makeup",
'{"blocks":[{"key":"9lcs","text":"Red Lipstick Classic Makeup","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746046023.jpg",
14.99,
13.49,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(7,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746046023.jpg",
"dealsImages/user_id-2/1551746046023.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746046023.jpg","key":"dealsImages/user_id-2/1551746046023.jpg","Key":"dealsImages/user_id-2/1551746046023.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(7,8);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(7,2);

-- Deal # 8 ----------------------------------------------------------------
-- Automotive & Industrial

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Ice Cream Truck",
'{"blocks":[{"key":"9lcs","text":"Ice Cream Truck","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746313042.jpg",
20000,
15000,
"Used",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(8,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746313042.jpg",
"dealsImages/user_id-2/1551746313042.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551746313042.jpg","key":"dealsImages/user_id-2/1551746313042.jpg","Key":"dealsImages/user_id-2/1551746313042.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(8,11);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(8,2);


-- Deal # 9 ----------------------------------------------------------------
-- Toys, Kids & Baby

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Monopoly Board Game",
'{"blocks":[{"key":"9lcs","text":"Monopoly Board Game","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752565268.jpg",
20.00,
10.00,
"Used",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(9,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752565268.jpg",
"dealsImages/user_id-2/1551752565268.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752565268.jpg","key":"dealsImages/user_id-2/1551752565268.jpg","Key":"dealsImages/user_id-2/1551752565268.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(9,9);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(9,2);

-- Deal # 10 ----------------------------------------------------------------
-- Sports & Outdoors

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Elite Boxing Gloves Training",
'{"blocks":[{"key":"9lcs","text":"Elite Boxing Gloves Training","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752896847.jpg",
100.00,
70.00,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(10,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752896847.jpg",
"dealsImages/user_id-2/1551752896847.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551752896847.jpg","key":"dealsImages/user_id-2/1551752896847.jpg","Key":"dealsImages/user_id-2/1551752896847.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(10,10);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(10,2);

-- Deal # 11 ----------------------------------------------------------------
-- Services

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"City Famous Nail Salon",
'{"blocks":[{"key":"9lcs","text":"City Famous Nail Salon","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753323223.jpg",
40,
20,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(11,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753323223.jpg",
"dealsImages/user_id-2/1551753323223.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753323223.jpg","key":"dealsImages/user_id-2/1551753323223.jpg","Key":"dealsImages/user_id-2/1551753323223.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(11,12);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(11,2);


-- Deal # 12 ----------------------------------------------------------------
-- Charity

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"Feed The Children Donation",
'{"blocks":[{"key":"9lcs","text":"Feed The Children Donation","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753700424.jpg",
100,
75,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(12,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753700424.jpg",
"dealsImages/user_id-2/1551753700424.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551753700424.jpg","key":"dealsImages/user_id-2/1551753700424.jpg","Key":"dealsImages/user_id-2/1551753700424.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(12,13);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(12,2);

-- Deal # 13 ----------------------------------------------------------------
-- Books & Audible

INSERT INTO deals (seller_id, deal_name, deal_description, featured_deal_image, pay_in_dollar, pay_in_crypto, item_condition, length, width, height, shipping_label_status, deal_status) VALUES
(1,
"The Age of Cryptocurrency",
'{"blocks":[{"key":"9lcs","text":"The Age of Cryptocurrency","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551754128418.jpg",
20,
10,
"New",
10,
10,
10,
"seller",
"sold");

-- Image
INSERT INTO deal_images (deal_id, deal_image, deal_image_key, deal_image_object) VALUES
(13,"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551754128418.jpg",
"dealsImages/user_id-2/1551754128418.jpg",
'{"ETag":"2e678bc7f1c9e00aba62ddd5b8d2d87d","Location":"https://acceptmycrypto.s3.us-west-1.amazonaws.com/dealsImages/user_id-2/1551754128418.jpg","key":"dealsImages/user_id-2/1551754128418.jpg","Key":"dealsImages/user_id-2/1551754128418.jpg","Bucket":"acceptmycrypto"}'
);

INSERT INTO categories_deals (deals_id, category_id) VALUES
(13,2);

INSERT INTO cryptos_deals (deal_id, crypto_id) VALUES
(13,2);