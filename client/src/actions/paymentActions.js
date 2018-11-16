export function _fetchTransactionInfo(crypto_name, crypto_symbol, deal_id, amount, token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({crypto_name, crypto_symbol, deal_id, amount, token})
  };

  return dispatch => {
    dispatch(createTransactionBegin());
    return fetch("http://localhost:3001/checkout", settings)
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

