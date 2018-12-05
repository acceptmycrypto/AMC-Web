import { 
    SET_ACTIVE_SETTINGS,
    SET_ACTIVE_PROFILE_SETTINGS,
    SET_INITIAL_STATE

} from "../actions/settingsActions";


const initialSettingsState = {
    activeSettingsItem: "Profile Settings",
    activeProfileSettingsItem: "Change Photo",
    
}

export default function settingsReducer (state = initialSettingsState, action) {
    switch (action.type) {
        case SET_INITIAL_STATE:
            return initialSettingsState;
        case SET_ACTIVE_SETTINGS:
            return {
                ...state,
                activeSettingsItem: action.payload.activeSettingsItem
            }
        case SET_ACTIVE_PROFILE_SETTINGS:
            return {
                ...state,
                activeProfileSettingsItem: action.payload.activeProfileSettingsItem
            }
        default:
            return state;
    }
    
}