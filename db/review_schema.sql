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

