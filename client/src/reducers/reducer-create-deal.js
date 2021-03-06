import {EditorState, convertFromRaw} from 'draft-js';
import {
  UPDATING_EDITING_DEAL_BEGIN,
  UPDATING_EDITING_DEAL_SUCCESS,
  UPDATING_EDITING_DEAL_FAILURE,
  UPLOADING_IMAGES_BEGIN,
  UPLOADING_IMAGES_SUCCESS,
  UPLOADING_IMAGES_FAILURE,
  VIEW_UPLOADED_IMAGE,
  REMOVE_UPLOADED_IMAGE,
  SHOW_PHOTOS_UPLOADING,
  SHOW_PRICING,
  SHOW_DESCRIPTION,
  CHANGE_DISCOUNT_PERCENTAGE,
  CHANGE_BASE_PRICE,
  DELETE_DEAL_BEGIN,
  DELETE_DEAL_SUCCESS,
  DELETE_DEAL_FAILURE,
  OPEN_MODAL_PHONE_VERIFICATION,
  EDIT_LISTING,
  ONBLUR_BASE_PRICE_INPUT,
  GET_RATE_BEGIN,
  GET_RATE_FAILURE,
  GET_RATE_SUCCESS,
  SELECT_LABEL_OPTION_PREPAID,
  SELECT_LABEL_OPTION_SELLER,
  SELECT_WEIGHT_OPTION,
  EXIT_SHIPPING_MODAL,
  SAVE_SHIPPING_MODAL,
  SHOW_WEIGHT_MODAL,
  SELLER_EARNS_USD,
  SELLER_EARNS_CRYPTO,
  EDIT_DEAL_NAME,
  SELECT_CATEGORY,
  SELECT_CONDITION,
  EDIT_DETAIL,
  CREATING_DEAL_SUCCESS,
  CREATING_DEAL_FAILURE,
  CLOSE_DEAL_CREATED_MODAL,
  OPEN_ALERT_EDIT_CANCEL_MODAL,
  CLOSE_ALERT_EDIT_CANCEL_MODAL,
  OPEN_DELETE_ALERT_MODAL,
  CLOSE_DELETE_ALERT_MODAL,
  RESET_EDIT_LISTING,
  RESET_DEAL_CREATED,
  EDIT_SELLER_FIRSTNAME,
  EDIT_SELLER_LASTNAME,
  EDIT_SELLER_ADDRESS,
  EDIT_SELLER_CITY,
  EDIT_SELLER_STATE,
  EDIT_SELLER_ZIPCODE,
  VERIFY_SELLER_BEGIN,
  VERIFY_SELLER_SUCCESS,
  VERIFY_SELLER_FAILURE,
  EDIT_SELLER_VERIFICATION_TOKEN,
  CHECK_CODE_BEGIN,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_FAILURE,
  REMOVE_SELECTED_CRYPTO,
  CREATING_DEAL_BEGIN,
  EDIT_PHONE_NUMBER
} from "../actions/listDealActions";




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
  priceInUSD: null,
  priceInCrypto: null,
  crypto_amount: {},
  gettingRate: {},
  shippingLabelSelection: "",
  shippingWeightSelection: null,
  shippingPriceSelection: null,
  shippingLessThanDiscount: false,
  sellerEarnsUSD: null,
  sellerEarnsCrypto: null,
  sellerProfitsUSD: null,
  sellerProfitsCrypto: null,
  dealName: "",
  selectedCategory: "",
  selectedCondition: "", //important! Selected condition cannot by null by default, otherwist app will crash.
  editorState: EditorState.createEmpty(),
  creatingDeal: false,
  editingDeal: false,
  editingDealId: null,
  updateEditingLoading: false,
  dealEdited: {},
  dealEditedError: null,
  alertEditCancelModalVisible: false,
  creatingDealError: null,
  alertDeleteModalVisible: false,
  dealCreated: {},
  dealDeleted: {},
  deletingDealError: null,
  deletingDealLoading: null,
  modalVisible: false,
  phoneNumber: null,
  sellerFirstname: null,
  sellerLastname: null,
  sellerAddress: null,
  sellerCity: null,
  sellerState: null,
  sellerZipcode: null,
  sendingCode: false,
  sendingCodeSuccess: {},
  sendingCodeError: null,
  sellerVerificationToken: null,
  checkingCodeLoading: false,
  checkingCodeSuccess: {},
  checkingCodeError: null
};

