DROP DATABASE IF EXISTS crypto_db;
CREATE DATABASE crypto_db;

USE crypto_db;

-- add a date timestamp
CREATE TABLE crypto_metadata(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_name VARCHAR(255) NOT NULL UNIQUE,
	crypto_symbol VARCHAR(255) NOT NULL UNIQUE,
	crypto_price DECIMAL(10, 4) NOT NULL,
	updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE crypto_info(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_metadata_name VARCHAR(255) NULL UNIQUE,
	crypto_logo VARCHAR(255) NOT NULL UNIQUE,
	crypto_link VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (crypto_metadata_name) REFERENCES crypto_metadata(crypto_name)
);

CREATE TABLE venues (
	id INT NOT NULL AUTO_INCREMENT,
	venue_name VARCHAR(255) NOT NULL,
	venue_description VARCHAR(255) NOT NULL,
	venue_link VARCHAR(255) NOT NULL,
	accepted_crypto BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id)
);

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	verified_email BOOLEAN DEFAULT FALSE,
	email_verification_token VARCHAR(255) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	first_name VARCHAR(255) NULL,
	last_name VARCHAR (255) NULL,
	phone_number VARCHAR(100) NULL,
  	phone_number_verified BOOLEAN NOT NULL DEFAULT FALSE,
	email VARCHAR(100) NOT NULL UNIQUE,
	previous_email VARCHAR(100) NULL UNIQUE,
	address VARCHAR(255) NULL,
	city VARCHAR(255) NULL,
	state VARCHAR(255) NULL,
	zipcode VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	reset_pw_token VARCHAR(26) NULL,
  	reset_pw_timestamp BIGINT NULL,
	sellers_avg_rating FLOAT(3,2) NOT NULL DEFAULT 0,
	total_sellers_ratings INT NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

-- buying as a guest user will not have their user purchases saved
-- at guest checkout check if already a user
CREATE TABLE guest_users(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL,
	first_name VARCHAR(255) NULL,
	last_name VARCHAR (255) NULL,
	phone_number VARCHAR(100) NULL,
	PRIMARY KEY (id)
);

CREATE TABLE deals (
	id INT NOT NULL AUTO_INCREMENT,
	venue_id INT NULL,
	seller_id INT NULL,
	deal_name VARCHAR(255) NOT NULL,
	deal_description VARCHAR(10000) NOT NULL,
  featured_deal_image VARCHAR(255) NOT NULL,
	pay_in_dollar DECIMAL(10,2) NOT NULL,
	pay_in_crypto DECIMAL(10, 2) NOT NULL,
	date_expired DATETIME NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(255) NULL, -- we need to take this out eventually
	item_condition VARCHAR (255) NULL,
  length INT NULL, -- in inches
	width INT NULL,  -- in inches
	height INT NULL, -- in inches
	weight INT NULL, -- in lb (pounds)
	shipping_label_status VARCHAR(20) NULL, -- prepaid or seller
	shipment_cost DECIMAL(10, 2) NULL, -- USD
  deal_status VARCHAR (10) DEFAULT 'available', -- status: available, sold, reserved (paying item), expired, pending (pending is for deal that's not get displayed due to seller's verification), "deleted"
  -- deal_avg_rating FLOAT(3,2) NULL,
  -- total_deal_ratings INT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (venue_id) REFERENCES venues(id),
	FOREIGN KEY (seller_id) REFERENCES users(id)
);


CREATE TABLE deal_images (
	id INT NOT NULL AUTO_INCREMENT,
  deal_id INT NOT NULL,
  deal_image VARCHAR(255) NOT NULL UNIQUE,
  deal_image_key VARCHAR(255) NULL UNIQUE,
  deal_image_object VARCHAR(10000) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (deal_id) REFERENCES deals(id)
);

