export const UPDATING_EDITING_DEAL_BEGIN = "UPDATING_EDITING_DEAL_BEGIN";
export const UPDATING_EDITING_DEAL_SUCCESS = "UPDATING_EDITING_DEAL_SUCCESS";
export const UPDATING_EDITING_DEAL_FAILURE = "UPDATING_EDITING_DEAL_FAILURE";
export const UPLOADING_IMAGES_BEGIN = "UPLOADING_IMAGES_BEGIN";
export const UPLOADING_IMAGES_SUCCESS = "UPLOADING_IMAGES_SUCCESS";
export const UPLOADING_IMAGES_FAILURE = "UPLOADING_IMAGES_FAILURE";
export const VIEW_UPLOADED_IMAGE = "VIEW_UPLOADED_IMAGE";
export const REMOVE_UPLOADED_IMAGE = "REMOVE_UPLOADED_IMAGE";
export const SHOW_PHOTOS_UPLOADING = "SHOW_PHOTOS_UPLOADING";
export const SHOW_PRICING = "SHOW_PRICING";
export const SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
export const CHANGE_DISCOUNT_PERCENTAGE = "CHANGE_DISCOUNT_PERCENTAGE";
export const CHANGE_BASE_PRICE = "CHANGE_BASE_PRICE" ;
export const ONBLUR_BASE_PRICE_INPUT = "ONBLUR_BASE_PRICE_INPUT";
export const GET_RATE_BEGIN = "GET_RATE_BEGIN";
export const GET_RATE_SUCCESS = "GET_RATE_SUCCESS";
export const GET_RATE_FAILURE = "GET_RATE_FAILURE";
export const REMOVE_SELECTED_CRYPTO = "REMOVE_SELECTED_CRYPTO";
export const SELECT_LABEL_OPTION_PREPAID = "SELECT_LABEL_OPTION_PREPAID";
export const SELECT_LABEL_OPTION_SELLER = "SELECT_LABEL_OPTION_SELLER";
export const SELECT_WEIGHT_OPTION = "SELECT_WEIGHT_OPTION";
export const EXIT_SHIPPING_MODAL = "EXIT_SHIPPING_MODAL";
export const SAVE_SHIPPING_MODAL = "SAVE_SHIPPING_MODAL";
export const SHOW_WEIGHT_MODAL = "SHOW_WEIGHT_MODAL";
export const SELLER_EARNS_CRYPTO = "SELLER_EARNS_CRYPTO";
export const SELLER_EARNS_USD = "SELLER_EARNS_USD";
export const EDIT_DEAL_NAME = "EDIT_DEAL_NAME";
export const EDIT_DETAIL = "EDIT_DETAIL";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SELECT_CONDITION = "SELECT_CONDITION";
export const CREATING_DEAL_BEGIN = "CREATING_DEAL_BEGIN";
export const CREATING_DEAL_SUCCESS = "CREATING_DEAL_SUCCESS";
export const CREATING_DEAL_FAILURE = "CREATING_DEAL_FAILURE";
export const OPEN_MODAL_PHONE_VERIFICATION = "OPEN_MODAL_PHONE_VERIFICATION";
export const CLOSE_DEAL_CREATED_MODAL = "CLOSE_DEAL_CREATED_MODAL"; 
export const RESET_DEAL_CREATED = "RESET_DEAL_CREATED";
export const EDIT_PHONE_NUMBER = "EDIT_PHONE_NUMBER";
export const EDIT_SELLER_FIRSTNAME = "EDIT_SELLER_FIRSTNAME";
export const EDIT_SELLER_LASTNAME = "EDIT_SELLER_LASTNAME";
export const EDIT_SELLER_ADDRESS = "EDIT_SELLER_ADDRESS";
export const EDIT_SELLER_CITY = "EDIT_SELLER_CITY";
export const EDIT_SELLER_STATE = "EDIT_SELLER_STATE";
export const EDIT_SELLER_ZIPCODE = "EDIT_SELLER_ZIPCODE";
export const VERIFY_SELLER_BEGIN = "VERIFY_SELLER_BEGIN";
export const VERIFY_SELLER_SUCCESS = "VERIFY_SELLER_SUCCESS";
export const VERIFY_SELLER_FAILURE = "VERIFY_SELLER_FAILURE";
export const EDIT_SELLER_VERIFICATION_TOKEN = "EDIT_SELLER_VERIFICATION_TOKEN";
export const CHECK_CODE_BEGIN = "CHECK_CODE_BEGIN";
export const CHECK_CODE_SUCCESS = "CHECK_CODE_SUCCESS";
export const CHECK_CODE_FAILURE = "CHECK_CODE_FAILURE";
export const EDIT_LISTING = "EDIT_LISTING";
export const RESET_EDIT_LISTING = "RESET_EDIT_LISTING";
export const OPEN_ALERT_EDIT_CANCEL_MODAL = "OPEN_ALERT_EDIT_CANCEL_MODAL";
export const CLOSE_ALERT_EDIT_CANCEL_MODAL = "CLOSE_ALERT_EDIT_CANCEL_MODAL";
export const OPEN_DELETE_ALERT_MODAL = "OPEN_DELETE_ALERT_MODAL";
export const CLOSE_DELETE_ALERT_MODAL = "CLOSE_DELETE_ALERT_MODAL";
export const DELETE_DEAL_BEGIN = "DELETE_DEAL_BEGIN";
export const DELETE_DEAL_SUCCESS = "DELETE_DEAL_SUCCESS";
export const DELETE_DEAL_FAILURE = "DELETE_DEAL_FAILURE"; 


