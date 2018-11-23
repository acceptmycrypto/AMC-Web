import {
    SHOW_ALL_INTERESTED_CRYPTO,
    SHOW_ALL_OWNED_CRYPTO,
    HIDE_ADDRESS_FORM,
    SHOW_ADDRESS_FORM

} from "../actions/cryptoPortfolioActions";

const initialUserState = {
    crypto_view: "owned",
    address_form_shown: false,
    isQRShown: false,
    users_cryptos_id: null,
    current_crypto_name: null
}

export default function UserReducer(state = initialUserState, action) {
    switch (action.type) {
        case SHOW_ALL_INTERESTED_CRYPTO:
            return {
                ...state,
                crypto_view: action.payload.crypto_view,
                address_form_shown: action.payload.address_form_shown,
                isQRShown: action.payload.isQRShown,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name
                
            }
        case SHOW_ALL_OWNED_CRYPTO:
            return {
                ...state,
                crypto_view: action.payload.crypto_view,
                address_form_shown: action.payload.address_form_shown,
                isQRShown: action.payload.isQRShown,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name
            }
        case HIDE_ADDRESS_FORM:
            return {
                ...state,
                address_form_shown: action.payload.address_form_shown
            }
        case SHOW_ADDRESS_FORM:
            return {
                ...state,
                address_form_shown: action.payload.address_form_shown,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name
            }
        default:
            return state;
    }

}