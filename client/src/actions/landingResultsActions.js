

export function _loadCryptoResults() {

    return dispatch => {
      dispatch(loadCryptoResultsBegin());
      return fetch("http://localhost:3001/landing/results")
        .then(res => res.json())
        .then(cryptoResults => {
          
          dispatch(loadCryptoResultsSuccess(cryptoResults));
          return cryptoResults;
        })
        .catch(error => dispatch(loadCryptoResultsFailure(error)));
    };
  
  }
  
  
  export const loadCryptoResultsBegin = () => ({
    type: "LOAD_CRYPTO_RESULTS_BEGIN"
  });
  
  export const loadCryptoResultsSuccess = cryptoResults => ({
    type: "LOAD_CRYPTO_RESULTS_SUCCESS",
    payload: { cryptoResults }
  });
  
  export const loadCryptoResultsFailure = error => ({
    type: "LOAD_CRYPTO_RESULTS_FAILURE",
    payload: { error }
  });