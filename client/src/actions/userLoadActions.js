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
            fetch("http://localhost:3001/profile", Usersettings),
            fetch("http://localhost:3001/profile/crypto", Usersettings),
            fetch("http://localhost:3001/profile/user/transactions", Usersettings)
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
    type: "FETCH_USER_BEGIN"
  });
  
  export const fetchUserSuccess = (user_info, user_crypto, transactions) => ({
    type: "FETCH_USER_SUCCESS",
    payload: { user_info, user_crypto, transactions }
  });
  
  export const fetchUserFailure = error => ({
    type: "FETCH_USER_FAILURE",
    payload: { error }
  });
  