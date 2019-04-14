import { FETCH_HOMEPAGE_DEALS_BEGIN, FETCH_HOMEPAGE_DEALS_SUCCESS, FETCH_HOMEPAGE_DEALS_FAILURE } from "../actions/homepageActions";

const initialState = {
  category_list: [],
  homepage_deals: []
  // apparel_accessories :[],
  // electronics: [],
  // health_beauty: [],
  // movies_music_games: []
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
        homepage_deals: action.payload.homepage_deals,
        category_list: action.payload.category_list,
        // apparel_accessories: action.payload.apparel_accessories,
        // electronics: action.payload.electronics,
        // health_beauty: action.payload.health_beauty,
        // movies_music_games: action.payload.movies_music_games
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