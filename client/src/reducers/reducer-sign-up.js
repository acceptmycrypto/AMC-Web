const initialSignUpState = {
    selectedCryptos: null
}

export default function selectedCryptosReducer (state = initialSignUpState, action) {
    switch (action.type) {
        case "CRYPTO_CHOSEN":
            console.log("reducer ", action.payload.selectedCryptos);
            return {
                ...state,
                selectedCryptos: action.payload.selectedCryptos
            }
        default:
            return state;
    }
    
}