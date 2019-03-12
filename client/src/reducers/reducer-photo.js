const initialState = {
  photo: null,
  loading: false,
  error: null,
  user_id: null
};

export default function photoReducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_PHOTO_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_PHOTO_SUCCESS":
      return {
        ...state,
        loading: false,
        photo: action.payload.photo.photo,
        user_id: action.payload.photo.user_id
      };

    case "FETCH_PHOTO_FAILURE":
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        photo: null
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}