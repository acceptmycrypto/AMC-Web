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
        debugger
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

export const onEditingDetail = editorState => ({
  type: "EDIT_DETAIL",
  payload: editorState
});