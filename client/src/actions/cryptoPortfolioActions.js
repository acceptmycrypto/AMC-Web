/**
 * @file User Redux Actions 
 * @desc Export Functions that are Action Creators which return Actions. 
 * Actions are javascript objects that are payloads of information that send data from the application to the store.
 * @prop {string} type -Actions have a type property that indicates the type of action being performed
 * @prop {object}  payload -The payload property holds data that will be sent to the store
 * @author Avanika Krishnaswamy @avakrishn
 */


/**
 * action types
 * @exports @type {string}
 */

export const SHOW_ALL_INTERESTED_CRYPTO = "SHOW_ALL_INTERESTED_CRYPTO";
export const SHOW_ALL_OWNED_CRYPTO = "SHOW_ALL_OWNED_CRYPTO";
export const HIDE_ADDRESS_FORM = "HIDE_ADDRESS_FORM";
export const SHOW_ADDRESS_FORM = "SHOW_ADDRESS_FORM";
export const HIDE_QR = "HIDE_QR";
export const SHOW_QR = "SHOW_QR";





/**
 * action creators return actions
 * @exports @type {function}
 */


/** 
  * @func handleToggleChange 
  * @summary function is invoked onChange of the checkbox, #ownedInterestedToggleButton in CryptoCard.js
  * @desc  function updates the crypto_view state: if checkbox is checked the function returns as the payload {crypto_view: interested} and if not checked {crypto_view: owned} and resets the rest of store to initial values
  * @param {boolean} qr_shown - if the QR code is shown qr_shown= true else qr_shown=false
  * @member {boolean} isChecked @desc if checkbox has property checked, isChecked = true else isChecked = false;
  * @member {function} hideOrShowCryptos @param {string} status -hide or show, @param {boolean} [qr_shown] 
  * @member {function} hideOrShowAddress @param {string} status -hide or show
  * @returns {object} - returns an action
    * @prop {string} crypto_view - if isChecked = true, crypto_view: "interested" else if isChecked = false, crypto_view: "owned"
    * @prop {boolean} [address_form_shown=false] - reset value to initial state
    * @prop {boolean} [qr_shown=false] - reset value to initial state
    * @prop {(null| number)} [users_cryptos_id=null] - reset value to initial state
    * @prop {(null|string)} [current_crypto_name=null] - reset value to initial state
*/


export const handleToggleChange = (event, qr_shown) => {
    let isChecked = event.target.checked;
    if (isChecked) {
        hideOrShowCryptos("show", false);
        if (qr_shown) {
            hideOrShowAddress("hide");
        }
        return {
            type: SHOW_ALL_INTERESTED_CRYPTO,
            payload: {
                crypto_view: "interested",
                address_form_shown: false,
                qr_shown: false,
                users_cryptos_id: null,
                current_crypto_name: null

            },
        }
    } else {
        hideOrShowCryptos("show", false);
        return {
            type: SHOW_ALL_OWNED_CRYPTO,
            payload: {
                crypto_view: "owned",
                address_form_shown: false,
                qr_shown: false,
                users_cryptos_id: null,
                current_crypto_name: null
            }
        }
    }
}


/** 
  * @func handleAddressFormChange 
  * @summary function is invoked onClick of image: .interested .cryptoImage in CryptoCard.js
  * @desc  function updates the address_form_shown state: if @param address_form_shown is true the function returns as the payload {address_form_shown: false} and if @param address_form_shown is false function returns {address_form_shown: true} 
  * @param {boolean} address_form_shown - if the address form is shown address_form_shown= true else address_form_shown=false
  * @member {DOM element img} cryptoImage - crypto image the user clicks on in crypto portfolio
  * @member {DOM element div} parentDiv - parent div of the cryptoImage
  * @member {(null|number)} users_cryptos_id -id of the cryptocurrency
  * @member {(null|string)} current_crypto_name - name of the cryptocurrency
  * @member {function} hideOrShowCryptos @param {string} status -hide or show, @param {boolean} [qr_shown], @param {DOM element} [parentDiv]
  * @returns {object} - returns action 
  *     @prop {boolean} address_form_shown 
  *     @prop {(null|number)} [users_cryptos_id] 
  *     @prop {(null|string)} [current_crypto_name]
*/

export const handleAddressFormChange = (event, address_form_shown) => {
    let cryptoImage = event.target;
    let parentDiv = cryptoImage.parentElement.parentElement;
    let users_cryptos_id = cryptoImage.getAttribute("data-id");
    let current_crypto_name = cryptoImage.getAttribute("data-name");


    if (address_form_shown) {
        hideOrShowCryptos("show", false);
        return {
            type: HIDE_ADDRESS_FORM,
            payload: {
                address_form_shown: false
            },
        }


    } else {
        hideOrShowCryptos("hide", false, parentDiv);
        return {
            type: SHOW_ADDRESS_FORM,
            payload: {
                address_form_shown: true,
                users_cryptos_id: users_cryptos_id,
                current_crypto_name: current_crypto_name
            },
        }
    }
}

