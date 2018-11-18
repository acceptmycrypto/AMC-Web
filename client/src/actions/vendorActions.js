export function submitVendor(vendor_email) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({vendor_email})
  };

  return dispatch => {
    dispatch(submitVendorBegin());
    return fetch("http://localhost:3001/vendor/subscription", settings)
      .then(res => {
        debugger
        res.json();
      })
      .then(jsonMsg => {
        console.log("jsonMsg", jsonMsg.message);
        debugger
        dispatch(submitVendorSuccess(jsonMsg.message));
        return jsonMsg.message;
      })
      .catch(error => dispatch(submitVendorFailure(error)));
  };
}

export const submitVendorBegin = () => ({
  type: "SUBMIT_VENDOR_BEGIN"
});


export const submitVendorSuccess = message => ({
  type: "SUBMIT_VENDOR_SUCCESS",
  payload: { message }
});

export const submitVendorFailure = error => ({
  type: "SUBMIT_VENDOR_FAILURE",
  payload: { error }
});

