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

export async function _loadCryptocurrencies () {
  const cryptocurrencies = await fetch('/cryptocurrencies');
  const cryptos = await cryptocurrencies.json();
// export async function _loadCryptocurrencies () {
//   const cryptocurrencies = await fetch('http://localhost:3001/cryptocurrencies');
//   const cryptos = await cryptocurrencies.json();

//   return cryptos
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