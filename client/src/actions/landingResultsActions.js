export const LOAD_CRYPTO_RESULTS_BEGIN = "LOAD_CRYPTO_RESULTS_BEGIN";
export const LOAD_CRYPTO_RESULTS_SUCCESS = "LOAD_CRYPTO_RESULTS_SUCCESS";
export const LOAD_CRYPTO_RESULTS_FAILURE = "LOAD_CRYPTO_RESULTS_FAILURE";

export function _loadCryptoResults() {

    return dispatch => {
      dispatch(loadCryptoResultsBegin());
      return fetch("/landing/results")
        .then(res => res.json())
        .then(cryptoResults => {

          dispatch(loadCryptoResultsSuccess(cryptoResults));
          return cryptoResults;
        })
        .catch(error => dispatch(loadCryptoResultsFailure(error)));
    };

  }


  export const loadCryptoResultsBegin = () => ({
    type: LOAD_CRYPTO_RESULTS_BEGIN
  });

  export const loadCryptoResultsSuccess = cryptoResults => ({
    type: LOAD_CRYPTO_RESULTS_SUCCESS,
    payload: { cryptoResults }
  });

  export const loadCryptoResultsFailure = error => ({
    type: LOAD_CRYPTO_RESULTS_FAILURE,
    payload: { error }
  });