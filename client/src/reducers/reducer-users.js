const initialSignInState = {
    crypto_view: "owned",
    add_address: false,
    qr: false,
    users_cryptos_id: null,
    current_crypto_name: null,
    hideOrShowCoin: "show"
}

export default function UserReducer(state = initialSignInState, action) {
    switch (action.type) {
        case "SHOW_ALL_INTERESTED_CRYPTO":
            return {
                ...state,
                crypto_view: action.payload.crypto_view,
                qr: action.payload.qr,
                add_address: action.payload.add_address,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name,
                hideOrShowCoin: action.payload.hideOrShowCoin
            }
        case "SHOW_ALL_OWNED_CRYPTO":
            return {
                ...state,
                crypto_view: action.payload.crypto_view,
                qr: action.payload.qr,
                add_address: action.payload.add_address,
                users_cryptos_id: action.payload.users_cryptos_id,
                current_crypto_name: action.payload.current_crypto_name,
                hideOrShowCoin: action.payload.hideOrShowCoin
                
            }
        default:
            return state;
    }

}