export function _uploadImage(token, imageData) {
  //once image is uploaded, push that image to the state
  const settings = {
    method: "POST",
    headers: {
      Authorization: token, //verify the token in the headers
    },
    body: imageData
  };

  return dispatch => {
    dispatch(uploadingImageBegin());
    return fetch("/image/upload", settings)
      .then(res => res.json())
      .then(jsonImage => {
        dispatch(uploadingImageSuccess(jsonImage));
        return jsonImage;
      })
      .catch(error => dispatch(uploadingImageFailure(error)));
  };
}

export const uploadingImageBegin = () => ({
  type: UPLOADING_IMAGES_BEGIN
});

export const uploadingImageSuccess = imageData => ({
  type: UPLOADING_IMAGES_SUCCESS,
  payload: imageData
});

export const uploadingImageFailure = error => ({
  type: UPLOADING_IMAGES_FAILURE,
  payload: { error }
});

export const onSelectImageToView = (event) => {
  return {
      type: VIEW_UPLOADED_IMAGE,
      payload: event.target.getAttribute("src")
  }
};

export function _removeImage(token, imageKey, deal_editing) {
  //this action is being called when user"s click X on image

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, imageKey})
  };

  //if this listing deal is being creating, not editing, then we remove the image on the backend as well
  if(!deal_editing) {
    fetch("/image/remove", settings).then(res => res.json());
  }

  return {
    type: REMOVE_UPLOADED_IMAGE,
    payload: imageKey
  }
}

export const handleUploadingPhotosStep = () => {
  return {
    type: SHOW_PHOTOS_UPLOADING,
    payload: {
      showPhotosStep: true,
      showPricingStep: false,
      showDescriptionStep: false,
    }
  }
}

export const handlePricingStep = () => {
  return {
    type: SHOW_PRICING,
    payload: {
      showPhotosStep: false,
      showPricingStep: true,
      showDescriptionStep: false,
    }
  }
}

export const handleDescriptionStep = () => {
  return {
    type: SHOW_DESCRIPTION,
    payload: {
      showPhotosStep: false,
      showPricingStep: false,
      showDescriptionStep: true,
    }
  }
}

export const onDiscountPercentageToChange = (event) => {
  return {
      type: CHANGE_DISCOUNT_PERCENTAGE,
      payload: event.target.value
  }
};

export const OnUSDPriceChange = (event) => {

  return {
      type: CHANGE_BASE_PRICE,
      payload: event.target.value
  }
};

export const validateDecimalForBasePrice = (event) => {
  let basePrice = parseFloat(event.target.value).toFixed(2);
  return {
      type: ONBLUR_BASE_PRICE_INPUT,
      payload: basePrice
  }
};

//Get crypto rate
export function _getCryptoExchange(token, crypto_symbol, price_in_crypto) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, crypto_symbol, price_in_crypto})
  };

  return dispatch => {
    dispatch(getRateBegin(crypto_symbol));
    return fetch("/cryptocurrency/exchange", settings)
      .then(res => res.json())
      .then(jsonRate => {

        dispatch(getRateSuccess(crypto_symbol, jsonRate));
        return jsonRate;
      })
      .catch(error => dispatch(getRateFailure(error)));
  };
}

export const getRateBegin = crypto_symbol => ({
  type: GET_RATE_BEGIN,
  payload: {crypto_symbol}
});

export const getRateSuccess = (crypto_symbol, crypto_amount) => ({
  type: GET_RATE_SUCCESS,
  payload: {crypto_symbol, crypto_amount}
});

export const getRateFailure = error => ({
  type: GET_RATE_FAILURE,
  payload: { error }
});

export const removeSelectedCrypto = (crypto_symbol) => ({
  type: REMOVE_SELECTED_CRYPTO,
  payload: { crypto_symbol }
});


export const shippingLabelOption = event => {
  if(event.target.value === "prepaid"){
    return({
      type: SELECT_LABEL_OPTION_PREPAID,
      payload: event.target.value
    });
  }else{
    return({
      type: SELECT_LABEL_OPTION_SELLER,
      payload: event.target.value
    });
  }

}

