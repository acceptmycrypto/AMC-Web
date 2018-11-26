export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export function _loadProfile (token) {
    const Usersettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };

    
    return dispatch  => {
        dispatch(fetchUserBegin());
        return Promise.all([
            fetch("/profile", Usersettings),
            fetch("/profile/crypto", Usersettings),
            fetch("/profile/user/transactions", Usersettings)
          ])
            .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
            .then(([user_info, user_crypto, transactions]) => {
                console.log("user info ", user_info);
                console.log("user crypto ", user_crypto);
                console.log("transactions ", transactions);
                dispatch(fetchUserSuccess(user_info, user_crypto, transactions));
                return (user_info, user_crypto, transactions);
              })
              .catch(error => dispatch(fetchUserFailure(error)));
      };  
  }

  
  export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
  });
  
  export const fetchUserSuccess = (user_info, user_crypto, transactions) => ({
    type: FETCH_USER_SUCCESS,
    payload: { user_info, user_crypto, transactions }
  });
  
  export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: { error }
  });
  