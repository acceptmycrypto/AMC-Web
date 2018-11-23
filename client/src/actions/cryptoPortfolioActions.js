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

export const SHOW_ALL_INTERESTED_CRYPTO = 'SHOW_ALL_INTERESTED_CRYPTO';
export const SHOW_ALL_OWNED_CRYPTO = 'SHOW_ALL_OWNED_CRYPTO';
export const HIDE_ADDRESS_FORM = 'HIDE_ADDRESS_FORM';
export const SHOW_ADDRESS_FORM = 'SHOW_ADDRESS_FORM';



/**
 * action creators return actions
 * @exports @type {function}
 */


/** 
  * @func handleToggleChange 
  * @summary function is invoked onChange of the checkbox, #ownedInterestedToggleButton in CryptoCard.js
  * @desc  function updates the crypto_view state: if checkbox is checked the function returns as the payload {crypto_view: interested} and if not checked {crypto_view: owned} and resets the rest of store to initial values
  * @member {boolean} isChecked @desc if checkbox has property checked, isChecked = true else isChecked = false;
  * @member {function} hideOrShowCryptos @param {string} status -hide or show, @param {boolean} [isQRShown] 
  * @returns {object}  
    * @prop {string} crypto_view - if isChecked = true, crypto_view: "interested" else if isChecked = false, crypto_view: "owned"
    * @prop {boolean} [address_form_shown=false] - reset value to initial state
    * @prop {boolean} [isQRShown=false] - reset value to initial state
    * @prop {(null| number)} [users_cryptos_id=null] - reset value to initial state
    * @prop {(null|string)} [current_crypto_name=null] - reset value to initial state
*/


export const handleToggleChange = (event) => {
    let isChecked = event.target.checked;
    if (isChecked) { 
        hideOrShowCryptos("show", false);
        return {
            type: SHOW_ALL_INTERESTED_CRYPTO,
            payload: {
                crypto_view: "interested",
                address_form_shown: false,
                isQRShown: false,
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
                isQRShown: false,
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
  * @param {boolean} address_form_shown
  * @member {DOM element img} cryptoImage
  * @member {DOM element div} parentDiv
  * @member {(null|number)} users_cryptos_id -id of the cryptocurrency
  * @member {(null|string)} current_crypto_name - name of the cryptocurrency
  * @member {function} hideOrShowCryptos @param {string} status -hide or show, @param {boolean} [isQRShown], @param {DOM element} [parentDiv]
  * @returns {object}  @prop {boolean} address_form_shown @prop {(null|number)} [users_cryptos_id] @prop {(null|string)} [current_crypto_name]
*/

export const handleAddressFormChange = (event, address_form_shown) => {
    let cryptoImage = event.target;
    let parentDiv = cryptoImage.parentElement.parentElement;
    let users_cryptos_id = cryptoImage.getAttribute("data-id");
    let current_crypto_name = cryptoImage.getAttribute("data-name");

    
    if (address_form_shown) {
        hideOrShowCryptos("show", false);
        return {
            type: 'HIDE_ADDRESS_FORM',
            payload: {
                address_form_shown: false
            },
        }

    
    } else {
        hideOrShowCryptos("hide", false, parentDiv);
        return {
            type: 'SHOW_ADDRESS_FORM',
            payload: {
                address_form_shown: true, 
                users_cryptos_id: users_cryptos_id,
                current_crypto_name: current_crypto_name
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
  * @param {boolean} isQRShown - true if QR is shown on page, false if QR is not shown on page
  * @param {DOM element div} parentDiv - refers to parent div of the crypto the user has clicked on
  * @member {DOM element div} surroundingDiv - refers to the div surrounding all cryptos
  * @member {array} allChildren - array of all children (cryptos) in surroundingDiv
  * @member {function} hideOrShowAddress @param {string} status -hide or show 
*/


export const hideOrShowCryptos = (status, isQRShown, parentDiv) => {

    let surroundingDiv = document.querySelector(".cryptoWallet");
    let allChildren = surroundingDiv.children;

    // displays all the user's cryptos
    if (status === "show") {
        for (let i = 0; i < allChildren.length; i++) {
            let element = allChildren[i]
            element.style.display = "flex";
        }
        //if the QR is shown on the page, will hide the QR code and Wallet address when all the cryptos are shown
        if (isQRShown) { 
            
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
  * @param {DOM element div} parentDiv - refers to parent div of the crypto the user has clicked on
  * @param {string} address - address of cryptocurrency
  * @member {DOM element div} surroundingDiv - refers to the div surrounding all cryptos
  * @member {DOM element img} qr - creates an img DOM element whose SRC is the image qr code of the crypto selected
  * @member {DOM element p} displayAddress - refers to the paragraph tag containing the crypto address string
*/

export const hideOrShowAddress = (status, parentDiv, address) => {
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