export const weightOption = event => {
  let shippingPriceSelection;

  if(event.target.value == 1){
    shippingPriceSelection = 6.50;
  }else if (event.target.value == 3){
    shippingPriceSelection = 11.00;
  }else if (event.target.value == 10){
    shippingPriceSelection = 16.00;
  }else if (event.target.value == 20){
    shippingPriceSelection = 30.00;
  }else if (event.target.value == 40){
    shippingPriceSelection = 35.00;
  }else if (event.target.value == 70){
    shippingPriceSelection= 50.00;
  }
  return({
    type: SELECT_WEIGHT_OPTION,
    payload: {shippingWeightSelection: event.target.value, shippingPriceSelection: shippingPriceSelection.toFixed(2)}
  });

};

export const _exitShippingModal = () => ({
  type: EXIT_SHIPPING_MODAL,
});

export const _saveShippingModal = (priceInUSD, priceInCrypto) => ({
  type: SAVE_SHIPPING_MODAL,
  payload: {priceInUSD, priceInCrypto}
});


export const _showWeightModal = () => ({
  type: SHOW_WEIGHT_MODAL,
});


export const _sellerEarnCrypto = (sellerEarnsCrypto, sellerProfitsCrypto) =>({
  type: SELLER_EARNS_CRYPTO,
  payload: {sellerEarnsCrypto, sellerProfitsCrypto}
});

export const _sellerEarnUSD = (sellerEarnsUSD, sellerProfitsUSD) =>({
  type: SELLER_EARNS_USD,
  payload: {sellerEarnsUSD, sellerProfitsUSD}
});

export const onEditingDealName = event => ({
  type: EDIT_DEAL_NAME,
  payload: event.target.value
});

export const onEditingDetail = editorState => ({
  type: EDIT_DETAIL,
  payload: editorState
});

export const handleSelectedCategory = (categoriesSelected) => {
  return {
    type: SELECT_CATEGORY,
    payload: {categoriesSelected}
  }
};

export const handleSelectedCondition = (selectedCondition) => {
  return {
    type: SELECT_CONDITION,
    payload: {selectedCondition}
  }
};

export function _submitDeal(token, dealName, category, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos, label_status, weight, shipping_cost) {

  //create a new array to get the value of categories: ex [value1, value2]
  let categoriesSelected = [...category]
  let selectedCategory = [];
  categoriesSelected.map(categ => {
    selectedCategory.push(categ.value);
  })
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos, label_status, weight, shipping_cost})
  };

  return dispatch => {
    dispatch(creatingDealBegin());
    return fetch("/listdeal", settings)
      .then(res => res.json())
      .then(jsonDealCreated => {

        dispatch(creatingDealSuccess(jsonDealCreated));
        return jsonDealCreated;
      })
      .catch(error => dispatch(creatingDealFailure(error)));
  };
}

export const creatingDealBegin = () => ({
  type: CREATING_DEAL_BEGIN
});

export const creatingDealSuccess = dealCreated => ({
  type: CREATING_DEAL_SUCCESS,
  payload: dealCreated
});

export const creatingDealFailure = error => ({
  type: CREATING_DEAL_FAILURE,
  payload: { error }
});

export function _updateEditingDeal(token, editingDealId, dealName, category, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos, label_status, weight, shipping_cost) {

  //create a new array to get the value of categories: ex [value1, value2]
  let categoriesSelected = [...category]
  let selectedCategory = [];
  categoriesSelected.map(categ => {
    selectedCategory.push(categ.value);
  })

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, editingDealId, dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos, label_status, weight, shipping_cost})
  };

  return dispatch => {
    dispatch(editingDealBegin());
    return fetch("/listdeal/edit", settings)
      .then(res => res.json())
      .then(jsonDealEdited => {

        dispatch(editingDealSuccess(jsonDealEdited));
        return jsonDealEdited;
      })
      .catch(error => dispatch(editingDealFailure(error)));
  };
}

export const editingDealBegin = () => ({
  type: UPDATING_EDITING_DEAL_BEGIN
});

export const editingDealSuccess = dealEdited => ({
  type: UPDATING_EDITING_DEAL_SUCCESS,
  payload: dealEdited
});

export const editingDealFailure = error => ({
  type: UPDATING_EDITING_DEAL_FAILURE,
  payload: { error }
});

export const openModalForPhoneVerification = () => {
  return {
    type: OPEN_MODAL_PHONE_VERIFICATION,
  };
};

export const closeModalAfterDealCreated = () => {
  return {
    type: CLOSE_DEAL_CREATED_MODAL, //what does the action do = title of action
    payload: { modalVisible: false } // any data you need to return
  };
};

export const resetListDeal = () => {
  return {
      type: RESET_DEAL_CREATED
  };
};

