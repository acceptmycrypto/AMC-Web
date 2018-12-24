const initialState = {
  images: [],
  uploading: false,
  error: null
};

export default function imagesReducer(state = initialState, action) {
  switch(action.type) {
    case "UPLOADING_IMAGES_BEGIN":
      return {
        ...state,
        uploading: true,
        error: null
      };

    case "UPLOADING_IMAGES_SUCCESS":
      return {
        ...state,
        uploading: false,
        images: action.payload.images
      };

    case "UPLOADING_IMAGES_FAILURE":
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        images: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}