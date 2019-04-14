import { UPLOADING_IMAGES_BEGIN, UPLOADING_IMAGES_SUCCESS, UPLOADING_IMAGES_FAILURE, VIEW_UPLOADED_IMAGE, REMOVE_UPLOADED_IMAGE } from "../actions/listDealActions";



const initialState = {
  imageData: {},
  images: [],
  imageView: "",
  uploading: false,
  error: null
};

const handleImagesUpload = (images, imageObj) => {
  images.push(imageObj);
}

const handleImageRemove = (images, imageKey) => {
  let newImageArr = images.filter(img => img.key !== imageKey);
  return newImageArr
}

export default function imagesReducer(state = initialState, action) {

  switch(action.type) {
    case UPLOADING_IMAGES_BEGIN:
      return {
        ...state,
        uploading: true,
        error: null
      };

    case UPLOADING_IMAGES_SUCCESS:
      handleImagesUpload(state.images, action.payload);
      return {
        ...state,
        uploading: false,
        imageData: action.payload,
        imageView: action.payload.Location
      };

    case UPLOADING_IMAGES_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        imageData: null,
        imageView: "",
        images: []
      };

    case VIEW_UPLOADED_IMAGE:
      return {
        ...state,
        imageView: action.payload
      };

    case REMOVE_UPLOADED_IMAGE:
      return {
        ...state,
        images: handleImageRemove(state.images, action.payload)
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
