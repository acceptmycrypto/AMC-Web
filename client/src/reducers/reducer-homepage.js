import { FETCH_HOMEPAGE_DEALS_BEGIN, FETCH_HOMEPAGE_DEALS_SUCCESS, FETCH_HOMEPAGE_DEALS_FAILURE } from "../actions/homepageActions";

const initialState = {
    category_list : [],
    apparel_accessories :[],
  };
  export default function homepageReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_HOMEPAGE_DEALS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_HOMEPAGE_DEALS_SUCCESS:
        // All done with fetch call: set loading "false".
        return {
          ...state,
          loading: false,
          category_list: action.payload.category_list,
          apparel_accessories: action.payload.apparel_accessories
        };
  
      case FETCH_HOMEPAGE_DEALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      
      default:
        return state;
    }
  }