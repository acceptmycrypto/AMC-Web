all ideas from amazon


add avg rating to individual deals that is calculated from reviews TABLE

add # of reviews to individual deals?

a general breakdown of reviews (how many 1 star, 2 stars etc.)

a way to sort reviews (top reviews + most recent)
    - top does not mean 5 stars, it should be most helpful/useful reviews

a way for other users to thumbs up/thumbs down review?

Q's: SET vs ENUM

CREATE TABLE reviews(
    user_id INT,
    deal_id INT NOT NULL,
    stars ,
    comments TEXT,
    useful rating etc.....
);

SELECT *, AVG(stars) AS Average_Rating FROM reviews where deal_id = ? 

'AVG(buyers_reviews_deals.rating) AS Average_Rating'

need to join users table to get user name from user_id

routes needed
1) when user hits front deal page, that route will need to fetch avg rating and # of reviews for that item and add it to the object to be returned to front end as well (modify current route)
    - add AVG(stars) AS Average_Rating FROM reviews for each deals
2) when users look at a specific deal, that route needs to return all the reviews relevant to that deal (modify current route)

3) when users submit a review, they submit a star rating and comments, we get their usernames (new route)
    - need to solve anonymous buyers (just list as anonymous?)
    - how to verify anonymous user has indeed purchased item? maybe anonymous users cannot leave reviews (or at least comments), or use their emails....
4) 



Social Sharing
    - buttons on deals' pages that says "Share to FB"
    - after purchase have default option to "Share your Purchase Online"



Q's:
    - shipping address question: 



INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('1','1','this is amazing','some random body content for testing','5');

INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('2','1','this is bad','some random body content for testing 2','4');

INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('3','1','this is 2','some random body content for testing 3','3');

INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('4','1','this is 4','some random body content for testing 4','3');

INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('5','1','this is 5','some random body content for testing 5','2');

INSERT INTO buyers_reviews_deals (buyer_id, deal_id, title, body, rating) VALUES ('6','1','this is 6','some random body content for testing 6','1');


rating of 0 = null, means no reviews yet

when a deal is inserted, it must also insert a dummy row into buyers_reviews_deals
each deal must have a row in buyers_reviews_deals

should I add an avg rating in deals table or leave it completely separate

SELECT buyers_reviews_deals.deal_id, ROUND(AVG(rating),1) AS Average_Rating FROM buyers_reviews_deals; 

UPDATE deals
INNER JOIN buyers_reviews_deals ON buyers_reviews_deals.deal_id = deals.id
SET deals.avg_rating = (SELECT ROUND(AVG(rating),1) AS Average_Rating FROM buyers_reviews_deals WHERE buyers_reviews_deals.deal_id = '1')


-----not needed
LEFT JOIN buyers_reviews_deals ON buyers_reviews_deals.deal_id = deals.id 
------

add column avg_rating, num_ratings to deals TABLE

TABLE STRUCTURE/flow
- add avg_rating to deals table (default is 0, which means no reviews, front end code needs to reflect that)
    - in api/deals route add 'deals.avg_rating' 
- add number of ratings for that deal for each deal
    - SELECT COUNT(buyers_reviews_deals.id) FROM buyers_reviews_deals WHERE deal_id = 1 AND display_review = 1
- ALL users review is insert into buyers_reviews_deals TABLE
    - title + content are scanned after insert 
    - if pass, update display_review to true
        - else insert into flagged user
- avg_rating and num_ratings is updated every time a user review is passed for that particular deal with the following:
        UPDATE deals
        INNER JOIN buyers_reviews_deals ON buyers_reviews_deals.deal_id = deals.id
        SET deals.avg_rating = (SELECT ROUND(AVG(rating),1) AS Average_Rating FROM buyers_reviews_deals WHERE buyers_reviews_deals.deal_id = '1')
        , deals.num_ratings = (SELECT COUNT(buyers_reviews_deals.id) FROM buyers_reviews_deals WHERE deal_id = 1 AND display_review = 1)
- go back to 1st step