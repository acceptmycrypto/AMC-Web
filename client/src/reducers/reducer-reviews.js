import {
    FETCH_REVIEWS_BEGIN,
    FETCH_REVIEWS_FAILURE,
    FETCH_REVIEWS_SUCCESS,
  } from "../actions/reviewsActions";

const initialState = {
    loading: false,
    error: null,
    reviews: {},
  };

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_REVIEWS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

      case FETCH_REVIEWS_SUCCESS:
        // All done with fetch call: set loading "false".
        return {
          ...state,
          loading: false,
          reviews: action.payload.reviews
        };

      case FETCH_REVIEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }