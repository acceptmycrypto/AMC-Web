const initialState = {
  subscriptionMessage: "",
  loading: false,
  error: null
};

export default function vendorReducer(state = initialState, action) {
  switch(action.type) {
    case "SUBMIT_VENDOR_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "SUBMIT_VENDOR_SUCCESS":
    console.log(action.payload.message);
      return {
        ...state,
        loading: false,
        subscriptionMessage: action.payload.message
      };

    case "SUBMIT_VENDOR_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        subscriptionMessage: ""
      };

    default:
      return state;
  }
}