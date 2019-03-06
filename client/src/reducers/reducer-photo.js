const initialState = {
  photo: null,
  loading: false,
  error: null,
  seller_id: null
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
    debugger
      return {
        ...state,
        loading: false,
        photo: action.payload.photo.photo,
        seller_id: action.payload.photo.seller_id
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