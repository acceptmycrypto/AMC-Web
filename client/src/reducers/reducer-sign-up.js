import { CRYPTO_CHOSEN, RESET_SELECTED_CRYPTOS, OPEN_MODAL, CLOSE_MODAL } from "../actions/signUpActions";


const initialSignUpState = {
    selectedCryptos: [],
    redirect: false,
    visible: false
}

export default function selectedCryptosReducer (state = initialSignUpState, action) {
    switch (action.type) {
        case CRYPTO_CHOSEN:
            return {
                ...state,
                selectedCryptos: action.payload.selectedCryptos
            }
        case RESET_SELECTED_CRYPTOS:
            return{
                selectedCryptos: []
            }
        case OPEN_MODAL:
            return {
                ...state,
                visible: action.payload.visible
            }
        case CLOSE_MODAL:
            return {
                ...state,
                visible: action.payload.visible
            }
        default:
            return state;
    }
    
}