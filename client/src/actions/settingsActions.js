export const SET_ACTIVE_SETTINGS = "SET_ACTIVE_SETTINGS";
export const SET_ACTIVE_PROFILE_SETTINGS = "SET_ACTIVE_PROFILE_SETTINGS";
export const SET_INITIAL_STATE = "SET_INITIAL_STATE";


export const setInitialSettingsState = () => {
    return {
        type: SET_INITIAL_STATE
    }
}

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

export const _changePhoto = (token, selectedPhoto)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, selectedPhoto })
    }; 
    const update_photos =  fetch("/update/photo", settings)

    return {
        type: 'FETCH_PHOTO_SUCCESS',
        payload: {
            photo: selectedPhoto
        }
    }

}

export const _changeUsername = (token, newUsername)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newUsername })
    }; 
    return fetch("/update/username", settings)
        .then(res => res.json())
        .then(jsonUsername => {
            console.log("jsonUsername ",  jsonUsername);
            return jsonUsername;
        })
}

export const _changeEmail = (token, newEmail)=>{
    const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newEmail })
    }; 
    return fetch("/update/email", settings)
        .then(res => res.json())
        .then(jsonEmail => {
            console.log("jsonEmail ",  jsonEmail);
            return jsonEmail;
        })
}