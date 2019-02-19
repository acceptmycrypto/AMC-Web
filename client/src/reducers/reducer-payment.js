const initialState = {
  transactionInfo: null,
  createPaymentButtonClicked: false,
  loading: false,
  error: null,
  deal_status: null
};

export default function paymentTransactionReducer(state = initialState, action) {
  switch(action.type) {
    case "CREATE_TRANSACTION_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "CREATE_TRANSACTION_SUCCESS":
      return {
        ...state,
        loading: false,
        transactionInfo: action.payload.transactionInfo.paymentInfo,
        deal_status: action.payload.transactionInfo.deal_status,
        createPaymentButtonClicked: true,
      };

    case "CREATE_TRANSACTION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactionInfo: null,
        deal_status: null,
        createPaymentButtonClicked: false,
      };

      case "CREATE_GUEST_TRANSACTION_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "CREATE_GUEST_TRANSACTION_SUCCESS":
      return {
        ...state,
        loading: false,
        transactionInfo: action.payload.transactionInfo.paymentInfo,
        deal_status: action.payload.transactionInfo.deal_status,
        createPaymentButtonClicked: true,
      };

    case "CREATE_GUEST_TRANSACTION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactionInfo: null,
        createPaymentButtonClicked: false,
        deal_status: null,
      };

    case "LOCATION_CHANGE":
      return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}