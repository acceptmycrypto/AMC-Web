export const FETCH_REVIEWS_BEGIN = "FETCH_REVIEWS_BEGIN";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";

export function _loadReviews(seller_id) {
  console.log('load reviews');
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
      debugger
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
