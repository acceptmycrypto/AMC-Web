//this function handles the change of crypto option user selects everytime
//selectedOptions is an array of object
//we need to map through the array and get the value of each object

export const handleDropdownChange = (selectedOptions) => {
    console.log('these are the selected options ', selectedOptions);

    let selectedCryptos = [];
    selectedOptions.map(crypto => {
        selectedCryptos.push(crypto.value);
    })

    console.log(selectedCryptos);
    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CRYPTO_CHOSEN', //what does the action do = title of action
        payload: {selectedCryptos} // any data you need to return
    }
};
