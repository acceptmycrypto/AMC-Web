const initialState = {
  imageData: {},
  images: [],
  uploading: false,
  error: null
};

const handleImagesUpload = (images, imageURL) => {
  images.push(imageURL);
}

export default function imagesReducer(state = initialState, action) {

  switch(action.type) {
    case "UPLOADING_IMAGES_BEGIN":
      return {
        ...state,
        uploading: true,
        error: null
      };

    case "UPLOADING_IMAGES_SUCCESS":
      handleImagesUpload(state.images, action.payload.imageData.Location);
      debugger
      return {
        ...state,
        uploading: false,
        imageData: action.payload.imageData
      };

    case "UPLOADING_IMAGES_FAILURE":
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        imageData: {},
        images: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}