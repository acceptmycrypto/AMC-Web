export function _loadCryptocurrencies() {

  return dispatch => {
    dispatch(loadCryptoBegin());
    return fetch("/cryptocurrencies")
      .then(res => res.json())
      .then(jsonLoadCrypto => {
        let cryptoOptions = [];

       jsonLoadCrypto.map(crypto => {

          let optionObj = {};
          optionObj.value = crypto.crypto_metadata_name;
          optionObj.label = crypto.crypto_metadata_name + " " + "(" + crypto.crypto_symbol + ")";

          cryptoOptions.push(optionObj);
        })

        dispatch(loadCryptosForCreatingDeals(jsonLoadCrypto)); //need logos link for deal listing
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

export const loadCryptosForCreatingDeals = cryptoOptionsForCreatingDeal => ({
  type: "LOAD_CRYPTOS_FOR_CREATING_DEAL",
  payload: { cryptoOptionsForCreatingDeal }
});