export function _loadDeals(token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  return dispatch => {
    dispatch(fetchDealsBegin());
    return fetch("/api/deals", settings)
      .then(res => res.json())
      .then(jsonDeals => {
        dispatch(fetchDealsSuccess(jsonDeals));
        return jsonDeals;
      })
      .catch(error => dispatch(fetchDealsFailure(error)));
  };
}

export const fetchDealsBegin = () => ({
  type: "FETCH_DEALS_BEGIN"
});

export const fetchDealsSuccess = deals => ({
  type: "FETCH_DEALS_SUCCESS",
  payload: { deals }
});

export const fetchDealsFailure = error => ({
  type: "FETCH_DEALS_FAILURE",
  payload: { error }
});
