import { LOAD_CRYPTO_BEGIN, LOAD_CRYPTO_SUCCESS, LOAD_CRYPTOS_FOR_CREATING_DEAL, LOAD_CRYPTO_FAILURE } from "../actions/loadCryptoActions";
import { SHOW_CRYPTOS_LOGOS_FOR_HOME_PAGE } from "../actions/homepageActions";


const initialState = {
    cryptoOptions: [],
    cryptoOptionsForCreatingDeal: [],
    loading: false,
    error: null,
    cryptoLogos: [
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/131.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1321.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
      "https://s2.coinmarketcap.com/static/img/coins/64x64/693.png"
    ]
}

export default function loadCryptosReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CRYPTO_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOAD_CRYPTO_SUCCESS:
            return {
                ...state,
                loading: false,
                cryptoOptions: action.payload.cryptoOptions
            };

        case LOAD_CRYPTOS_FOR_CREATING_DEAL:
          return {
              ...state,
              loading: false,
              cryptoOptionsForCreatingDeal: action.payload.cryptoOptionsForCreatingDeal
          };

        case SHOW_CRYPTOS_LOGOS_FOR_HOME_PAGE:
          return {
              ...state,
          };

        case LOAD_CRYPTO_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                cryptoOptions: [],

            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}