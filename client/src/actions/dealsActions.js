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

export const editTrackingNumber = event => ({
  type: "EDIT_TRACKING_NUMBER",
  payload: event.target.value
});

export const editTrackingCarrier = selectedOptions => {
  return {
    type: "EDIT_TRACKING_CARRIER",
    payload: selectedOptions.value
  }
};


export function updateTrackingNumber(token, txn_id, trackingNumber, trackingCarrier) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, txn_id, trackingNumber, trackingCarrier})
  };

  return dispatch => {
    dispatch(trackingNumberBegin());
    return fetch("/update_tracking_number", settings)
      .then(res => res.json())
      .then(jsonRes => {
        dispatch(trackingNumberSuccess(jsonRes));
        return jsonRes;
      })
      .catch(error => dispatch(trackingNumberFailure(error)));
  };
}

export const trackingNumberBegin = () => ({
  type: "UPDATE_TRACKING_NUMBER_BEGIN"
});

export const trackingNumberSuccess = res => ({
  type: "UPDATE_TRACKING_NUMBER_SUCCESS",
  payload: res
});

export const trackingNumberFailure = error => ({
  type: "UPDATE_TRACKING_NUMBER_FAILURE",
  payload: { error }
});