CREATE TABLE category (
	id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE parent_child_categories(
	parent_category_id INT NOT NULL,
	child_category_id INT NOT NULL,
	FOREIGN KEY (parent_category_id) REFERENCES category(id),
	FOREIGN KEY (child_category_id) REFERENCES category(id)
);


CREATE TABLE categories_deals(
	category_id INT NOT NULL,
	deals_id INT NOT NULL,
  PRIMARY KEY (category_id, deals_id),
	FOREIGN KEY (category_id) REFERENCES category(id),
	FOREIGN KEY (deals_id) REFERENCES deals(id)
);

CREATE TABLE cryptos_venues (
	crypto_id INT NOT NULL,
	venue_id INT NOT NULL,
	PRIMARY KEY (crypto_id, venue_id),
	FOREIGN KEY (crypto_id)  REFERENCES crypto_metadata(id),
	FOREIGN KEY (venue_id) REFERENCES venues(id)
);

-- create a junction table for many-to-many association
-- sellers will specify the cryptocurrencies they will accept for each individual deal item
CREATE TABLE cryptos_deals (
	crypto_id INT NOT NULL,
	deal_id INT NOT NULL,
	PRIMARY KEY (crypto_id, deal_id),
	FOREIGN KEY (crypto_id)  REFERENCES crypto_metadata(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id)
);

CREATE TABLE users_logins(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	sign_in_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_profiles(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	bio TEXT NULL,
	photo VARCHAR(255) NULL,
	user_location VARCHAR(255) NULL,
	birthday DATE NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_cryptos(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	crypto_id INT NOT NULL,
	crypto_address VARCHAR(255) NULL,
  	crypto_balance DECIMAL(20, 8) NOT NULL DEFAULT 0,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (crypto_id) REFERENCES crypto_info(id)
);

-- keep track of how many times users withdraw
CREATE TABLE cryptos_withdraw(
	id INT NOT NULL AUTO_INCREMENT,
	users_cryptos_id INT NOT NULL,
  	withdraw_token VARCHAR(26) NOT NULL,
  	withdraw_token_timestamp BIGINT NOT NULL,
  	withdraw_amount DECIMAL(20, 8) NULL,
  	coinpayment_withdraw_id VARCHAR(26) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (users_cryptos_id) REFERENCES users_cryptos(id)
);


CREATE TABLE buyers_reviews_sellers(
	id INT NOT NULL AUTO_INCREMENT,
	buyer_id INT NOT NULL,
	seller_id INT NOT NULL,
	deal_id INT NOT NULL,
	rating INT NOT NULL DEFAULT 0,
	title VARCHAR (255) NOT NULL,
	body TEXT NULL,
	likes INT DEFAULT 0,
	dislikes INT DEFAULT 0,
	helpful_review INT DEFAULT 0,
	date_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	display_review BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (buyer_id) REFERENCES users(id),
	FOREIGN KEY (seller_id) REFERENCES users(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id)
);

CREATE TABLE users_purchases(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NULL,
	guest_user_id INT NULL,
	deal_id INT NOT NULL,
	crypto_id INT NULL,
  buyers_reviews_sellers_id INT NULL,
	date_purchased TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	amount DECIMAL(20, 8) NULL,
	txn_id VARCHAR(255) NULL UNIQUE,
	address VARCHAR(255) NULL,
	confirms_needed VARCHAR(255) NULL,
	timeout INT NULL,
	status_url VARCHAR(255) NULL,
	qrcode_url VARCHAR(255) NULL,
  status VARCHAR(255) NULL DEFAULT "0",
	payment_received BOOLEAN NULL DEFAULT FALSE,
  paypal_paymentId VARCHAR(255) NULL UNIQUE,
  paypal_payerId VARCHAR(255) NULL,
  paypal_amount DECIMAL(10,2) NULL,
	permission VARCHAR(255) NOT NULL DEFAULT "community",
	shipment_date VARCHAR (255) NULL,
	shipping_label_url VARCHAR(500) NULL, -- if prepaid this is link to shipping label
	shippo_shipment_price DECIMAL (10,2) NULL,
  shipping_fee_crypto_amount DECIMAL(20, 8) NULL,
	tracking_number VARCHAR(255) NULL UNIQUE, -- shipment tracking number
	tracking_carrier VARCHAR (100) NULL,
	tracking_status VARCHAR(100) NULL,
	tracking_url_provider VARCHAR (500) NULL, -- link to track package online
	eta VARCHAR (255) NULL,
	shippo_shipment_id VARCHAR(255) NULL,
	shippo_transaction_id VARCHAR(255) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (guest_user_id) REFERENCES guest_users(id),
	FOREIGN KEY (crypto_id) REFERENCES crypto_info(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id),
  	FOREIGN KEY (buyers_reviews_sellers_id) REFERENCES buyers_reviews_sellers(id)
);

CREATE TABLE users_tracking_info(
	id INT NOT NULL AUTO_INCREMENT,
	tracking_number VARCHAR(255) NULL,
	tracking_status VARCHAR(100) NULL,
	status_details VARCHAR(255) NULL,
	status_date VARCHAR(255) NULL,
	eta VARCHAR (255) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (tracking_number) REFERENCES users_purchases(tracking_number)

);

CREATE TABLE users_shipping_address(
	id INT NOT NULL AUTO_INCREMENT,
	txn_id VARCHAR(255) NULL,
  users_purchases_id INT NULL,
	shipping_firstname VARCHAR(255) NOT NULL,
  	shipping_lastname VARCHAR(255) NOT NULL,
	shipping_address VARCHAR(255) NOT NULL,
	shipping_city VARCHAR(255) NOT NULL,
	shipping_state VARCHAR(255) NOT NULL,
	shipping_zipcode VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (txn_id) REFERENCES users_purchases(txn_id),
  FOREIGN KEY (users_purchases_id) REFERENCES users_purchases(id)
);

CREATE TABLE users_purchase_customization(
	id INT NOT NULL AUTO_INCREMENT,
	txn_id VARCHAR(255) NOT NULL,
	color VARCHAR(255) NULL,
	size VARCHAR(255) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (txn_id) REFERENCES users_purchases(txn_id)
);

CREATE TABLE users_matched_friends(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	matched_friend_id INT NOT NULL,
	date_matched TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_accepted BOOLEAN NOT NULL DEFAULT FALSE,
	both_accepted BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (matched_friend_id) REFERENCES users(id)
);

CREATE TABLE crypto_comments(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	crypto_id INT NOT NULL,
	body TEXT NOT NULL,
	date_commented TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	comment_status VARCHAR (10) DEFAULT 'normal',
	points INT DEFAULT 0,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (crypto_id) REFERENCES crypto_info(id)
);

CREATE TABLE parents_children(
	comment_parent_id INT NOT NULL,
	comment_child_id INT NOT NULL,
	FOREIGN KEY (comment_parent_id) REFERENCES crypto_comments(id),
	FOREIGN KEY (comment_child_id) REFERENCES crypto_comments(id)
);

CREATE TABLE notifications (
	id INT NOT NULL AUTO_INCREMENT,
	unread BOOLEAN NOT NULL DEFAULT TRUE,
	user_id INT NOT NULL,
	matched_friend_id INT NOT NULL,
	venue_id INT NOT NULL,
	deal_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (matched_friend_id) REFERENCES users_matched_friends(id),
	FOREIGN KEY (venue_id) REFERENCES venues(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id)
);

CREATE TABLE sellers_reviews_buyers(
	id INT NOT NULL AUTO_INCREMENT,
	buyer_id INT NOT NULL,
	seller_id INT NOT NULL,
	rating INT NOT NULL DEFAULT 0,
	body TEXT NULL,
	date_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (buyer_id) REFERENCES users(id),
	FOREIGN KEY (seller_id) REFERENCES users(id)
);


CREATE TABLE flagged_users(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NULL,
	venue_id INT NULL,
	user_reporter INT NULL,
	venue_reporter INT NULL,
	deal_id INT NULL,
	review_id INT NULL,
	txn_id VARCHAR(255) NULL,
	reason VARCHAR(255) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (venue_id) REFERENCES venues(id),
	FOREIGN KEY (user_reporter) REFERENCES users(id),
	FOREIGN KEY (venue_reporter) REFERENCES venues(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id),
	FOREIGN KEY (review_id) REFERENCES buyers_reviews_sellers(id),
	FOREIGN KEY (txn_id) REFERENCES users_purchases(txn_id)
);

CREATE TABLE chat_sessions(
	id INT NOT NULL AUTO_INCREMENT,
  	deal_id INT NOT NULL,
  	session_status VARCHAR (10) DEFAULT 'normal',
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
  FOREIGN KEY (deal_id) REFERENCES deals(id)
);

-- participant_status is 'normal', 'deleted', or 'blocked'
CREATE TABLE chat_session_participants(
	id INT NOT NULL AUTO_INCREMENT,
  	chat_session_id INT NOT NULL,
  	user_id INT NOT NULL,
  	seller_id INT NOT NULL,
  	buyer_id INT NOT NULL,
  	participant_status VARCHAR (10) DEFAULT 'normal',
	date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	message_read BOOLEAN NOT NULL DEFAULT TRUE,
	PRIMARY KEY (id),
  	FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
  	FOREIGN KEY (seller_id) REFERENCES users(id),
  	FOREIGN KEY (buyer_id) REFERENCES users(id)
);

CREATE TABLE chat_messages(
	id INT NOT NULL AUTO_INCREMENT,
	chat_session_id INT NOT NULL,
	message VARCHAR(255) NOT NULL,
  	message_status VARCHAR (10) DEFAULT 'normal',
	date_message_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	message_owner_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (chat_session_id) REFERENCES chat_sessions(id)
);

-- table to be used in the future
-- custom options to be displayed when user is listing an item to sell eg. size, color, model etc based on the categoryies of the item
-- CREATE TABLE customizable_option(
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	custom_option_name VARCHAR(100) NOT NULL,
-- 	PRIMARY KEY (id)
-- );

-- table to be used in the future
-- many to many relationship table
-- CREATE TABLE categories_customizable_options(
-- 	category_id INT NOT NULL,
-- 	custom_option_id INT NOT NULL,
-- 	FOREIGN KEY (category_id) REFERENCES category(id),
-- 	FOREIGN KEY (custom_option_id) REFERENCES customizable_option(id)
-- );

-- table to be used in the future
-- CREATE TABLE hashtag (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	hashtag_name VARCHAR(100) NOT NULL,
-- 	PRIMARY KEY (id)
-- );

-- table to be used in the future
-- many to many relationship table
-- CREATE TABLE hashtags_deals(
-- 	hashtag_id INT NOT NULL,
-- 	deals_id INT NOT NULL,
-- 	FOREIGN KEY (hashtag_id) REFERENCES hashtag(id),
-- 	FOREIGN KEY (deals_id) REFERENCES deals(id)
-- );


-- CREATE TABLE notifications (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	unread BOOLEAN NOT NULL DEFAULT TRUE,
-- 	user_id INT NOT NULL,
-- 	matched_friend_id INT NOT NULL,
-- 	venue_id INT NOT NULL,
-- 	deal_id INT NOT NULL,
--   	PRIMARY KEY (id),
-- 	FOREIGN KEY (user_id) REFERENCES users(id),
-- 	FOREIGN KEY (matched_friend_id) REFERENCES users_matched_friends(id),
-- 	FOREIGN KEY (venue_id) REFERENCES venues(id),
-- 	FOREIGN KEY (deal_id) REFERENCES deals(id)
-- );

-- table to be used in the future

-- CREATE TABLE buyers_reviews_deals (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	buyer_id INT NOT NULL,
-- 	deal_id INT NOT NULL,
-- 	title VARCHAR (255) NOT NULL,
-- 	body TEXT NULL,
--   	date_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	rating INT NOT NULL DEFAULT 0,
-- 	verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
-- 	likes INT DEFAULT 0,
-- 	dislikes INT DEFAULT 0,
-- 	helpful_review INT DEFAULT 0,
-- 	display_review BOOLEAN NOT NULL DEFAULT FALSE,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (buyer_id) REFERENCES users(id),
-- 	FOREIGN KEY (deal_id) REFERENCES deals(id)
-- );

-- table to be used in the future
-- many to many relationship table

-- CREATE TABLE parents_children_deals_reviews(
-- 	review_parent_id INT NOT NULL,
-- 	review_child_id INT NOT NULL,
-- 	FOREIGN KEY (review_parent_id) REFERENCES buyers_reviews_deals(id),
-- 	FOREIGN KEY (review_child_id) REFERENCES buyers_reviews_deals(id)
-- );

-- may not need this table if we have the flagged users table
-- CREATE TABLE sellers_reviews_buyers(
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	buyer_id INT NOT NULL,
-- 	seller_id INT NOT NULL,
-- 	rating INT NOT NULL DEFAULT 0,
-- 	body TEXT NULL,
-- 	date_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (buyer_id) REFERENCES users(id),
-- 	FOREIGN KEY (seller_id) REFERENCES users(id)
-- );

-- CREATE TABLE userInput (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	user_email VARCHAR(255) NOT NULL UNIQUE,
-- 	crypto_name VARCHAR(255) NOT NULL UNIQUE,
-- 	venue VARCHAR(255) NOT NULL UNIQUE,
-- 	venue_link VARCHAR(255) NOT NULL UNIQUE,
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE userQueries (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	email VARCHAR(255) NOT NULL UNIQUE,
-- 	message VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE admin_users (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	email VARCHAR(255) UNIQUE,
-- 	password VARCHAR(255) NOT NULL UNIQUE,
-- 	PRIMARY KEY (id)
-- );

-- CREATE TABLE customizable_option(
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	custom_option_name VARCHAR(100) NOT NULL,
-- 	PRIMARY KEY (id)
-- );


-- CREATE TABLE categories_customizable_options(
-- 	category_id INT NOT NULL,
-- 	custom_option_id INT NOT NULL,
-- 	FOREIGN KEY (category_id) REFERENCES category(id),
-- 	FOREIGN KEY (custom_option_id) REFERENCES customizable_option(id)
-- );


-- CREATE TABLE hashtag (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	hashtag_name VARCHAR(100) NOT NULL,
-- 	PRIMARY KEY (id)
-- );


-- CREATE TABLE hashtags_deals(
-- 	hashtag_id INT NOT NULL,
-- 	deals_id INT NOT NULL,
-- 	FOREIGN KEY (hashtag_id) REFERENCES hashtag(id),
-- 	FOREIGN KEY (deals_id) REFERENCES deals(id)
-- );

-- CREATE TABLE buyers_reviews_deals (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	buyer_id INT NOT NULL,
-- 	deal_id INT NOT NULL,
-- 	title VARCHAR (255) NOT NULL,
-- 	body TEXT NULL,
--   	date_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	rating INT NOT NULL DEFAULT 0,
-- 	verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
-- 	likes INT DEFAULT 0,
-- 	dislikes INT DEFAULT 0,
-- 	helpful_review INT DEFAULT 0,
-- 	display_review BOOLEAN NOT NULL DEFAULT FALSE,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (buyer_id) REFERENCES users(id),
-- 	FOREIGN KEY (deal_id) REFERENCES deals(id)
-- );


-- CREATE TABLE parents_children_deals_reviews(
-- 	review_parent_id INT NOT NULL,
-- 	review_child_id INT NOT NULL,
-- 	FOREIGN KEY (review_parent_id) REFERENCES buyers_reviews_deals(id),
-- 	FOREIGN KEY (review_child_id) REFERENCES buyers_reviews_deals(id)
-- );


-- CREATE TABLE shipping_deals(
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	deal_id INT NOT NULL,
-- 	length INT NULL, --in inches
-- 	width INT NULL, --in inches
-- 	height INT NULL, --in inches
-- 	weight INT NULL, -- in lb (pounds)
-- 	shipping_label_status VARCHAR(20) NULL, --prepaid or seller
-- 	shipment_cost DECIMAL(10, 2) NULL, -- USD,
-- 	shipment_date VARCHAR (255) NULL,
-- 	shipping_label_url VARCHAR(500) NULL, -- if prepaid this is link to shipping label
-- 	shippo_shipment_price DECIMAL (10,2) NULL,
-- 	tracking_number VARCHAR(255) NULL, -- shipment tracking number
-- 	tracking_status VARCHAR(100) NULL,
-- 	tracking_url_provider VARCHAR (500) NULL, -- link to track package online
-- 	eta VARCHAR (255) NULL,
-- 	shippo_shipment_id VARCHAR(255) NULL,
-- 	shippo_transaction_id VARCHAR(255) NULL,
-- 	PRIMARY KEY (id),
-- 	FOREIGN KEY (deal_id) REFERENCES deals(id)
-- );