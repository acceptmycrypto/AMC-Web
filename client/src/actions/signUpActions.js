export const OPEN_MODAL  = "OPEN_MODAL"; 
export const  CLOSE_MODAL = "CLOSE_MODAL"; 
export const  CRYPTO_CHOSEN = "CRYPTO_CHOSEN"; 
export const  RESET_SELECTED_CRYPTOS = "RESET_SELECTED_CRYPTOS";
export const VALIDATION_START  = "VALIDATION_START";
export const VALIDATION_DONE  = "VALIDATION_DONE";
export const  PASSWORD_RESET_DONE = "PASSWORD_RESET_DONE";
 


export const openModal = () => {
  return {
    type: OPEN_MODAL, //what does the action do = title of action
    payload: { visible: true } // any data you need to return
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL, //what does the action do = title of action
    payload: { visible: false } // any data you need to return
  };
};

//this function handles the change of crypto option user selects everytime
//selectedOptions is an array of object
//we need to map through the array and get the value of each object

export const handleDropdownChange = selectedOptions => {
  document.querySelector("#selectCryptoError").innerHTML = "";

  let selectedCryptos = [];
  selectedOptions.map(crypto => {
    selectedCryptos.push(crypto.value);
  });

  // action
  // made up of two parts 1. type 2. payload
  return {
    type: CRYPTO_CHOSEN, //what does the action do = title of action
    payload: { selectedCryptos } // any data you need to return
  };
};

export const resetSelectedCryptos = () => {
  return {
    type: RESET_SELECTED_CRYPTOS
  };
};

export const validatePWToken = (token) => {
    return dispatch => {
        dispatch(validationStart());
        return fetch("/validate-pw-token?token="+token, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            console.log("data");
            console.log(data);
            if (data.stored.length==0){
                dispatch(validationDone("invalid"));
            } else if ((data.stored[0].reset_pw_timestamp+3600000) <= data.current){
                dispatch(validationDone("expired"));
            } else {
                dispatch(validationDone("valid"));
            }
        })

    }
    
}

export const validationStart = () => {
    return {
        type: VALIDATION_START
    };
}

export const validationDone = (result) => {
    return {
        type: VALIDATION_DONE,
        payload: { validation_result: result}
    }
}

export const resetPasswordDone = (data) => {
    return {
        type: PASSWORD_RESET_DONE,
        payload: data
    }
}

export const resetPassword = (token, password1, password2) => {
    return dispatch => {
        dispatch(validationStart());
        return fetch("/reset-password", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({token, password1, password2})
          }).then(res => res.json()).then(data => {
            console.log("data");
            console.log(data);
            dispatch(resetPasswordDone(data));
          })
    }
}

// imported in SignUp.js
export const _signUp = (username, email, password, cryptoProfile) => {
	return fetch("/register", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, email, password, cryptoProfile})
	  }).then(res => res.json())
}