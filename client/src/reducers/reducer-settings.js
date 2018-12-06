import { 
    SET_ACTIVE_SETTINGS,
    SET_ACTIVE_PROFILE_SETTINGS,
    SET_ACTIVE_CRYPTO_SETTINGS,
    SET_INITIAL_STATE,
    CRYPTO_LEFT

} from "../actions/settingsActions";


const initialSettingsState = {
    activeSettingsItem: "Profile Settings",
    activeProfileSettingsItem: "Change Photo",
    activeCryptoSettingsItem: "Crypto I am Are Interested In",
    cryptoLeft: []
    
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
        case SET_ACTIVE_CRYPTO_SETTINGS:
            return{
                ...state,
                activeCryptoSettingsItem: action.payload.activeCryptoSettingsItem
            }
        case CRYPTO_LEFT:
            return{
                ...state,
                cryptoLeft: action.payload.cryptoLeft
            }
            case "CRYPTO_OPTIONS_LEFT_BEGIN":
            return {
              ...state,
              loading: true,
              error: null
            };
      
          case "CRYPTO_OPTIONS_LEFT_SUCCESS":
            return {
              ...state,
              loading: false,
              cryptoLeft: action.payload.cryptoLeft
            };
      
          case "CRYPTO_OPTIONS_LEFT_FAILURE":
            return {
              ...state,
              loading: false,
              error: action.payload.error,
            };

            case 'ADD_CRYPTO_SUCCESS':
            return{
                ...state,
                activeCryptoSettingsItem: action.payload.activeCryptoSettingsItem
            }

        default:
            return state;
    }
    
}