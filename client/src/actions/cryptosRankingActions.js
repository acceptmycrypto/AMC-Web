export function _loadCryptosRanking(type) {
  const cryptosRankingSettings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return dispatch => {
    dispatch(fetchCryptosBegin());
    if(type == 'venues')
    {
      return fetch("/api/cryptosranking_venues", cryptosRankingSettings)
      .then(res => res.json())
      .then(jsonCryptos => {
        dispatch(fetchCryptosSuccess(jsonCryptos, 'venues'));
        return jsonCryptos;
      })
      .catch(error => dispatch(fetchCryptosFailure(error)));
    }
    else
    {
      return fetch("/api/cryptosranking_transactions", cryptosRankingSettings)
      .then(res => res.json())
      .then(jsonCryptos => {
        dispatch(fetchCryptosSuccess(jsonCryptos, 'transactions'));
        console.log(jsonCryptos);
        return jsonCryptos;
      })
      .catch(error => dispatch(fetchCryptosFailure(error)));
    }
  };
}

export const fetchCryptosBegin = () => ({
  type: "FETCH_CRYPTOS_BEGIN"
});


export const fetchCryptosSuccess = (cryptos, sort) => ({
  type: "FETCH_CRYPTOS_SUCCESS",
  payload: { cryptos },
  cryptosSort: sort
});

export const fetchCryptosFailure = error => ({
  type: "FETCH_CRYPTOS_FAILURE",
  payload: { error }
});