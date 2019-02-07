const initialState = {
    pw_token_validity: "none",
    error_message: ""
}

export default function pwTokenReducer (state = initialState, action) {
    switch (action.type) {
        case "VALIDATION_DONE":
            return {
                ...state,
                pw_token_validity: action.payload.validation_result
            }
        case "PASSWORD_RESET_DONE":
            return {
                ...state,
                pw_token_validity: action.payload.pw_token_validity,
                error_message: action.payload.error_message
            }
        default:
            return state;
    }
    
}