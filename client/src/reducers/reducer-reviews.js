import {
    FETCH_REVIEWS_BEGIN,
    FETCH_REVIEWS_FAILURE,
    FETCH_REVIEWS_SUCCESS,
    SELECTED_TRANSACTION_BEGIN,
    SELECTED_TRANSACTION_FAILURE,
    SELECTED_TRANSACTION_SUCCESS,
    REVIEW_RATING,
    EDIT_REVIEW_BODY
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
    selectedTransactionLoading: false,
    selectedTransactionError: null,
    selectedTransaction: [],
    rating: null,
    review_body: null
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

      case SELECTED_TRANSACTION_BEGIN:
        return {
          ...state,
          selectedTransactionLoading: true,
          selectedTransactionError: null
        };

      case SELECTED_TRANSACTION_SUCCESS:
        // All done with fetch call: set loading "false".
        return {
          ...state,
          selectedTransactionLoading: false,
          selectedTransaction: action.payload.selectedTransaction
        };

      case SELECTED_TRANSACTION_FAILURE:
        return {
          ...state,
          selectedTransactionLoading: false,
          selectedTransactionError: action.payload.error,
        };

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

      case REVIEW_RATING:
        return {
            ...state,
            rating: action.payload
        }

      case EDIT_REVIEW_BODY:
        return {
            ...state,
            review_body: action.payload
        }

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }