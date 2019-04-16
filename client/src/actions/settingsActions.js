export const SET_ACTIVE_SETTINGS = "SET_ACTIVE_SETTINGS";
export const SET_ACTIVE_PROFILE_SETTINGS = "SET_ACTIVE_PROFILE_SETTINGS";
export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_ACTIVE_CRYPTO_SETTINGS = "SET_ACTIVE_CRYPTO_SETTINGS";
export const FETCH_PHOTO_SUCCESS = "FETCH_PHOTO_SUCCESS";
export const CRYPTO_OPTIONS_LEFT_BEGIN = "CRYPTO_OPTIONS_LEFT_BEGIN";
export const CRYPTO_OPTIONS_LEFT_SUCCESS = "CRYPTO_OPTIONS_LEFT_SUCCESS";
export const CRYPTO_OPTIONS_LEFT_FAILURE = "CRYPTO_OPTIONS_LEFT_FAILURE";
export const ADD_CRYPTO_SUCCESS = "ADD_CRYPTO_SUCCESS";
export const ALL_TRANSACTIONS_LEFT_BEGIN = "ALL_TRANSACTIONS_LEFT_BEGIN";
export const ALL_TRANSACTIONS_LEFT_SUCCESS = "ALL_TRANSACTIONS_LEFT_SUCCESS";
export const ALL_TRANSACTIONS_LEFT_FAILURE = "ALL_TRANSACTIONS_LEFT_FAILURE";


export const setInitialSettingsState = () => {
    return {
        type: SET_INITIAL_STATE
    }
}


export const handleSettingsMenuItemClick = (e, {name} ) => {

    return {
        type: SET_ACTIVE_SETTINGS,
        payload: {activeSettingsItem: name}

    }
}

export const handleProfileSettingsMenuItemClick = (e, {name} ) => {

    return {
        type: SET_ACTIVE_PROFILE_SETTINGS,
        payload: {activeProfileSettingsItem: name}

    }
}



export const handleCryptoSettingsMenuItemClick = (e, {name} ) => {

    return {
        type: SET_ACTIVE_CRYPTO_SETTINGS,
        payload: {activeCryptoSettingsItem: name}

    }
}



export const _changePhoto = (token, selectedPhoto)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, selectedPhoto })
    };
    const update_photos =  fetch("/update/photo", settings)

    return {
        type: FETCH_PHOTO_SUCCESS,
        payload: {photo:
          {photo: selectedPhoto}
        }
    }

}

export const _changeUsername = (token, newUsername)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newUsername })
    };
    return fetch("/update/username", settings)
        .then(res => res.json())
        .then(jsonUsername => {
            console.log("jsonUsername ",  jsonUsername);
            return jsonUsername;
        })

}

export const _changeEmail = (token, newEmail)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newEmail })
    };
    return fetch("/update/email", settings)
        .then(res => res.json())
        .then(jsonEmail => {
            console.log("jsonEmail ",  jsonEmail);
            return jsonEmail;
        })
}

export const _changePassword = (token, oldPassword, newPassword)=>{
    const passSettings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, oldPassword, newPassword})
    };
    return fetch("/update/password", passSettings)
        .then(res => res.json())
        .then(jsonPassword => {
            console.log("jsonPassword ",  jsonPassword);
            return jsonPassword;
        })
}

export const _cryptoOptionsLeft = (token) => {
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token})
    };
    return dispatch => {
        dispatch(cryptoOptionsBegin());
        return fetch(`/crypto/left`, settings)
          .then(res => res.json())
          .then(jsonLoadCrypto => {

            let cryptoOptions = [];

             jsonLoadCrypto.map(crypto => {

                let optionObj = {};
                optionObj.value = crypto.crypto_name;
                optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";

                cryptoOptions.push(optionObj);
              })

              return cryptoOptions;


          }). then(cryptoOptionsArray =>{
            dispatch(cryptoOptionsSuccess(cryptoOptionsArray));
            return cryptoOptionsArray;

          })
          .catch(error => dispatch(cryptoOptionsFailure(error)));
      };
    }


    export const cryptoOptionsBegin = () => ({
      type: CRYPTO_OPTIONS_LEFT_BEGIN
    });


    export const cryptoOptionsSuccess = cryptoLeft => ({
      type: CRYPTO_OPTIONS_LEFT_SUCCESS,
      payload: { cryptoLeft }
    });

    export const cryptoOptionsFailure = error => ({
      type: CRYPTO_OPTIONS_LEFT_FAILURE,
      payload: { error }
    });


    export const _addCryptos = (token, cryptoProfile)=>{
         const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, cryptoProfile })
        };
        const update_cryptos =  fetch("/add/cryptos", settings);


        return {
            type: ADD_CRYPTO_SUCCESS,
            payload: {
                activeCryptoSettingsItem: "Crypto I am Are Interested In"
            }
        }

    }

export const _allTransactions = (token) =>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token})
    };

    return dispatch => {
        dispatch(fetchAllTransactionsBegin());
        return fetch("/complete/order/details", settings)
          .then(res => res.json())
          .then(jsonAllTransactions => {
            dispatch(fetchAllTransactionsSuccess(jsonAllTransactions));
            return jsonAllTransactions;
          })
          .catch(error => dispatch(fetchAllTransactionsFailure(error)));
      };
}


    export const fetchAllTransactionsBegin = () => ({
      type: ALL_TRANSACTIONS_LEFT_BEGIN
    });


    export const fetchAllTransactionsSuccess = transactionInfo => ({
      type: ALL_TRANSACTIONS_LEFT_SUCCESS,
      payload: { transactionInfo }
    });

    export const fetchAllTransactionsFailure = error => ({
      type: ALL_TRANSACTIONS_LEFT_FAILURE,
      payload: { error }
    });





// used in CryptocurrencySettings
export async function _loadCryptoSettings (token) {
    const Cryptosettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const profile_crypto = await fetch("/profile/crypto", Cryptosettings)
    const user_crypto = await profile_crypto.json();

    return({user_crypto});
  
  }

  export async function _loadMatchedFriends (token) {
    const Matchedsettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const matched = await fetch("/profile/matched/friends", Matchedsettings)
    const matched_friends = await matched.json();

    return({matched_friends});
  
  }

  export async function _makeFriends (token, matched_friend_id) {
    const Friendssettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token, matched_friend_id})
    };
 
  
    const friendship = await fetch("/settings/make/friends", Friendssettings)
    const friends = await friendship.json();

    return("done");
  
  }

  export async function _loadAllTransactions (token) {
    const Transactionssettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const allTransactions = await fetch("/profile/user/transactions", Transactionssettings)
    const transactions = await allTransactions.json();

    return({transactions});
  
  }