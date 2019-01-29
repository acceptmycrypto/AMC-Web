export const FETCH_CREATE_CHAT_USER_BEGIN = "FETCH_CREATE_CHAT_USER_BEGIN";
export const FETCH_CREATE_CHAT_USER_SUCCESS = "FETCH_CREATE_CHAT_USER_SUCCESS";
export const FETCH_CREATE_CHAT_USER_FAILURE = "FETCH_CREATE_CHAT_USER_FAILURE";

export function _createUser(token, seller_id) {

  //create seller and buyer as users in chatkit if found not existed
  
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, seller_id})
  };

  return dispatch => {
    dispatch(fetchCreateChatUserBegin());
    return fetch(`/chat/new`, settings)
    .then(res => res.json())
    .then(resJson => {
      debugger
      dispatch(fetchCreateChatUserSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchCreateChatUserFailure(error)));
  };
}

export const fetchCreateChatUserBegin = () => ({
  type: FETCH_CREATE_CHAT_USER_BEGIN,
});

export const fetchCreateChatUserSuccess = (new_chat_user) => ({
  type: FETCH_CREATE_CHAT_USER_SUCCESS,
  payload: { new_chat_user }
});

export const fetchCreateChatUserFailure = error => ({
  type: FETCH_CREATE_CHAT_USER_FAILURE,
  payload: { error }
});


