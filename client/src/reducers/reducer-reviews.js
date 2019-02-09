import {
    FETCH_REVIEWS_BEGIN,
    FETCH_REVIEWS_FAILURE,
    FETCH_REVIEWS_SUCCESS,
    SELECT_TRANSACTION
  } from "../actions/reviewsActions";

import {
    OPEN_MODAL,
    CLOSE_MODAL
  } from "../actions/signInActions";

const initialState = {
    loading: false,
    error: null,
    reviews: {},
    modalVisible: false,
    selectedTransactionForReview: {}
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

      case SELECT_TRANSACTION:
        return {
            ...state,
            selectedTransactionForReview: action.payload
        }

      case OPEN_MODAL:
          return {
              ...state,
              modalVisible: action.payload.visible
          }
      case CLOSE_MODAL:
          return {
              ...state,
              modalVisible: action.payload.visible
          }

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }