-- buyers reviews sellers
INSERT INTO buyers_reviews_sellers (buyer_id, seller_id, deal_id, rating, body) VALUES ('1','2','1','5','this is a test review');

INSERT INTO buyers_reviews_sellers (buyer_id, seller_id, deal_id, rating, body) VALUES ('1','2','2','3','this is a test review 2');

INSERT INTO buyers_reviews_sellers (buyer_id, seller_id, deal_id, rating, body) VALUES ('1','2','3','3','this is a test review 3');

INSERT INTO buyers_reviews_sellers (buyer_id, seller_id, deal_id, rating, body) VALUES ('1','2','4','1','this is a test review 4');

INSERT INTO buyers_reviews_sellers (buyer_id, seller_id, deal_id, rating, body) VALUES ('1','2','5','2','this is a test review 5');


-- sellers reviews buyers
INSERT INTO sellers_reviews_buyers (buyer_id, seller_id, rating, body) VALUES ('2','1','5','this is a test seller rev 1');

INSERT INTO sellers_reviews_buyers (buyer_id, seller_id, rating, body) VALUES ('2','6','4','this is a test seller rev 2');

INSERT INTO sellers_reviews_buyers (buyer_id, seller_id, rating, body) VALUES ('2','5','3','this is a test seller rev 3');

INSERT INTO sellers_reviews_buyers (buyer_id, seller_id, rating, body) VALUES ('2','4','2','this is a test seller rev 4');

INSERT INTO sellers_reviews_buyers (buyer_id, seller_id, rating, body) VALUES ('2','3','1','this is a test seller rev 5');
