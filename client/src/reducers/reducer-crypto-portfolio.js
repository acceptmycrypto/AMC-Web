import {
    SHOW_ALL_INTERESTED_CRYPTO,
    SHOW_ALL_OWNED_CRYPTO,
    HIDE_ADDRESS_FORM,
    SHOW_ADDRESS_FORM,
    HIDE_QR,
    SHOW_QR

} from "../actions/cryptoPortfolioActions";

const initialUserState = {
    crypto_view: "owned",
    address_form_shown: false,
    qr_shown: false,
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
                qr_shown: action.payload.qr_shown,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name

            }
        case SHOW_ALL_OWNED_CRYPTO:
            return {
                ...state,
                crypto_view: action.payload.crypto_view,
                address_form_shown: action.payload.address_form_shown,
                qr_shown: action.payload.qr_shown,
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
        case HIDE_QR:
            return {
                ...state,
                qr_shown: action.payload.qr_shown
            }
        case SHOW_QR:
            return {
                ...state,
                qr_shown: action.payload.qr_shown
            }
        default:
            return state;
    }

}