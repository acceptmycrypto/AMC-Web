const initialSignUpState = {
    selectedCryptos: null
}

export default function selectedCryptosReducer (state = initialSignUpState, action) {
    switch (action.type) {
        case "CRYPTO_CHOSEN":
            return {
                ...state,
                selectedCryptos: action.payload.selectedCryptos
            }
        default:
            return state;
    }
    
}