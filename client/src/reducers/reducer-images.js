const initialState = {
  imageData: null,
  images: [],
  uploading: false,
  error: null
};

const handleImagesUpload = (images, imageURL) => {
  debugger
  images.push(imageURL);
}

const handleImageRemove = (images, imageURL) => {
  let newImageArr = images.filter(img => img !== imageURL);
  return newImageArr
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

    case "REMOVE_UPLOADED_IMAGE":
      return {
        ...state,
        images: handleImageRemove(state.images, action.payload)
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}