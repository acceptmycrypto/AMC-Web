const initialState = {
  imageData: {},
  images: [],
  imageView: "",
  uploading: false,
  error: null,
  showPhotosStep: true,
  showPricingStep: false,
  showDescriptionStep: false,
  discountPercent: 10,
  priceInUSD: "",
  priceInCrypto: "",
  crypto_amount: {},
  gettingRate: {}
};

const handleImagesUpload = (images, imageObj) => {
  images.push(imageObj);
}

const handleImageRemove = (images, imageKey) => {
  debugger
  let newImageArr = images.filter(img => img.key !== imageKey);
  return newImageArr
}

const CalculateDiscountPrice = (basePrice, discount) => {
  return basePrice - (basePrice * (discount/100))
}

export default function CreateDealReducer(state = initialState, action) {

  switch(action.type) {
    case "UPLOADING_IMAGES_BEGIN":
      return {
        ...state,
        uploading: true,
        error: null
      };

    case "UPLOADING_IMAGES_SUCCESS":
      handleImagesUpload(state.images, action.payload);
      return {
        ...state,
        uploading: false,
        imageData: action.payload,
        imageView: action.payload.Location
      };

    case "UPLOADING_IMAGES_FAILURE":
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        imageData: null,
        imageView: "",
        images: []
      };

    case "VIEW_UPLOADED_IMAGE":
      return {
        ...state,
        imageView: action.payload
      };

    case "REMOVE_UPLOADED_IMAGE":
      return {
        ...state,
        images: handleImageRemove(state.images, action.payload)
      };

    case "SHOW_PHOTOS_UPLOADING":
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case "SHOW_PRICING":
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case "SHOW_DESCRIPTION":
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case "CHANGE_DISCOUNT_PERCENTAGE":
      let discountPriceOnPercentageChange = CalculateDiscountPrice(state.priceInUSD, action.payload).toFixed(2)
      return {
        ...state,
        discountPercent: action.payload,
        priceInCrypto: discountPriceOnPercentageChange
      };

    case "CHANGE_BASE_PRICE":
      let discountPrice = CalculateDiscountPrice(action.payload, state.discountPercent).toFixed(2)
      return {
        ...state,
        priceInUSD: action.payload,
        priceInCrypto: discountPrice
      };

    case "ONBLUR_BASE_PRICE_INPUT":
      return {
        ...state,
        priceInUSD: action.payload,
      };

    case "GET_RATE_BEGIN":
    debugger
      return {
        ...state,
        gettingRate: {[action.payload.crypto_symbol] : true},
        error: null
      };

    case "GET_RATE_SUCCESS":
    debugger
      return {
        ...state,
        gettingRate: {[action.payload.crypto_symbol] : false},
        crypto_amount: {[action.payload.crypto_symbol] : action.payload.crypto_amount}
      };

    case "GET_RATE_FAILURE":
      return {
        ...state,
        gettingRate: false,
        error: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}