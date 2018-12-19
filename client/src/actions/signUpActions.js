export const openModal = () => {

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'OPEN_MODAL', //what does the action do = title of action
        payload: {visible: true} // any data you need to return
    }
};


export const closeModal = () => {
    

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CLOSE_MODAL', //what does the action do = title of action
        payload: {visible: false} // any data you need to return
    }
    
};

//this function handles the change of crypto option user selects everytime
//selectedOptions is an array of object
//we need to map through the array and get the value of each object

export const handleDropdownChange = (selectedOptions) => {
    document.querySelector("#selectCryptoError").innerHTML = "";

    let selectedCryptos = [];
    selectedOptions.map(crypto => {
        selectedCryptos.push(crypto.value);
    })


    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CRYPTO_CHOSEN', //what does the action do = title of action
        payload: {selectedCryptos} // any data you need to return
    }
};

export const resetSelectedCryptos = () => {
    return {
        type: 'RESET_SELECTED_CRYPTOS'
    }
}
