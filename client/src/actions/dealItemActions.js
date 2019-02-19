export function _loadDealItem(id, deal_name) {
  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return dispatch => {
    dispatch(fetchDealItemBegin());
    return fetch(`/api/deals/${id}/${deal_name}`, settings)
      .then(res => res.json())
      .then(jsonDeal => {
        dispatch(fetchDealItemSuccess(jsonDeal));
        return jsonDeal;
      })
      .catch(error => dispatch(fetchDealItemFailure(error)));
  };
}

export const fetchDealItemBegin = () => ({
  type: "FETCH_DEAL_ITEM_BEGIN"
});

export const fetchDealItemSuccess = (dealItem) => ({
  type: "FETCH_DEAL_ITEM_SUCCESS",
  payload: { dealItem }
});

export const fetchDealItemFailure = error => ({
  type: "FETCH_DEAL_ITEM_FAILURE",
  payload: { error }
});


export const resetDealitemState = () => {
  return {
      type: 'LOCATION_CHANGE'
  }
};

export const handleFirstNameInput = (event) => {
  return {
      type: 'FIRST_NAME',
      payload: event.target.value
  }
};

export const handleLastNameInput = (event) => {
  return {
      type: 'LAST_NAME',
      payload: event.target.value
  }
};

export const handleAddressInput = (event) => {
  return {
      type: 'SHIPPING_ADDRESS',
      payload: event.target.value
  }
};

export const handleCityInput = (event) => {
  return {
      type: 'SHIPPING_CITY',
      payload: event.target.value
  }
};

export const handleZipcodeInput = (event) => {
  return {
      type: 'ZIP_CODE',
      payload: event.target.value
  }
};

export const handleShippingStateInput = (selectedState) => {
  document.querySelector("#shipping-state").classList.remove("shipping-state-error");
  return {
      type: 'SHIPPING_STATE',
      payload: {selectedState}
  }
};

export const handleSelectedCrypto = (selectedOption) => {
  return {
      type: 'SELECT_PAYMENT',
      payload: {selectedOption}
  }
};

export const handleDetailStep = () => {

  return {
    type: "SHOW_DETAIL",
    payload: {
      showDetailStep: true,
      showShippingStep: false,
      showPayingStep: false
    }
  }
}

export const handleShippingStep = () => {
  return {
    type: "SHOW_SHIPPING",
    payload: {
      showCustomizationStep: false,
      showShippingStep: true,
      showPayingStep: false
    }
  }
}

export const handlePayingStep = () => {
  return {
    type: "SHOW_PAYING",
    payload: {
      showCustomizationStep: false,
      showShippingStep: false,
      showPayingStep: true
    }
  }
}
