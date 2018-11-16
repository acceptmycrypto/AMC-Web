const initialState = {
  transactionInfo: null,
  createPaymentButtonClicked: false,
  loading: false,
  error: null
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
    debugger
      return {
        ...state,
        loading: false,
        transactionInfo: action.payload.transactionInfo,
        createPaymentButtonClicked: true,
      };

    case "CREATE_TRANSACTION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        transactionInfo: null,
        createPaymentButtonClicked: false,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}