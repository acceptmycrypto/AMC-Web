export const FETCH_LOGGED_IN_BEGIN = "FETCH_LOGGED_IN_BEGIN";
export const FETCH_LOGGED_IN_SUCCESS = "FETCH_LOGGED_IN_SUCCESS";
export const FETCH_LOGGED_IN_FAILURE = "FETCH_LOGGED_IN_FAILURE";



export function _isLoggedIn(token) {
  const settingsLoggedIn = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  return dispatch => {
    dispatch(fetchIsLoggedInBegin());
    return fetch("/loggedIn", settingsLoggedIn)
      .then(res => res.json())
      .then(jsonLogin => {
        dispatch(fetchIsLoggedInSuccess(jsonLogin));
        return jsonLogin;
      })
      .catch(error => dispatch(fetchIsLoggedInFailure(error)));
  };
}

export const fetchIsLoggedInBegin = () => ({
  type: FETCH_LOGGED_IN_BEGIN
});


export const fetchIsLoggedInSuccess = user => {
  if(user.message == "Right Token"){
    return {
      type: FETCH_LOGGED_IN_SUCCESS,
      payload: true
    }
  }else {
    return {
      type: FETCH_LOGGED_IN_SUCCESS,
      payload: false
    }
  }
}

export const fetchIsLoggedInFailure = error => ({
  type: FETCH_LOGGED_IN_FAILURE,
  payload: { error }
});
