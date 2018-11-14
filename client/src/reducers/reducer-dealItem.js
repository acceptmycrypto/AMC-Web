const initialState = {
  dealItem: null,
  acceptedCryptos: null,
  selectedOption: {value: "BTC", label: "Bitcoin (BTC)", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", name: "Bitcoin"},
  selectedSize: null,
  selectedColor: null,
  fullName: null,
  shippingAddress: null,
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
      return {
        ...state,
        loading: false,
        dealItem: action.payload.dealItem[0],
        acceptedCryptos: action.payload.dealItem[1]
      };

    case "FETCH_DEAL_ITEM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        dealItem: null,
        acceptedCryptos: null
      };

    case "SELECT_SIZE":
      return {
        ...state,
        selectedSize: action.payload
      };

    case "SELECT_COLOR":
      return {
        ...state,
        selectedColor: action.payload
      };


    case "FULL_NAME":
      return {
        ...state,
        fullName: action.payload
      };

    case "SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}