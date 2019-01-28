export const FETCH_CREATE_CHAT_USER_BEGIN = "FETCH_CREATE_CHAT_USER_BEGIN";
export const FETCH_CREATE_CHAT_USER_SUCCESS = "FETCH_CREATE_CHAT_USER_SUCCESS";
export const FETCH_CREATE_CHAT_USER_FAILURE = "FETCH_CREATE_CHAT_USER_FAILURE";

export function _createUser() {
  return dispatch => {
    dispatch(fetchCreateChatUserBegin());
    return fetch(`/chat/new`)
    .then(res => res.json())
    .then(resJson => {
      dispatch(fetchCreateChatUserSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchCreateChatUserFailure(error)));
  };
}

export const fetchChatUserBegin = () => ({
  type: FETCH_CREATE_CHAT_USER_BEGIN,
});

export const fetchChatUserSuccess = (new_chat_user) => ({
  type: FETCH_CREATE_CHAT_USER_SUCCESS,
  payload: { new_chat_user }
});

export const fetchChatUserFailure = error => ({
  type: FETCH_CREATE_CHAT_USER_FAILURE,
  payload: { error }
});


