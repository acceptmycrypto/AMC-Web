import { FETCH_LOGGED_IN_BEGIN, FETCH_LOGGED_IN_SUCCESS, FETCH_LOGGED_IN_FAILURE } from "../actions/loggedInActions";




const initialState = {
  userLoggedIn: false,
  loading: false,
  error: null
};

export default function layoutReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_LOGGED_IN_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_LOGGED_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        userLoggedIn: action.payload
      };

    case FETCH_LOGGED_IN_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userLoggedIn: false
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
