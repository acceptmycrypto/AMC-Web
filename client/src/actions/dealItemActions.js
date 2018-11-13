export function _loadDealItem(deal_name) {
  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return dispatch => {
    dispatch(fetchDealItemBegin());
    return fetch(`http://localhost:3001/api/deals/${deal_name}`, settings)
      .then(res => res.json())
      .then(jsonPhoto => {
        dispatch(fetchDealItemSuccess(jsonPhoto));
        return jsonPhoto;
      })
      .catch(error => dispatch(fetchDealItemFailure(error)));
  };
}

export const fetchDealItemBegin = () => ({
  type: "FETCH_DEAL_ITEM_BEGIN"
});


export const fetchDealItemSuccess = dealItem => ({
  type: "FETCH_DEAL_ITEM_SUCCESS",
  payload: { dealItem }
});

export const fetchDealItemFailure = error => ({
  type: "FETCH_DEAL_ITEM_FAILURE",
  payload: { error }
});
