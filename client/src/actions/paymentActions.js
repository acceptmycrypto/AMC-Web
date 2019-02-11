export function _fetchTransactionInfo(
  crypto_name,
  crypto_symbol,
  deal_id,
  amount,
  token,
  shippingAddress,
  shippingCity,
  zipcode,
  shippingState,
  firstName,
  lastName) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      crypto_name,
      crypto_symbol,
      deal_id,
      amount,
      token,
      shippingAddress,
      shippingCity,
      zipcode,
      shippingState,
      firstName,
      lastName
    })
  };

  return dispatch => {
    dispatch(createTransactionBegin());
    return fetch("/checkout", settings)
      .then(res => res.json())
      .then(jsonTransaction => {
        dispatch(createTransactionSuccess(jsonTransaction));
        return jsonTransaction;
      })
      .catch(error => dispatch(createTransactionFailure(error)));
  };
}

export const createTransactionBegin = () => ({
  type: "CREATE_TRANSACTION_BEGIN"
});


export const createTransactionSuccess = transactionInfo => ({
  type: "CREATE_TRANSACTION_SUCCESS",
  payload: { transactionInfo }
});

export const createTransactionFailure = error => ({
  type: "CREATE_TRANSACTION_FAILURE",
  payload: { error }
});

export function _fetchGuestTransactionInfo(
  crypto_name,
  crypto_symbol,
  deal_id,
  amount,
  shippingAddress,
  shippingCity,
  zipcode,
  shippingState,
  firstName,
  lastName,
  email,
  phoneNumber) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      crypto_name,
      crypto_symbol,
      deal_id,
      amount,
      shippingAddress,
      shippingCity,
      zipcode,
      shippingState,
      firstName,
      lastName,
      email,
      phoneNumber
    })
  };

  return dispatch => {
    dispatch(createGuestTransactionBegin());
    return fetch("/guestCheckout", settings)
      .then(res => res.json())
      .then(jsonTransaction => {
        dispatch(createGuestTransactionSuccess(jsonTransaction));
        return jsonTransaction;
      })
      .catch(error => dispatch(createGuestTransactionFailure(error)));
  };
}

export const createGuestTransactionBegin = () => ({
  type: "CREATE_GUEST_TRANSACTION_BEGIN"
});


export const createGuestTransactionSuccess = transactionInfo => ({
  type: "CREATE_GUEST_TRANSACTION_SUCCESS",
  payload: { transactionInfo }
});

export const createGuestTransactionFailure = error => ({
  type: "CREATE_GUEST_TRANSACTION_FAILURE",
  payload: { error }
});

