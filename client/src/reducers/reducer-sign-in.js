import { OPEN_MODAL, CLOSE_MODAL } from "../actions/signInActions";

const initialSignInState = {
    redirect: false,
    visible: false
}

export default function signInReducer (state = initialSignInState, action) {
    switch (action.type) {
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