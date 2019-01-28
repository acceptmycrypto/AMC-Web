export const ADD_MESSAGE = "ADD_MESSAGE";

// export function _loadReviews(seller_id) {
//   const Reviews = {
//     method: "GET",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//     },
//     // body: JSON.stringify({ token }) //no need to pass in token since everyone (signed in or not) should be able to see reviews
//   };

//   return dispatch => {
//     dispatch(fetchReviewsBegin());
//     return fetch(`/api/reviews/sellers/${seller_id}`)
//     .then(res => res.json())
//     .then(resJson => {
//       dispatch(fetchReviewsSuccess(resJson));
//       return resJson;
//     })
//     .catch(error => dispatch(fetchReviewsFailure(error)));
//   };
// }


export const fetchReviewsBegin = () => ({
  type: FETCH_REVIEWS_BEGIN
});

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
})

