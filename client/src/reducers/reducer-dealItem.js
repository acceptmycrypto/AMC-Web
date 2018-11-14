const initialState = {
  dealItem: null,
  acceptedCryptos: null,
  selectedOption: {value: "BTC", label: "Bitcoin (BTC)", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", name: "Bitcoin"},
  selectedSize: null,
  selectedColor: null,
  fullName: null,
  address: null,
  city: null,
  zipcode: null,
  shippingState: null,
  transactionInfo: null,
  paidIn: null,
  purchasing: false,
  transactionLoading: false,
  loading: false,
  error: null
};

export default function dealItemReducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_DEAL_ITEM_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_DEAL_ITEM_SUCCESS":
    debugger
      return {
        ...state,
        loading: false,
        dealItem: action.payload.dealItem[0],
        acceptedCryptos: action.payload.dealItem[1]
      };

    case "FETCH_DEAL_ITEM_FAILURE":
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        dealItem: null,
        acceptedCryptos: null
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}