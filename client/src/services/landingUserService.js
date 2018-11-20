export const _addUserCryptoVotes = (email,cryptoProfile) => {
	return fetch("/landing/users/votes", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({email, cryptoProfile})
	  }).then(res => res.json())
}