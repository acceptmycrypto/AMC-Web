import * as types from "../actions/chatActions";

const initialState = {

};

export default function CreateDealReducer(state = initialState, action) {
  switch(action.type) {
    case "UPLOADING_IMAGES_BEGIN":
      return {
        ...state,
        uploading: true,
        error: null
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}