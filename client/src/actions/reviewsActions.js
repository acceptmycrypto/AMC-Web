export const FETCH_REVIEWS_BEGIN = "FETCH_REVIEWS_BEGIN";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";
export const REVIEW_SELLER_BEGIN = "REVIEW_SELLER_BEGIN";
export const REVIEW_SELLER_SUCCESS = "REVIEW_SELLER_SUCCESS";
export const REVIEW_SELLER_FAILURE = "REVIEW_SELLER_FAILURE";
export const SELECT_TRANSACTION = "SELECT_TRANSACTION";

export function _loadReviews(seller_id) {
  const Reviews = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ token }) //no need to pass in token since everyone (signed in or not) should be able to see reviews
  };

  return dispatch => {
    dispatch(fetchReviewsBegin());
    return fetch(`/api/reviews/sellers/${seller_id}`)
    .then(res => res.json())
    .then(resJson => {
      dispatch(fetchReviewsSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchReviewsFailure(error)));
  };
}

export const fetchReviewsBegin = () => ({
  type: FETCH_REVIEWS_BEGIN
});

export const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: { reviews }
});

export const fetchReviewsFailure = error => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: { error }
});

export const selectTransaction =(soldBy) => ({
  type: SELECT_TRANSACTION,
  payload: { soldBy }
});

export function _reviewSeller(token, seller_id, deal_id, rating, review_body) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token,  seller_id, deal_id, rating, review_body})
  };

  return dispatch => {
    dispatch(reviewSellerBegin());
    return fetch("/seller-review/new", settings)
    .then(res => res.json())
    .then(resJson => {
      debugger
      dispatch(reviewSellerSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(reviewSellerError(error)));
  };
}

export const reviewSellerBegin = () => ({
  type: REVIEW_SELLER_BEGIN
});

export const reviewSellerSuccess = (newReview) => ({
  type: REVIEW_SELLER_SUCCESS,
  payload: { newReview }
});

export const reviewSellerError = error => ({
  type: REVIEW_SELLER_FAILURE,
  payload: { error }
});
