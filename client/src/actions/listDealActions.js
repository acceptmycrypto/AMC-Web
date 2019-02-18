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
  type: "UPLOADING_IMAGES_BEGIN"
});

export const uploadingImageSuccess = imageData => ({
  type: "UPLOADING_IMAGES_SUCCESS",
  payload: imageData
});

export const uploadingImageFailure = error => ({
  type: "UPLOADING_IMAGES_FAILURE",
  payload: { error }
});

export const onSelectImageToView = (event) => {
  return {
      type: 'VIEW_UPLOADED_IMAGE',
      payload: event.target.getAttribute('src')
  }
};

export function _removeImage(token, imageKey) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, imageKey})
  };

  fetch("/image/remove", settings).then(res => res.json());

  return {
    type: 'REMOVE_UPLOADED_IMAGE',
    payload: imageKey
  }
}

export const handleUploadingPhotosStep = () => {
  return {
    type: "SHOW_PHOTOS_UPLOADING",
    payload: {
      showPhotosStep: true,
      showPricingStep: false,
      showDescriptionStep: false,
    }
  }
}

export const handlePricingStep = () => {
  return {
    type: "SHOW_PRICING",
    payload: {
      showPhotosStep: false,
      showPricingStep: true,
      showDescriptionStep: false,
    }
  }
}

export const handleDescriptionStep = () => {
  return {
    type: "SHOW_DESCRIPTION",
    payload: {
      showPhotosStep: false,
      showPricingStep: false,
      showDescriptionStep: true,
    }
  }
}

export const onDiscountPercentageToChange = (event) => {
  return {
      type: 'CHANGE_DISCOUNT_PERCENTAGE',
      payload: event.target.value
  }
};

export const OnUSDPriceChange = (event) => {
  return {
      type: 'CHANGE_BASE_PRICE',
      payload: event.target.value
  }
};

export const validateDecimalForBasePrice = (event) => {
  let basePrice = parseFloat(event.target.value).toFixed(2);
  return {
      type: 'ONBLUR_BASE_PRICE_INPUT',
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
  type: "GET_RATE_BEGIN",
  payload: {crypto_symbol}
});

export const getRateSuccess = (crypto_symbol, crypto_amount) => ({
  type: "GET_RATE_SUCCESS",
  payload: {crypto_symbol, crypto_amount}
});

export const getRateFailure = error => ({
  type: "GET_RATE_FAILURE",
  payload: { error }
});

export const removeSelectedCrypto = (crypto_symbol) => ({
  type: "REMOVE_SELECTED_CRYPTO",
  payload: { crypto_symbol }
});

export const onEditingDealName = event => ({
  type: "EDIT_DEAL_NAME",
  payload: event.target.value
});

export const onEditingDetail = editorState => ({
  type: "EDIT_DETAIL",
  payload: editorState
});

export const handleSelectedCategory = (categoriesSelected) => {
  return {
    type: 'SELECT_CATEGORY',
    payload: {categoriesSelected}
  }
};

export const handleSelectedCondition = (selectedCondition) => {
  return {
    type: 'SELECT_CONDITION',
    payload: {selectedCondition}
  }
};

export function _submitDeal(token, dealName, category, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos) {

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
    body: JSON.stringify({token, dealName, selectedCategory, selectedCondition, textDetailRaw, images, priceInUSD, priceInCrypto, selected_cryptos})
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
  type: "CREATING_DEAL_BEGIN"
});

export const creatingDealSuccess = dealCreated => ({
  type: "CREATING_DEAL_SUCCESS",
  payload: dealCreated
});

export const creatingDealFailure = error => ({
  type: "CREATING_DEAL_FAILURE",
  payload: { error }
});

export const closeModalAfterDealCreated = () => {
  return {
    type: "CLOSE_DEAL_CREATED_MODAL", //what does the action do = title of action
    payload: { modalVisible: false } // any data you need to return
  };
};

export const resetListDeal = () => {
  return {
      type: "RESET_DEAL_CREATED"
  };
};

export const onEditPhoneNumber = (event) => {
  return {
      type: 'EDIT_PHONE_NUMBER',
      payload: event.target.value
  }
};

export const onEditSellerFirstname = (event) => {
  return {
      type: 'EDIT_SELLER_FIRSTNAME',
      payload: event.target.value
  }
};

export const onEditSellerLastname = (event) => {
  return {
      type: 'EDIT_SELLER_LASTNAME',
      payload: event.target.value
  }
};

export const onEditSellerAddress = (event) => {
  return {
      type: 'EDIT_SELLER_ADDRESS',
      payload: event.target.value
  }
};

export const onEditSellerCity = (event) => {
  return {
      type: 'EDIT_SELLER_CITY',
      payload: event.target.value
  }
};

export const onEditSellerState = (state) => {

  document.querySelector("#sellerState").classList.remove("create-deal-select-error");

  return {
      type: 'EDIT_SELLER_STATE',
      payload: {state}
  }
};

export const onEditSellerZipcode = (event) => {
  return {
      type: 'EDIT_SELLER_ZIPCODE',
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
  type: "VERIFY_SELLER_BEGIN"
});

export const verifySellerSuccess = twilioData => ({
  type: "VERIFY_SELLER_SUCCESS",
  payload: twilioData
});

export const verifySellerFailure = error => ({
  type: "VERIFY_SELLER_FAILURE",
  payload: { error }
});

export const onEditSellerVerificationToken = (event) => {
  return {
      type: 'EDIT_SELLER_VERIFICATION_TOKEN',
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
  type: "CHECK_CODE_BEGIN"
});

export const checkCodeSuccess = codeStatus => ({
  type: "CHECK_CODE_SUCCESS",
  payload: codeStatus
});

export const checkCodeFailure = error => ({
  type: "CHECK_CODE_FAILURE",
  payload: { error }
});