export const onEditPhoneNumber = (event) => {
  return {
      type: EDIT_PHONE_NUMBER,
      payload: event.target.value
  }
};

export const onEditSellerFirstname = (event) => {
  return {
      type: EDIT_SELLER_FIRSTNAME,
      payload: event.target.value
  }
};

export const onEditSellerLastname = (event) => {
  return {
      type: EDIT_SELLER_LASTNAME,
      payload: event.target.value
  }
};

export const onEditSellerAddress = (event) => {
  return {
      type: EDIT_SELLER_ADDRESS,
      payload: event.target.value
  }
};

export const onEditSellerCity = (event) => {
  return {
      type: EDIT_SELLER_CITY,
      payload: event.target.value
  }
};

export const onEditSellerState = (state) => {

  document.querySelector("#sellerState").classList.remove("create-deal-select-error");

  return {
      type: EDIT_SELLER_STATE,
      payload: {state}
  }
};

export const onEditSellerZipcode = (event) => {
  return {
      type: EDIT_SELLER_ZIPCODE,
      payload: event.target.value
  }
};

export function _startVerificationForSeller(token,firstName, lastName, phoneNumber, sellerAddress, sellerCity, sellerState, sellerZipcode) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, firstName, lastName, phoneNumber, sellerAddress, sellerCity, sellerState, sellerZipcode})
  };

  return dispatch => {
    dispatch(verifySellerBegin());
    return fetch("/verification/start", settings)
      .then(res => res.json())
      .then(jsonTwillio => {
        let twillioData = JSON.parse(jsonTwillio);

        dispatch(verifySellerSuccess(twillioData));
        return twillioData;
      })
      .catch(error => dispatch(verifySellerFailure(error)));
  };
}

export const verifySellerBegin = () => ({
  type: VERIFY_SELLER_BEGIN
});

export const verifySellerSuccess = twilioData => ({
  type: VERIFY_SELLER_SUCCESS,
  payload: twilioData
});

export const verifySellerFailure = error => ({
  type: VERIFY_SELLER_FAILURE,
  payload: { error }
});

export const onEditSellerVerificationToken = (event) => {
  return {
      type: EDIT_SELLER_VERIFICATION_TOKEN,
      payload: event.target.value
  }
};

export function _checkVerificationForSeller(token, phoneCode) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, phoneCode})
  };

  return dispatch => {
    dispatch(checkCodeBegin());
    return fetch("/verification/check", settings)
      .then(res => res.json())
      .then(codeResult => {
        let twillioCodeResult = JSON.parse(codeResult);

        dispatch(checkCodeSuccess(twillioCodeResult));
        return twillioCodeResult;
      })
      .catch(error => dispatch(checkCodeFailure(error)));
  };
}

export const checkCodeBegin = () => ({
  type: CHECK_CODE_BEGIN
});

export const checkCodeSuccess = codeStatus => ({
  type: CHECK_CODE_SUCCESS,
  payload: codeStatus
});

export const checkCodeFailure = error => ({
  type: CHECK_CODE_FAILURE,
  payload: { error }
});

export const editListing = (dealItem, acceptedCryptos) => ({
  type: EDIT_LISTING,
  payload: {dealItem, acceptedCryptos}
});

export const resetEditListing = () => ({
  type: RESET_EDIT_LISTING
});

export const openAlertEditCancelModal = () => {
  return {
      type: OPEN_ALERT_EDIT_CANCEL_MODAL,
      payload: {visible: true}
  }
};

export const closeAlertEditCancelModal = () => {
  return {
      type: CLOSE_ALERT_EDIT_CANCEL_MODAL,
      payload: {visible: false}
  }
};

export const openDeleteAlertModal = () => {
  return {
      type: OPEN_DELETE_ALERT_MODAL,
      payload: {visible: true}
  }
};

export const closeDeleteAlertModal = () => {
  return {
      type: CLOSE_DELETE_ALERT_MODAL,
      payload: {visible: false}
  }
};

export function _deleteDeal(token, deal_id) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, deal_id})
  };
  return dispatch => {
    dispatch(deleteListingDealBegin());
    return fetch("/listdeal/delete", settings)
      .then(res => res.json())
      .then(jsonDeleted => {
        dispatch(deleteListingDealSuccess(jsonDeleted));
        return jsonDeleted;
      })
      .catch(error => dispatch(deleteListingDealFailure(error)));
  };
}

export const deleteListingDealBegin = () => ({
  type: DELETE_DEAL_BEGIN
});

export const deleteListingDealSuccess = dealDeleted => ({
  type: DELETE_DEAL_SUCCESS,
  payload: dealDeleted
});

export const deleteListingDealFailure = error => ({
  type: DELETE_DEAL_FAILURE,
  payload: { error }
});

