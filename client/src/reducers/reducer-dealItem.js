const initialState = {
  dealItem: null,
  acceptedCryptos: null,
  selectedSize: null,
  selectedColor: null,
  fullName: null,
  shippingAddress: null,
  shippingCity: null,
  zipcode: null,
  shippingState: null,
  selectedOption: null,
  showCustomizationStep: true,
  showShippingStep: false,
  showPayingStep: false,
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

    case "LOCATION_CHANGE":
      return initialState;

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

    case "SHIPPING_CITY":
      return {
        ...state,
        shippingCity: action.payload
      };

    case "ZIP_CODE":
      return {
        ...state,
        zipcode: action.payload
      };

    case "SHIPPING_STATE":
      return {
        ...state,
        shippingState: action.payload
      };

    case "SELECT_PAYMENT":
      return {
        ...state,
        selectedOption: action.payload.selectedOption
      };

    case "SHOW_CUSTOMIZATION":
      return {
        ...state,
        showCustomizationStep: action.payload.showCustomizationStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    case "SHOW_SHIPPING":
      return {
        ...state,
        showCustomizationStep: action.payload.showCustomizationStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    case "SHOW_PAYING":
      return {
        ...state,
        showCustomizationStep: action.payload.showCustomizationStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}