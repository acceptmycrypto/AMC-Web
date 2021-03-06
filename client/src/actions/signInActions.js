export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = () => {
    return {
        type: OPEN_MODAL,
        payload: {visible: true}
    }
};

export const closeModal = () => {
    // action
        // made up of two parts 1. type 2. payload
    return {
        type: CLOSE_MODAL, //what does the action do = title of action
        payload: {visible: false} // any data you need to return
    }
};

// imported in SignIn.js
export const _login = (email, password) => {
	return fetch("/signin", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
			body: JSON.stringify({email, password})
		}).then(res => res.json())
  }

  // imported in ResendEmail.js
export const _resendEmail = (email) => {
	return fetch("/resend-email", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({email})
	  }).then(res => res.json())
}

// imported in ResetPasswordEmail.js
export const _resetPasswordEmail = (email) => {
	return fetch("/reset-password-email", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({email})
	  }).then(res => res.json())
}

export const _resetPassword = (token, password1, password2) => {
	return fetch("/reset-password", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({token, password1, password2})
	  }).then(res => res.json())
}