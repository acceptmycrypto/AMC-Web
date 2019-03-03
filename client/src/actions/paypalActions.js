export function _paypal(
  token,
  dealItem,
  firstName,
  lastName,
  shippingAddress,
  shippingCity,
  shippingState,
  zipcode) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      dealItem,
      firstName,
      lastName,
      shippingAddress,
      shippingCity,
      shippingState,
      zipcode})
  };

  return dispatch => {
    dispatch(createPaypalTransactionBegin());
    return fetch("/paypal/create", settings)
      .then(res => res.json())
      .then(jsonTransaction => {
        dispatch(createPaypalTransactionSuccess(jsonTransaction));
        return jsonTransaction;
      })
      .catch(error => dispatch(createPaypalTransactionFailure(error)));
  };
}

export const createPaypalTransactionBegin = () => ({
  type: "CREATE_PAYPAL_TRANSACTION_BEGIN",
});

export const createPaypalTransactionSuccess = paypalTransaction => ({
  type: "CREATE_PAYPAL_TRANSACTION_SUCCESS",
  payload: { paypalTransaction }
});

export const createPaypalTransactionFailure = error => ({
  type: "CREATE_PAYPAL_TRANSACTION_FAILURE",
  payload: { error }
});

export function _executePayPalPayment(token, payerId, paymentId, deal_id, deal_name, user_email) {

  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, payerId, paymentId, deal_id, deal_name, user_email})
  };

  return dispatch => {
    dispatch(executePaypalTransactionBegin());
    return fetch("/paypal/execute", settings)
      .then(res => res.json())
      .then(jsonTransaction => {
        dispatch(executePaypalTransactionSuccess(jsonTransaction));
        return jsonTransaction;
      })
      .catch(error => dispatch(executePaypalTransactionFailure(error)));
  };
}

export const executePaypalTransactionBegin = () => ({
  type: "EXECUTE_PAYPAL_TRANSACTION_BEGIN",
});

export const executePaypalTransactionSuccess = paypalTransactionExecution => ({
  type: "EXECUTE_PAYPAL_TRANSACTION_SUCCESS",
  payload: { paypalTransactionExecution }
});

export const executePaypalTransactionFailure = error => ({
  type: "EXECUTE_PAYPAL_TRANSACTION_FAILURE",
  payload: { error }
});
