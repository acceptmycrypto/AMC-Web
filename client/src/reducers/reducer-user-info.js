import {
  SHOW_ALL_INTERESTED_CRYPTO,
  SHOW_ALL_OWNED_CRYPTO,
  HIDE_ADDRESS_FORM,
  SHOW_ADDRESS_FORM,
  HIDE_QR,
  SHOW_QR,
  FETCH_UPDATE_CRYPTO_BEGIN,
  FETCH_UPDATE_CRYPTO_SUCCESS,
  FETCH_UPDATE_CRYPTO_FAILURE, 

} from "../actions/cryptoPortfolioActions";

const initialState = {
  user_info: [],
  user_crypto: [],
  transactions: [],
  loading: false,
  error: null,
  crypto_view: "owned",
  address_form_shown: false,
  qr_shown: false,
  users_cryptos_id: null,
  current_crypto_name: null
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_BEGIN":
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_USER_SUCCESS":
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      console.log("User has successfully called!")
      console.log(action);
      return {
        ...state,
        loading: false,
        user_info: action.payload.user_info,
        user_crypto: action.payload.user_crypto,
        transactions: action.payload.transactions
      };

    case "FETCH_USER_FAILURE":
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user_info: [],
        user_crypto: [],
        transactions: [],
      };

    case SHOW_ALL_INTERESTED_CRYPTO:
      return {
        ...state,
        crypto_view: action.payload.crypto_view,
        address_form_shown: action.payload.address_form_shown,
        qr_shown: action.payload.qr_shown,
        users_cryptos_id: action.payload.users_cryptos_id,
        current_crypto_name: action.payload.current_crypto_name

      };
    case SHOW_ALL_OWNED_CRYPTO:
      return {
        ...state,
        crypto_view: action.payload.crypto_view,
        address_form_shown: action.payload.address_form_shown,
        qr_shown: action.payload.qr_shown,
        users_cryptos_id: action.payload.users_cryptos_id,
        current_crypto_name: action.payload.current_crypto_name
      };
    case HIDE_ADDRESS_FORM:
      return {
        ...state,
        address_form_shown: action.payload.address_form_shown
      };
    case SHOW_ADDRESS_FORM:
      return {
        ...state,
        address_form_shown: action.payload.address_form_shown,
        users_cryptos_id: action.payload.users_cryptos_id,
        current_crypto_name: action.payload.current_crypto_name
      };
    case HIDE_QR:
      return {
        ...state,
        qr_shown: action.payload.qr_shown
      };
    case SHOW_QR:
      return {
        ...state,
        qr_shown: action.payload.qr_shown
      };
    case FETCH_UPDATE_CRYPTO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_UPDATE_CRYPTO_SUCCESS:
      return {
        ...state,
        loading: false,
        user_crypto: action.payload.user_crypto,
        crypto_view: action.payload.crypto_view,
        address_form_shown: action.payload.address_form_shown
      };
    case FETCH_UPDATE_CRYPTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}