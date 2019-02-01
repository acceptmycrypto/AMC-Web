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

      dispatch(fetchCreateChatSessionSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchCreateChatSessionFailure(error)));
  };
}

export const fetchCreateChatSessionBegin = () => ({
  type: FETCH_CREATE_CHAT_SESSION_BEGIN,
});

export const fetchCreateChatSessionSuccess = (chat_session_info) => ({
  type: FETCH_CREATE_CHAT_SESSION_SUCCESS,
  payload: { chat_session_info }
});

export const fetchCreateChatSessionFailure = error => ({
  type: FETCH_CREATE_CHAT_SESSION_FAILURE,
  payload: { error }
});

//load chat sessions
export const FETCH_CHAT_SESSIONS_BEGIN = "FETCH_CHAT_SESSIONS_BEGIN";
export const FETCH_CHAT_SESSIONS_SUCCESS = "FETCH_CHAT_SESSIONS_SUCCESS";
export const FETCH_CHAT_SESSIONS_FAILURE = "FETCH_CHAT_SESSIONS_FAILURE";

export function _loadChatSessions(token) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  return dispatch => {
    dispatch(fetchChatSessionsBegin());
    return fetch(`/chat_sessions`, settings)
    .then(res => res.json())
    .then(resJson => {

      dispatch(fetchChatSessionsSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchChatSessionsFailure(error)));
  };
}

export const fetchChatSessionsBegin = () => ({
  type: FETCH_CHAT_SESSIONS_BEGIN,
});

export const fetchChatSessionsSuccess = (chat_sessions) => ({
  type: FETCH_CHAT_SESSIONS_SUCCESS,
  payload: { chat_sessions }
});

export const fetchChatSessionsFailure = error => ({
  type: FETCH_CHAT_SESSIONS_FAILURE,
  payload: { error }
});

//load chat messages
export const FETCH_CHAT_MESSAGES_BEGIN = "FETCH_CHAT_MESSAGES_BEGIN";
export const FETCH_CHAT_MESSAGES_SUCCESS = "FETCH_CHAT_MESSAGES_SUCCESS";
export const FETCH_CHAT_MESSAGES_FAILURE = "FETCH_CHAT_MESSAGES_FAILURE";

export function _loadChatMessages(token, chat_session_id) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, chat_session_id})
  };

  return dispatch => {
    dispatch(fetchChatMessagesBegin());
    return fetch('/chat_session/messages', settings)
    .then(res => res.json())
    .then(resJson => {

      dispatch(fetchChatMessagesSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(fetchChatMessagesFailure(error)));
  };
}

export const fetchChatMessagesBegin = () => ({
  type: FETCH_CHAT_MESSAGES_BEGIN,
});

export const fetchChatMessagesSuccess = (chat_session_info) => ({
  type: FETCH_CHAT_MESSAGES_SUCCESS,
  payload: { chat_session_info }
});

export const fetchChatMessagesFailure = error => ({
  type: FETCH_CHAT_MESSAGES_FAILURE,
  payload: { error }
});

//add chat message
//load chat messages
export const ADD_CHAT_MESSAGE_SUCCESS = "ADD_CHAT_MESSAGE_SUCCESS";
export const ADD_CHAT_MESSAGE_FAILURE = "ADD_CHAT_MESSAGE_FAILURE";

export function _addChatMessage(token, chat_session_id, message) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, chat_session_id, message})
  };

  return dispatch => {
    return fetch('/chat_session/messages/new', settings)
    .then(res => res.json())
    .then(resJson => {
      
      dispatch(addChatMessageSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(addChatMessageFailure(error)));
  };
}

export const addChatMessageSuccess = (message_added) => ({
  type: ADD_CHAT_MESSAGE_SUCCESS,
  payload: { message_added }
});

export const addChatMessageFailure = error => ({
  type: ADD_CHAT_MESSAGE_FAILURE,
  payload: { error }
});

export const DELETE_CHAT_SESSIONS_BEGIN = "DELETE_CHAT_SESSIONS_BEGIN";
export const DELETE_CHAT_SESSIONS_SUCCESS = "DELETE_CHAT_SESSIONS_SUCCESS";
export const DELETE_CHAT_SESSIONS_FAILURE = "DELETE_CHAT_SESSIONS_FAILURE";

export function _deleteChatSession(token, chat_session_id) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, chat_session_id})
  };

  return dispatch => {
    dispatch(deleteChatSessionBegin());
    return fetch('/chat_session/delete', settings)
    .then(res => res.json())
    .then(resJson => {

      dispatch(deleteChatSessionSuccess(resJson));
      return resJson;
    })
    .catch(error => dispatch(deleteChatSessionFailure(error)));
  };
}

export const deleteChatSessionBegin = () => ({
  type: DELETE_CHAT_SESSIONS_BEGIN,
});

export const deleteChatSessionSuccess = (message_deleted) => ({
  type: DELETE_CHAT_SESSIONS_SUCCESS,
  payload: {message_deleted}
});

export const deleteChatSessionFailure = error => ({
  type: DELETE_CHAT_SESSIONS_FAILURE,
  payload: { error }
});

export const EDIT_CHAT_MESSAGE = "EDIT_CHAT_MESSAGE";
export const onMessageEdit = (event) => {
  return {
      type: 'EDIT_CHAT_MESSAGE',
      payload: event.target.value
  }
};