/** 
  * @func handleQRChange 
  * @summary function is invoked onClick of image: .owned .cryptoImage in CryptoCard.js
  * @desc  function updates the qr_shown state: if @param qr_shown is true the function returns as the payload {qr_shown: false} and if @param qr_shown is false function returns {qr_shown: true} 
  * @param {boolean} qr_shown - if the QR code is shown qr_shown= true else qr_shown=false
  * @member {DOM element img} cryptoImage - crypto image the user clicks on in crypto portfolio
  * @member {DOM element div} parentDiv  - parent div of the cryptoImage
  * @member {string} address - address of cryptocurrency
  * @member {function} hideOrShowCryptos @param {string} status -hide or show, @param {boolean} [qr_shown], @param {DOM element} [parentDiv]
  * @member {function} hideOrShowAddress @param {string} status -hide or show
  *  @returns {object}  - returns action 
  *     @prop {boolean} qr_shown
*/

export const handleQRChange = (event, qr_shown) => {
    if (qr_shown) {
        // after on click of crypto image , if qr_shown = true then show all cryptos and create action to update store
        hideOrShowCryptos("show");
        hideOrShowAddress("hide");
        return {
            type: "HIDE_QR",
            payload: {
                qr_shown: false
            },
        }
    } else {
        // after on click of cryptos , if qr_shown = false then change qr_shown = true in store and hide all other cryptos and show the QR and wallet address of the crypto that was clicked on
        let cryptoImage = event.target; // crypto image that was clicked on
        let parentDiv = cryptoImage.parentElement.parentElement;
        let address = cryptoImage.getAttribute("data-address");
        hideOrShowCryptos("hide", true, parentDiv);
        hideOrShowAddress("show", address);
        return {
            type: "SHOW_QR",
            payload: {
                qr_shown: true
            },
        }


    }
}




/**
* other functions
* @exports @type {function}
*/


/** 
  * @func hideOrShowCryptos 
  * @summary function is invoked in @example handleToggleChange and handleAddressFormChange
  * @desc  if @param {string} [status=show] , all cryptos in wallet will be shown but if @param {string} [status=hide] , all cryptos but the one clicked on by user in crypto portfolio will be hidden
  * @param {string} status - show or hide (will result in the all cryptos being shown or hidden respectively)
  * @param {boolean} qr_shown - true if QR is shown on page, false if QR is not shown on page
  * @param {DOM element div} parentDiv - refers to parent div of the crypto the user has clicked on
  * @member {DOM element div} surroundingDiv - refers to the div surrounding all cryptos
  * @member {array} allChildren - array of all children (cryptos) in surroundingDiv
  * @member {function} hideOrShowAddress @param {string} status -hide or show 
*/


export const hideOrShowCryptos = (status, qr_shown, parentDiv) => {
    let surroundingDiv = document.querySelector(".cryptoWallet");
    let allChildren = surroundingDiv.children;

    // displays all the user's cryptos
    if (status === "show") {
        for (let i = 0; i < allChildren.length; i++) {
            let element = allChildren[i]
            element.style.display = "flex";
        }
        //if the QR is shown on the page, will hide the QR code and Wallet address when all the cryptos are shown
        if (qr_shown) {

            hideOrShowAddress("hide");
        }
        // status is hide, all cryptos other than what user clicked on will be hidden
    } else {

        for (let i = 0; i < allChildren.length; i++) {
            let element = allChildren[i]
            if (element != parentDiv) {
                element.style.display = "none";
            }
        }
    }
}


/** 
  * @func hideOrShowAddress 
  * @summary function is invoked in @example hideOrShowCryptos
  * @desc  if @param {string} [status=show] , the QR code and Wallet Address will be shown, but if @param {string} [status=hide] , the QR code and Wallet Address will be removed from DOM
  * @param {string} status - show or hide (will result in the all cryptos being shown or hidden respectively)
  * @param {string} address - address of cryptocurrency
  * @member {DOM element div} surroundingDiv - refers to the div surrounding all cryptos
  * @member {DOM element img} qr - creates an img DOM element whose SRC is the image qr code of the crypto selected
  * @member {DOM element p} displayAddress - refers to the paragraph tag containing the crypto address string
*/

export const hideOrShowAddress = (status, address) => {
    // the wallet address and QR code will be created and shown
    if (status === "show") {
        let surroundingDiv = document.querySelector(".cryptoWallet");
        let qr = document.createElement("img");
        qr.classList.add("qr");
        qr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}`;

        let displayAddress = document.createElement("p");
        displayAddress.classList.add("address");
        displayAddress.innerHTML = address;
        surroundingDiv.append(qr, displayAddress);

    } else {
        let displayAddress = document.querySelector(".address");
        let qr = document.querySelector(".qr");
        // remove wallet address and QR code from DOM
        displayAddress.remove();
        qr.remove();

    }
}
