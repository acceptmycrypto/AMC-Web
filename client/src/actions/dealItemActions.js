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
      .then(jsonPhoto => {
        dispatch(fetchDealItemSuccess(jsonPhoto));
        return jsonPhoto;
      })
      .catch(error => dispatch(fetchDealItemFailure(error)));
  };
}


//   return dispatch => {
//     dispatch(fetchDealItemBegin());
//     return fetch(`/api/deals/${id}/${deal_name}`, settings)
//       .then(res => res.json())
//       .then(jsonPhoto => {
//         let seller_id = jsonPhoto[0].seller_id;
//         let venue_id = jsonPhoto[0].venue_id;
// //         let res_arr = [];
// //         res_arr.push(jsonPhoto);
// debugger;
//         if(seller_id != null)
//         {
//           fetch(`api/reviews/sellers/${seller_id}`, settings)
//            .then(res => res.json())
//            .then(reviews_json => {
//           // res_arr.push(reviews_json) 
//           dispatch(fetchDealItemSuccess(jsonPhoto, reviews_json));
//           return [jsonPhoto, reviews_json];
//         })
//         }
//         else
//         {
//         fetch(`api/reviews/sellers/${venue_id}`, settings)
//            .then(res => res.json())
//            .then(reviews_json => {
//         // res_arr.push(reviews_json) 
//         dispatch(fetchDealItemSuccess(jsonPhoto, reviews_json));
//         return [jsonPhoto, reviews_json];
//         })
//         }
//       })
//       .catch(error => dispatch(fetchDealItemFailure(error)));
//   };
// }

//   return dispatch => {
//     dispatch(fetchDealItemBegin());
//     return Promise.all([
//       fetch(`/api/deals/${id}/${deal_name}`, settings),
//       fetch(`/api/reviews/sellers/2`, settings)
//     ])
//       .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
//       .then(([deals_json, reviews_json]) => {
//         console.log(deals_json[0].seller_id);
//         console.log(deals_json[0].venue_id);
//         dispatch(fetchDealItemSuccess(deals_json, reviews_json));
//         return [deals_json, reviews_json];
//       })
//       .catch(error => dispatch(fetchDealItemFailure(error)));
//   };
// };


export const fetchDealItemBegin = () => ({
  type: "FETCH_DEAL_ITEM_BEGIN"
});

export const fetchDealItemSuccess = (dealItem) => ({
  type: "FETCH_DEAL_ITEM_SUCCESS",
  payload: { dealItem }
});

// export const fetchDealItemSuccess = (dealItem,reviews) => ({
//   type: "FETCH_DEAL_ITEM_SUCCESS",
//   payload: { dealItem, reviews }
// });

export const fetchDealItemFailure = error => ({
  type: "FETCH_DEAL_ITEM_FAILURE",
  payload: { error }
});


export const resetDealitemState = () => {
  return {
      type: 'LOCATION_CHANGE'
  }
};

export const handleCustomizingSize = (event) => {
  return {
      type: 'SELECT_SIZE',
      payload: event.target.value
  }
};

export const handleCustomizingColor = (event) => {
  return {
      type: 'SELECT_COLOR',
      payload: event.target.value
  }
};

export const handleFullNameInput = (event) => {
  return {
      type: 'FULL_NAME',
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

export const handleShippingStateInput = (event) => {
  return {
      type: 'SHIPPING_STATE',
      payload: event.target.value
  }
};

export const handleSelectedCrypto = (selectedOption) => {
  return {
      type: 'SELECT_PAYMENT',
      payload: {selectedOption}
  }
};

export const handleCustomizingStep = () => {

  return {
    type: "SHOW_CUSTOMIZATION",
    payload: {
      showCustomizationStep: true,
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
