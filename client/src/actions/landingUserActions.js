export function _loadLandingDropdown() {

    return dispatch => {
      dispatch(loadCryptoBegin());
      return fetch("http://localhost:3001/landing/users/dropdown")
        .then(res => res.json())
        .then(jsonLoadCrypto => {
          let landingCryptoOptions = [];
  
         jsonLoadCrypto.map(crypto => {
  
            let optionObj = {};
            optionObj.value = crypto.id;
            optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
  
            landingCryptoOptions.push(optionObj);
          })
  
          return landingCryptoOptions;
  
  
        }).then(landingCryptoOptionsArray => {
          dispatch(loadCryptoSuccess(landingCryptoOptionsArray));
          return landingCryptoOptionsArray;
        })
        .catch(error => dispatch(loadCryptoFailure(error)));
    };
  
  }
  
  
  export const loadCryptoBegin = () => ({
    type: "LOAD_CRYPTO_LANDING_BEGIN"
  });
  
  export const loadCryptoSuccess = landingCryptoOptions => ({
    type: "LOAD_CRYPTO_LANDING_SUCCESS",
    payload: { landingCryptoOptions }
  });
  
  export const loadCryptoFailure = error => ({
    type: "LOAD_CRYPTO_LANDING_FAILURE",
    payload: { error }
  });