const handleImagesUpload = (images, imageObj) => {
  let newImageArr = [...images];
  newImageArr.push(imageObj);

  return newImageArr
}

const handleImageRemove = (images, imageKey) => {
  let newImageArr = images.filter(img => img.key !== imageKey);
  return newImageArr
}

const calculateDiscountPrice = (basePrice, discount) => {
  // return basePrice - (basePrice * (discount/100))
  return ((100-discount)/100) * basePrice;
}

const isShippingPriceHigher = (shippingPrice, discountPrice) =>{
  let discountCalc = (parseFloat(discountPrice) * 0.975);
  if(parseFloat(shippingPrice) <= discountCalc){
    return false;
  }
  else{
    return true;
  }

}

const calculateDiscountPercentage = (pay_in_dollar, pay_in_crypto) =>{
    return Math.ceil((pay_in_crypto * 100)/ pay_in_dollar);
}

export default function CreateDealReducer(state = initialState, action) {
  switch(action.type) {
    case UPLOADING_IMAGES_BEGIN:
      return {
        ...state,
        uploading: true,
        error: null
      };

    case UPLOADING_IMAGES_SUCCESS:
      return {
        ...state,
        uploading: false,
        imageData: action.payload,
        imageView: action.payload.Location,
        images: handleImagesUpload(state.images, action.payload)
      };

    case UPLOADING_IMAGES_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
        imageData: null,
        imageView: "",
        images: []
      };

    case VIEW_UPLOADED_IMAGE:
      return {
        ...state,
        imageView: action.payload
      };

    case REMOVE_UPLOADED_IMAGE:
      return {
        ...state,
        images: handleImageRemove(state.images, action.payload)
      };

    case SHOW_PHOTOS_UPLOADING:
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case SHOW_PRICING:
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case SHOW_DESCRIPTION:
      return {
        ...state,
        showPhotosStep: action.payload.showPhotosStep,
        showPricingStep: action.payload.showPricingStep,
        showDescriptionStep: action.payload.showDescriptionStep
      };

    case CHANGE_DISCOUNT_PERCENTAGE:
      let discountPriceOnPercentageChange = calculateDiscountPrice(state.priceInUSD, action.payload).toFixed(2)
      return {
        ...state,
        discountPercent: action.payload,
        priceInCrypto: discountPriceOnPercentageChange
      };

    case CHANGE_BASE_PRICE:
      let discountPrice = calculateDiscountPrice(action.payload, state.discountPercent).toFixed(2)
      return {
        ...state,
        priceInUSD: action.payload,
        priceInCrypto: discountPrice
      };

    case ONBLUR_BASE_PRICE_INPUT:
      return {
        ...state,
        priceInUSD: action.payload,
      };

    case GET_RATE_BEGIN:
      return {
        ...state,
        gettingRate: {[action.payload.crypto_symbol] : true},
        error: null
      };

    case GET_RATE_SUCCESS:

      return {
        ...state,
        gettingRate: {[action.payload.crypto_symbol] : false},
        crypto_amount: {...state.crypto_amount, [action.payload.crypto_symbol] : action.payload.crypto_amount} //this keeps adding new property to the crypto_amount object
      };

    case GET_RATE_FAILURE:
      return {
        ...state,
        gettingRate: false,
        error: action.payload.error,
      };

    case REMOVE_SELECTED_CRYPTO:
     //To remove the selected crypto, set the crypto_symbol to undefined
      return {
        ...state,
        crypto_amount: {...state.crypto_amount, [action.payload.crypto_symbol] : undefined}
      };

    case SELECT_LABEL_OPTION_PREPAID:
      return {
        ...state,
        shippingLabelSelection: action.payload,
        modalVisible: true
      };

    case SELECT_LABEL_OPTION_SELLER:
      return {
        ...state,
        shippingLabelSelection: action.payload,
        shippingWeightSelection: null,
        shippingPriceSelection: null,
        modalVisible: false,
      };
    case SELECT_WEIGHT_OPTION:
      return {
        ...state,
        shippingWeightSelection: action.payload.shippingWeightSelection,
        shippingPriceSelection: action.payload.shippingPriceSelection,
        shippingLessThanDiscount: isShippingPriceHigher(action.payload.shippingPriceSelection, state.priceInCrypto)
      };

    case EXIT_SHIPPING_MODAL:
      return {
        ...state,
        shippingLabelSelection: "",
        shippingWeightSelection: null,
        shippingPriceSelection: null,
        modalVisible: false
      };

    case SAVE_SHIPPING_MODAL:
      return {
        ...state,
        modalVisible: false,
        priceInUSD: action.payload.priceInUSD,
        priceInCrypto: action.payload.priceInCrypto
      };

    case SHOW_WEIGHT_MODAL:
      return {
        ...state,
        modalVisible: true
      };

    case SELLER_EARNS_USD:
      return {
        ...state,
        sellerEarnsUSD: action.payload.sellerEarnsUSD,
        sellerProfitsUSD: action.payload.sellerProfitsUSD
      };

    case SELLER_EARNS_CRYPTO:
      return {
        ...state,
        sellerEarnsCrypto: action.payload.sellerEarnsCrypto,
        sellerProfitsCrypto: action.payload.sellerProfitsCrypto
      };

    case EDIT_DEAL_NAME:
      return {
        ...state,
        dealName: action.payload
      };


    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload.categoriesSelected
      };

    case SELECT_CONDITION:
      return {
        ...state,
        selectedCondition: action.payload.selectedCondition
      };

    case EDIT_DETAIL:
       return {
         ...state,
         editorState: action.payload
       };

    case CREATING_DEAL_BEGIN:
      return {
        ...state,
        creatingDeal: true,
        creatingDealError: null
      };

    case CREATING_DEAL_SUCCESS:
      return {
        ...state,
        creatingDeal: false,
        dealCreated: action.payload,
        modalVisible: true
      };

    case CREATING_DEAL_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload.error,
      };

    case CLOSE_DEAL_CREATED_MODAL:
      return {
        ...state,
        modalVisible: action.payload.modalVisible
      };

    case UPDATING_EDITING_DEAL_BEGIN:
      return {
        ...state,
        updateEditingLoading: true,
        dealEditedError: null
      };

    case UPDATING_EDITING_DEAL_SUCCESS:
      return {
        ...state,
        updateEditingLoading: false,
        editingDeal: false,
        dealEdited: action.payload
      };

    case UPDATING_EDITING_DEAL_FAILURE:
      return {
        ...state,
        updateEditingLoading: false,
        dealEdited: action.payload.error,
      };

    case OPEN_ALERT_EDIT_CANCEL_MODAL:
      return {
        ...state,
        alertEditCancelModalVisible: action.payload.visible
      };

    case CLOSE_ALERT_EDIT_CANCEL_MODAL:
      return {
        ...state,
        alertEditCancelModalVisible: action.payload.visible
      };

    case OPEN_DELETE_ALERT_MODAL:
      return {
        ...state,
        alertDeleteModalVisible: action.payload.visible
      };

    case CLOSE_DELETE_ALERT_MODAL:
      return {
        ...state,
        alertDeleteModalVisible: action.payload.visible
      };

    case RESET_EDIT_LISTING:
      return {
        ...initialState
      };

    case RESET_DEAL_CREATED:
      return {
        ...initialState
      };

    case EDIT_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };

      case EDIT_SELLER_FIRSTNAME:
      return {
        ...state,
        sellerFirstname: action.payload
      };

      case EDIT_SELLER_LASTNAME:
      return {
        ...state,
        sellerLastname: action.payload
      };

    case EDIT_SELLER_ADDRESS:
      return {
        ...state,
        sellerAddress: action.payload
      };

    case EDIT_SELLER_CITY:
      return {
        ...state,
        sellerCity: action.payload
      };

    case EDIT_SELLER_STATE:
      return {
        ...state,
        sellerState: action.payload.state
      };

    case EDIT_SELLER_ZIPCODE:
      return {
        ...state,
        sellerZipcode: action.payload
      };

    case VERIFY_SELLER_BEGIN:
      return {
        ...state,
        sendingCode: true,
        sendingCodeError: null
      };

    case VERIFY_SELLER_SUCCESS:
      return {
        ...state,
        sendingCode: false,
        sendingCodeSuccess: action.payload
      };

    case VERIFY_SELLER_FAILURE:
      return {
        ...state,
        sendingCode: false,
        sendingCodeError: action.payload.error,
      };

    case EDIT_SELLER_VERIFICATION_TOKEN:
      return {
        ...state,
        sellerVerificationToken: action.payload
      };

    case CHECK_CODE_BEGIN:
      return {
        ...state,
        checkingCodeLoading: true,
        sendingCodeError: null
      };

    case CHECK_CODE_SUCCESS:
      return {
        ...state,
        checkingCodeLoading: false,
        checkingCodeSuccess: action.payload
      };

    case CHECK_CODE_FAILURE:
      return {
        ...state,
        checkingCodeLoading: false,
        checkingCodeError: action.payload.error,
      };

    case EDIT_LISTING:
      let {deal_name, pay_in_crypto, pay_in_dollar, deal_category, item_condition,deal_image_object, deal_description, deal_id, shipping_label_status, weight, shipment_cost} = action.payload.dealItem;

      let deal_selected_cryptos = {};
      for (let crypto in action.payload.acceptedCryptos) {
        let cryptoSymbol = action.payload.acceptedCryptos[crypto].crypto_symbol
        deal_selected_cryptos = {...deal_selected_cryptos, [cryptoSymbol] : ""}
      }

      let deal_selected_category = [];
      let categoryObj = {};
      for (let category in deal_category) {
        let value = deal_category[category];
        let label = deal_category[category];
        categoryObj = {label, value}
        deal_selected_category.push(categoryObj);
      }

      let deal_item_condition = {label: item_condition, value: item_condition}

      let dealDescription = convertFromRaw(JSON.parse(deal_description));
      let editorState = EditorState.createWithContent(dealDescription);


      return {
        ...state,
        editingDeal: true,
        editingDealId: deal_id,
        dealName: deal_name,
        priceInUSD: pay_in_dollar,
        priceInCrypto: pay_in_crypto,
        discountPercent: calculateDiscountPercentage(pay_in_dollar, pay_in_crypto),
        images: deal_image_object,
        imageData: deal_image_object[0],
        imageView: deal_image_object[0].Location,
        crypto_amount: deal_selected_cryptos,
        selectedCategory: deal_selected_category,
        selectedCondition: deal_item_condition,
        editorState,
        shippingLabelSelection: shipping_label_status,
        shippingWeightSelection: weight,
        shippingPriceSelection: shipment_cost
      };

    case DELETE_DEAL_BEGIN:
      return {
        ...state,
        deletingDealLoading: true,
        deletingDealError: null
      };

    case DELETE_DEAL_SUCCESS:
      return {
        ...state,
        deletingDealLoading: false,
        dealDeleted: action.payload
      };

    case DELETE_DEAL_FAILURE:
      return {
        ...state,
        deletingDealLoading: false,
        deletingDealError: action.payload.error,
      };

    case OPEN_MODAL_PHONE_VERIFICATION:
      return {
        ...state,
        modalVisible: true
      };


    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}