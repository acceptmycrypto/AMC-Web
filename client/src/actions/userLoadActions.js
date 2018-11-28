export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";

export function _loadProfile(token) {
  const Usersettings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token })
  };

  return dispatch => {
    dispatch(fetchUserBegin());
    return Promise.all([
      fetch("/profile", Usersettings),
      fetch("/profile/crypto", Usersettings),
      fetch("/profile/user/transactions", Usersettings)
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([user_info, user_crypto, transactions]) => {
    
        if (transactions !== undefined && transactions.length > 0) {
          let confirmed = transactions.filter(order => order.payment_received === 1);
          let pending = transactions.filter(order => order.payment_received === 0);
          return([user_info, user_crypto, transactions, confirmed, pending]);
          
        }else{
          let confirmed  = [];
          let pending = [];
          return([user_info, user_crypto, transactions, confirmed, pending]);
        }
      }).then(([user_info, user_crypto, transactions, confirmed, pending])=>{

          // console.log(user_info, user_crypto, transactions, confirmed, pending);
        if(confirmed.length == 0){
          let tx_history_view = "pending";
          return([user_info, user_crypto, transactions, confirmed, pending, tx_history_view]);
        }else{
          let tx_history_view = "confirmed";
          return([user_info, user_crypto, transactions, confirmed, pending, tx_history_view]);
        }

      }).then(([user_info, user_crypto, transactions, confirmed, pending, tx_history_view]) => {
    
        dispatch(fetchUserSuccess(user_info, user_crypto, transactions, confirmed, pending, tx_history_view));
        console.log(user_info, user_crypto, transactions, confirmed, pending, tx_history_view);
        return (user_info, user_crypto, transactions, confirmed, pending, tx_history_view);
      })
      .catch(error => dispatch(fetchUserFailure(error)));
  };
}


export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = (user_info, user_crypto, transactions, confirmed, pending, tx_history_view) => ({
  type: FETCH_USER_SUCCESS,
  payload: { user_info, user_crypto, transactions, confirmed, pending, tx_history_view }
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});

export const changeTxHistoryView = (event, new_tx_state, token) =>{
     event.preventDefault();

     const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
  
    return dispatch => {
      dispatch(fetchTransactionsBegin());
      return fetch("/profile/user/transactions", settings)
        .then((res) => res.json())
        .then((transactions) => {
          if (transactions !== undefined && transactions.length > 0) {
            let confirmed = transactions.filter(order => order.payment_received === 1);
            let pending = transactions.filter(order => order.payment_received === 0);
            return([transactions, confirmed, pending]);
            
          }else{
            let confirmed  = [];
            let pending = [];
            return([transactions, confirmed, pending]);
          }
        }).then(([transactions, confirmed, pending])=>{

          console.log(transactions, confirmed, pending, new_tx_state);
  
          dispatch(fetchTransactionsSuccess(transactions, confirmed, pending, new_tx_state));
          return (transactions, confirmed, pending, new_tx_state);
        })
        .catch(error => dispatch(fetchTransactionsFailure(error)));
    };
}

export const fetchTransactionsBegin = () => ({
  type: FETCH_TRANSACTIONS_BEGIN
});

export const fetchTransactionsSuccess = (transactions, confirmed, pending, tx_history_view) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: { transactions, confirmed, pending, tx_history_view }
});

export const fetchTransactionsFailure = error => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: { error }
});