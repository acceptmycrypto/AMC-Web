import {
  FETCH_CHAT_SESSIONS_BEGIN,
  FETCH_CHAT_SESSIONS_SUCCESS,
  FETCH_CHAT_SESSIONS_FAILURE,
  FETCH_CHAT_MESSAGES_BEGIN,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE
} from "../actions/chatActions";

const initialState = {
  chat_sessions_loading: false,
  chat_sessions_error: null,
  chat_sessions: [],
  chat_messages_loading: false,
  chat_messages_error: null,
  chat_messages: []
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_SESSIONS_BEGIN:
      return {
        ...state,
        chat_sessions_loading: true,
        chat_sessions_error: null
      };

    case FETCH_CHAT_SESSIONS_SUCCESS:
      // All done with fetch call: set loading "false".
      return {
        ...state,
        chat_sessions_loading: false,
        chat_sessions: action.payload.chat_sessions
      };

    case FETCH_CHAT_SESSIONS_FAILURE:
      return {
        ...state,
        chat_sessions_loading: false,
        chat_sessions_error: action.payload.error,
      };

    case FETCH_CHAT_MESSAGES_BEGIN:
      return {
        ...state,
        chat_messages_loading: true,
        chat_messages_error: null
      };

    case FETCH_CHAT_MESSAGES_SUCCESS:
      // All done with fetch call: set loading "false".
      return {
        ...state,
        chat_messages_loading: false,
        chat_messages: action.payload.chat_messages
      };

    case FETCH_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        chat_messages_loading: false,
        chat_messages_error: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}