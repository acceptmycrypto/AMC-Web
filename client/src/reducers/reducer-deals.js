const initialState = {
  deals: [],
  loading: false,
  error: null,
  trackingNumber: null, 
  trackingCarrier: [{ value: 'dhl_express', label: 'DHL Express' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'ups', label: 'UPS' },
  { value: 'usps', label: 'USPS' }],
  trackingCarrierSelected: null,
  trackingResult: null,
};
	
	
	
	

export default function dealsReducer(state = initialState, action) {
  switch(action.type) {
    case "FETCH_DEALS_BEGIN":
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_DEALS_SUCCESS":
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
     console.log("Deals have successfully called!")
     console.log(action);
      return {
        ...state,
        loading: false,
        deals: action.payload.deals
      };

    case "FETCH_DEALS_FAILURE":
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        deals: []
      };

    case "EDIT_TRACKING_NUMBER":
      return {
        ...state,
        trackingNumber: action.payload
      };

      case "EDIT_TRACKING_CARRIER":
      return {
        ...state,
        trackingCarrierSelected: action.payload
      };

      case "UPDATE_TRACKING_NUMBER_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "UPDATE_TRACKING_NUMBER_SUCCESS":
      return {
        ...state,
        loading: false,
        trackingResult: action.payload
      };

    case "UPDATE_TRACKING_NUMBER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}