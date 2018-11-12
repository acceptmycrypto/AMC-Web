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
    dispatch(fetchUserBegin());
    return fetch("http://localhost:3001/loggedIn", settingsLoggedIn)
      .then(res => res.json())
      .then(jsonLogin => {
        dispatch(fetchUserSuccess(jsonLogin));
        return jsonLogin;
      })
      .catch(error => dispatch(fetchUserFailure(error)));
  };
}

export const fetchUserBegin = () => ({
  type: "FETCH_USER_BEGIN"
});


export const fetchUserSuccess = user => {
  if(user.message == "Right Token"){
    return {
      type: "FETCH_USER_SUCCESS",
      payload: true
    }
  }else {
    return {
      type: "FETCH_USER_SUCCESS",
      payload: false
    }
  }
}

export const fetchUserFailure = error => ({
  type: "FETCH_USER_FAILURE",
  payload: { error }
});
