import {
  FETCH_CHAT_SESSIONS_BEGIN,
  FETCH_CHAT_SESSIONS_SUCCESS,
  FETCH_CHAT_SESSIONS_FAILURE,
} from "../actions/chatActions";

const initialState = {
  loading: false,
  error: null,
  chat_sessions: []
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_SESSIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CHAT_SESSIONS_SUCCESS:
      // All done with fetch call: set loading "false".
      return {
        ...state,
        loading: false,
        chat_sessions: action.payload.chat_sessions
      };

    case FETCH_CHAT_SESSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}