const initialState = {
  transactionInfo: null,
  createPaymentButtonClicked: false,
  loading: false,
  error: null,
  deal_status: null,
  paypal_create_payment: {},
  paypal_create_payment_loading: null,
  paypal_create_payment_error: null,
  paypal_excecute_payment: {},
  paypal_excecute_payment_loading: null,
  paypal_excecute_payment_error: null
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

    case "CREATE_PAYPAL_TRANSACTION_BEGIN":
      return {
        ...state,
        paypal_create_payment_loading: true,
        paypal_create_payment_error: null
      };

    case "CREATE_PAYPAL_TRANSACTION_SUCCESS":
      return {
        ...state,
        paypal_create_payment_loading: false,
        paypal_create_payment: action.payload.paypalTransaction
      };

    case "CREATE_PAYPAL_TRANSACTION_FAILURE":
      return {
        ...state,
        paypal_create_payment_loading: false,
        paypal_create_payment_error: action.payload.error
      };

    case "EXECUTE_PAYPAL_TRANSACTION_BEGIN":
      return {
        ...state,
        paypal_excecute_payment_loading: true,
        paypal_excecute_payment_error: null
      };

    case "EXECUTE_PAYPAL_TRANSACTION_SUCCESS":
  
      return {
        ...state,
        paypal_excecute_payment_loading: false,
        paypal_excecute_payment: action.payload.paypalTransactionExecution
      };

    case "EXECUTE_PAYPAL_TRANSACTION_FAILURE":
      return {
        ...state,
        paypal_excecute_payment_loading: false,
        paypal_excecute_payment_error: action.payload.error
      };

    case "LOCATION_CHANGE":
      return initialState;

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}