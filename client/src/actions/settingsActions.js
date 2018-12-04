export const SET_ACTIVE_SETTINGS = "SET_ACTIVE_SETTINGS";
export const SET_ACTIVE_PROFILE_SETTINGS = "SET_ACTIVE_PROFILE_SETTINGS";

export const handleSettingsMenuItemClick = (e, {name} ) => {

    return {
        type: SET_ACTIVE_SETTINGS,
        payload: {activeSettingsItem: name}
        
    }
}

export const handleProfileSettingsMenuItemClick = (e, {name} ) => {

    return {
        type: SET_ACTIVE_PROFILE_SETTINGS,
        payload: {activeProfileSettingsItem: name}
        
    }
}

