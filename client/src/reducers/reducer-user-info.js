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
  INITIATE_WITHDRAW_BEGIN,
  INITIATE_WITHDRAW_SUCCESS,
  INITIATE_WITHDRAW_FAILURE,
  WITHDRAW_CONFIRM_BEGIN,
  WITHDRAW_CONFIRM_SUCCESS,
  WITHDRAW_CONFIRM_FAILURE,
  OPEN_WITHDRAW_MODAL,
  EDIT_WITHDRAW_CONFIRMATION_TOKEN

} from "../actions/cryptoPortfolioActions";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_TX_HISTORY_VIEW,
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from "../actions/userLoadActions";

import {
  CLOSE_MODAL
} from "../actions/signInActions";

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
  current_crypto_name: null,
  confirmed: [],
  pending: [],
  tx_history_view: null,
  initiateWithdrawLoading: false,
  initiateWithdrawError: null,
  initiateWithdraw: {},
  confirmWithdrawLoading: false,
  confirmWithdrawError: null,
  confirmWithdraw: {},
  modalVisible: false,
  selectedWithdrawCrypto: {},
  withdrawConfirmationToken: null
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USER_SUCCESS:
      // All done with fetch call: set loading "false".
      return {
        ...state,
        loading: false,
        user_info: action.payload.user_info,
        user_crypto: action.payload.user_crypto,
        transactions: action.payload.transactions,
        confirmed:action.payload.confirmed,
        pending: action.payload.pending,
        tx_history_view: action.payload.tx_history_view
      };

    case FETCH_USER_FAILURE:
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
    case FETCH_TRANSACTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions,
        confirmed: action.payload.confirmed,
        pending: action.payload.pending,
        tx_history_view: action.payload.tx_history_view,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case INITIATE_WITHDRAW_BEGIN:
      return {
        ...state,
        initiateWithdrawLoading: true,
        initiateWithdrawError: null
      };
    case INITIATE_WITHDRAW_SUCCESS:
      return {
        ...state,
        initiateWithdrawLoading: false,
        initiateWithdraw: action.payload.initiateWithdraw
      };
    case INITIATE_WITHDRAW_FAILURE:
      return {
        ...state,
        initiateWithdrawLoading: false,
        initiateWithdrawError: action.payload.error
      }
    case WITHDRAW_CONFIRM_BEGIN:
      return {
        ...state,
        confirmWithdrawLoading: true,
        confirmWithdrawError: null
      };
    case WITHDRAW_CONFIRM_SUCCESS:
      return {
        ...state,
        initiateWithdraw: {success: false},
        confirmWithdrawLoading: false,
        confirmWithdraw: action.payload.confirmWithdraw
      };
    case WITHDRAW_CONFIRM_FAILURE:
      return {
        ...state,
        confirmWithdrawLoading: false,
        confirmWithdrawError: action.payload.error
      }
    case OPEN_WITHDRAW_MODAL:
      return {
          ...state,
          modalVisible: action.payload.visible,
          selectedWithdrawCrypto: action.payload
      }
    case CLOSE_MODAL:
      return {
          ...state,
          modalVisible: action.payload.visible
      }
    case EDIT_WITHDRAW_CONFIRMATION_TOKEN:
      return {
          ...state,
          withdrawConfirmationToken: action.payload
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}