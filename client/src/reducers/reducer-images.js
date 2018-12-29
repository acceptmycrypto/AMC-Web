const initialState = {
  imageData: null,
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
      handleImagesUpload(state.images, action.payload);
      return {
        ...state,
        uploading: false,
        imageData: action.payload
      };

    case "UPLOADING_IMAGES_FAILURE":
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        imageData: null,
        images: []
      };

    case "VIEW_UPLOADED_IMAGE":
      return {
        ...state,
        imageData: action.payload
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}