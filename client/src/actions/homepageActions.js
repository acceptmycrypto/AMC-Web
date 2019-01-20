export function _loadHomepage() {
    
    return dispatch => {
      dispatch(fetchUserBegin());
      return Promise.all([
        fetch("/load/categories/list"),
        fetch("/load/"),
        fetch("/profile/user/transactions")
      ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([user_info, user_crypto, transactions]) => {
      
    
        })
        .catch(error => dispatch(fetchUserFailure(error)));
    };
  }