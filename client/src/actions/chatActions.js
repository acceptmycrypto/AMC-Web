export const FETCH_CREATE_CHAT_SESSION_BEGIN = "FETCH_CREATE_CHAT_SESSION_BEGIN";
export const FETCH_CREATE_CHAT_SESSION_SUCCESS = "FETCH_CREATE_CHAT_SESSION_SUCCESS";
export const FETCH_CREATE_CHAT_SESSION_FAILURE = "FETCH_CREATE_CHAT_SESSION_FAILURE";

export function _createChatSession(token, seller_id, deal_id) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, seller_id, deal_id})
  };

  return dispatch => {
    dispatch(fetchCreateChatSessionBegin());
    return fetch(`/chat_session/new`, settings)
    .then(res => res.json())
    .then(resJson => {
      debugger
      dispatch(fetchCreateChatSessionSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchCreateChatSessionFailure(error)));
  };
}

export const fetchCreateChatSessionBegin = () => ({
  type: FETCH_CREATE_CHAT_SESSION_BEGIN,
});

export const fetchCreateChatSessionSuccess = (new_chat_user) => ({
  type: FETCH_CREATE_CHAT_SESSION_SUCCESS,
  payload: { new_chat_user }
});

export const fetchCreateChatSessionFailure = error => ({
  type: FETCH_CREATE_CHAT_SESSION_FAILURE,
  payload: { error }
});


