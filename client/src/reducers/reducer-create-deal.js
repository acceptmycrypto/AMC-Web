import {EditorState} from 'draft-js';

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
  gettingRate: {},
  dealName: "",
  parentCategory: [],
  selectedCategory: null,
  selectedCondition: null,
  editorState: EditorState.createEmpty(),
  creatingDeal: false,
  creatingDealError: null,
  dealCreated: null,
  modalVisible: false
};

const handleImagesUpload = (images, imageObj) => {
  images.push(imageObj);
}

const handleImageRemove = (images, imageKey) => {
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
      return {
        ...state,
        gettingRate: {[action.payload.crypto_symbol] : false},
        crypto_amount: {...state.crypto_amount, [action.payload.crypto_symbol] : action.payload.crypto_amount} //this keeps adding new property to the crypto_amount object
      };

    case "GET_RATE_FAILURE":
      return {
        ...state,
        gettingRate: false,
        error: action.payload.error,
      };

    case "REMOVE_SELECTED_CRYPTO":
     //To remove the selected crypto, set the crypto_symbol to undefined
      return {
        ...state,
        crypto_amount: {...state.crypto_amount, [action.payload.crypto_symbol] : undefined}
      };

    case "EDIT_DEAL_NAME":
      return {
        ...state,
        dealName: action.payload
      };

    case "FETCH_CATEGORY_SUCCESS":
      return {
        ...state,
        parentCategory: action.payload.parentCategory
      };

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory
      };

    case "SELECT_CONDITION":
      return {
        ...state,
        selectedCondition: action.payload.selectedCondition
      };

    case "EDIT_DETAIL":
       return {
         ...state,
         editorState: action.payload
       };

    case "CREATING_DEAL_BEGIN":
      return {
        ...state,
        creatingDeal: true,
        creatingDealError: null
      };

    case "CREATING_DEAL_SUCCESS":
      return {
        ...state,
        creatingDeal: false,
        dealCreated: action.payload,
        modalVisible: true
      };

    case "CREATING_DEAL_FAILURE":
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
      };

    case "CLOSE_DEAL_CREATED_MODAL":
      return {
        ...state,
        modalVisible: action.payload.modalVisible
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}