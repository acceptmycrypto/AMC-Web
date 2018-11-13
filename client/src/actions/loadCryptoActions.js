export function _loadCryptocurrencies() {

  return async dispatch => {
    dispatch(loadCryptoBegin());
    return fetch("http://localhost:3001/cryptocurrencies")
      .then(res => res.json())
      .then(jsonLoadCrypto => {
        let cryptoOptions = [];

       jsonLoadCrypto.map(crypto => {

          let optionObj = {};
          optionObj.value = crypto.crypto_metadata_name;
          optionObj.label = crypto.crypto_metadata_name + " " + "(" + crypto.crypto_symbol + ")";

          cryptoOptions.push(optionObj);
        })

        return cryptoOptions;


      }).then(cryptoOptionsArray => {
        dispatch(loadCryptoSuccess(cryptoOptionsArray));
        return cryptoOptionsArray;
      })
      .catch(error => dispatch(loadCryptoFailure(error)));
  };

}


export const loadCryptoBegin = () => ({
  type: "LOAD_CRYPTO_BEGIN"
});

export const loadCryptoSuccess = cryptoOptions => ({
  type: "LOAD_CRYPTO_SUCCESS",
  payload: { cryptoOptions }
});

export const loadCryptoFailure = error => ({
  type: "LOAD_CRYPTO_FAILURE",
  payload: { error }
});