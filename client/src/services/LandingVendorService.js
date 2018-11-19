export const _LandingVendorService = (vendor_email) => {
	return fetch("http://localhost:3001/vendor/subscription", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({vendor_email})
	  }).then(res => res.json())
}
