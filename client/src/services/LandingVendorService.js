export const _LandingVendorService = (vendor_email) => {
	return fetch("/vendor/subscription", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({vendor_email})
	  }).then(res => res.json())
}
