import { SEARCH_DEALS_SUCCESS } from "../actions/searchBarActions";
import { FILTER_DEALS_BY_CATEGORY } from "../actions/categoryActions";
import { RESET_NAVBAR } from "../actions/navbarActions";


const initialState = {
    searchTerm: "",
    searchedDeals: [],
    searchedDealsOnMobile: [],
    searchPage: 1,
    numberOfResults: 0
};

export default function searchbarReducer(state = initialState, action) {
    switch(action.type) {
        case SEARCH_DEALS_SUCCESS:
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
                searchedDeals: action.payload.searchedDeals,
                searchedDealsOnMobile: [...state.searchedDealsOnMobile, ...action.payload.searchedDeals],
                searchPage: action.payload.searchPage,
                numberOfResults: action.payload.numberOfResults
            };
        case FILTER_DEALS_BY_CATEGORY:
            return initialState;
        case RESET_NAVBAR:
            return initialState;
        default:
            return state;
    }
}