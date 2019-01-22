export function _paypal(
  deal_id,
  firstName,
  lastName,
  shippingAddress,
  shippingCity,
  shippingState,
  zipcode,
  payerID,
  paymentID) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deal_id,
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      zipcode,
      payerID,
      paymentID})
  };

  return dispatch => {
    return fetch("/paypal/execute-payment", settings)
      .then(res => res.json())
      .then(jsonTransaction => {
        dispatch(createTransactionSuccess(jsonTransaction));
        return jsonTransaction;
      })
      .catch(error => dispatch(createTransactionFailure(error)));
  };
}

export const createTransactionSuccess = paypalTransaction => ({
  type: "CREATE_PAYPAL_TRANSACTION_SUCCESS",
  payload: { paypalTransaction }
});

export const createTransactionFailure = error => ({
  type: "CREATE_PAYPAL_TRANSACTION_FAILURE",
  payload: { error }
});
