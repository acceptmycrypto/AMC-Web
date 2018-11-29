export function _loadCryptosRanking() {
  const cryptosRankingSettings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return dispatch => {
    dispatch(fetchCryptosBegin());
    return fetch("/api/cryptosranking_venues", cryptosRankingSettings)
      .then(res => res.json())
      .then(jsonCryptos => {
        dispatch(fetchCryptosSuccess(jsonCryptos));
        return jsonCryptos;
      })
      .catch(error => dispatch(fetchCryptosFailure(error)));
  };
}

export const fetchCryptosBegin = () => ({
  type: "FETCH_CRYPTOS_BEGIN"
});


export const fetchCryptosSuccess = cryptos => ({
  type: "FETCH_CRYPTOS_SUCCESS",
  payload: { cryptos }
});

export const fetchCryptosFailure = error => ({
  type: "FETCH_CRYPTOS_FAILURE",
  payload: { error }
});