const initialState = {
  dealItem: null,
  acceptedCryptos: null,
  firstName: null,
  lastName: null,
  shippingAddress: null,
  shippingCity: null,
  zipcode: null,
  shippingState: null,
  email: null,
  phoneNumber: null,
  selectedOption: null,
  showDetailStep: true,
  showShippingStep: false,
  showPayingStep: false,
  paidIn: null,
  purchasing: false,
  transactionLoading: false,
  loading: false,
  error: null,
  states: [{ label: 'AL', value: 'Alabama' }, { label: 'AK', value: 'Alaska' }, { label: 'AZ', value: 'Arizona' }, { label: 'AR', value: 'Arkansas' },
  { label: 'CA', value: 'California' }, { label: 'CO', value: 'Colorado' }, { label: 'CT', value: 'Connecticut' },
  { label: 'DE', value: 'Delaware' }, { label: 'FL', value: 'Florida' }, { label: 'GA', value: 'Georgia' }, { label: 'HI', value: 'Hawaii' },
  { label: 'ID', value: 'Idaho' }, { label: 'IL', value: 'Illinois' }, { label: 'IN', value: 'Indiana' }, { label: 'IA', value: 'Iowa' },
  { label: 'KS', value: 'Kansas' }, { label: 'KY', value: 'Kentucky' }, { label: 'LA', value: 'Louisiana' },
  { label: 'ME', value: 'Maine' }, { label: 'MD', value: 'Maryland' }, { label: 'MA', value: 'Massachusetts' }, { label: 'MI', value: 'Michigan' },
  { label: 'MN', value: 'Minnesota' }, { label: 'MS', value: 'Mississippi' }, { label: 'MO', value: 'Missouri' }, { label: 'MT', value: 'Montana' },
  { label: 'NE', value: 'Nebraska' }, { label: 'NV', value: 'Nevada' }, { label: 'NH', value: 'New Hampshire' }, { label: 'NJ', value: 'New Jersey' },
  { label: 'NM', value: 'New Mexico' }, { label: 'NY', value: 'New York' }, { label: 'NC', value: 'North Carolina' }, { label: 'ND', value: 'North Dakota' },
  { label: 'OH', value: 'Ohio' }, { label: 'OK', value: 'Oklahoma' }, { label: 'OR', value: 'Oregon' }, { label: 'PA', value: 'Pennsylvania' },
  { label: 'RI', value: 'Rhode Island' }, { label: 'SC', value: 'South Carolina' }, { label: 'SD', value: 'South Dakota' }, { label: 'TN', value: 'Tennessee' },
  { label: 'TX', value: 'Texas' }, { label: 'UT', value: 'Utah' }, { label: 'VT', value: 'Vermont' }, { label: 'VA', value: 'Virginia' },
  { label: 'WA', value: 'Washington' }, { label: 'WV', value: 'West Virginia' }, { label: 'WI', value: 'Wisconsin' }, { label: 'WY', value: 'Wyoming' }
  ]
};

export default function dealItemReducer(state = initialState, action) {
  switch (action.type) {
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
        acceptedCryptos: action.payload.dealItem[1],
        states: initialState.states
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

    case "FIRST_NAME":
      return {
        ...state,
        firstName: action.payload
      };

    case "LAST_NAME":
      return {
        ...state,
        lastName: action.payload
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

    case "SHIPPING_EMAIL":
      return {
        ...state,
        email: action.payload
      };

    case "SHIPPING_PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.payload
      };

    case "SELECT_PAYMENT":
      return {
        ...state,
        selectedOption: action.payload.selectedOption
      };

    case "SHOW_DETAIL":
      return {
        ...state,
        showDetailStep: action.payload.showDetailStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    case "SHOW_SHIPPING":
      return {
        ...state,
        showDetailStep: action.payload.showDetailStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    case "SHOW_PAYING":
      return {
        ...state,
        showDetailStep: action.payload.showDetailStep,
        showShippingStep: action.payload.showShippingStep,
        showPayingStep: action.payload.showPayingStep
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}