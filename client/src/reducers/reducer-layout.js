const initialState = {
  user: false,
  loading: false,
  error: null
};

export default function dealsReducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_USER_BEGIN":
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_USER_SUCCESS":
     console.log("user action: ", action);
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case "FETCH_USER_FAILURE":
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        deals: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}