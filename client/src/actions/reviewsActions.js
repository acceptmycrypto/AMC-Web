export const FETCH_REVIEWS_BEGIN = "FETCH_REVIEWS_BEGIN";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";

export function _loadReviews(token, seller_id) {
  console.log('load reviews');
  const Reviews = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token })
  };

  return dispatch => {
    console.log('load reviews 2');
    dispatch(fetchReviewsBegin());
    console.log('load reviews 3');
    return fetch(`/api/reviews/sellers/${seller_id}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
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

// export const changeTxHistoryView = (event, new_tx_state, token) =>{
//      event.preventDefault();

//      const settings = {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({token})
//     };
  
//     return dispatch => {
//       dispatch(fetchTransactionsBegin());
//       return fetch("/profile/user/transactions", settings)
//         .then((res) => res.json())
//         .then((transactions) => {
//           if (transactions !== undefined && transactions.length > 0) {
//             let confirmed = transactions.filter(order => order.payment_received === 1);
//             let pending = transactions.filter(order => order.payment_received === 0);
//             return([transactions, confirmed, pending]);
            
//           }else{
//             let confirmed  = [];
//             let pending = [];
//             return([transactions, confirmed, pending]);
//           }
//         }).then(([transactions, confirmed, pending])=>{

//           console.log(transactions, confirmed, pending, new_tx_state);
  
//           dispatch(fetchTransactionsSuccess(transactions, confirmed, pending, new_tx_state));
//           return (transactions, confirmed, pending, new_tx_state);
//         })
//         .catch(error => dispatch(fetchTransactionsFailure(error)));
//     };
// }

// export const fetchTransactionsBegin = () => ({
//   type: FETCH_TRANSACTIONS_BEGIN
// });

// export const fetchTransactionsSuccess = (transactions, confirmed, pending, tx_history_view) => ({
//   type: FETCH_TRANSACTIONS_SUCCESS,
//   payload: { transactions, confirmed, pending, tx_history_view }
// });

// export const fetchTransactionsFailure = error => ({
//   type: FETCH_TRANSACTIONS_FAILURE,
//   payload: { error }
// });