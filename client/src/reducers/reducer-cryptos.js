const initialState = {
  cryptos: [],
  loading: false,
  error: null
};

export default function cryptosReducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_CRYPTOS_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_CRYPTOS_SUCCESS":
      return {
        ...state,
        loading: false,
        cryptos: action.payload.cryptos
      };

    case "FETCH_CRYPTOS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        cryptos: []
      };

    default:
      return state;
  }
}