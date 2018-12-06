const initialState = {
    searchTerm: "",
    searchedDeals: []
};
  
export default function searchbarReducer(state = initialState, action) {
    switch(action.type) {
        case "SEARCH_DEALS_SUCCESS":
            console.log("Matched deals filtered by search term: "+action.payload.searchTerm);
            console.log("Searched deals:")
            console.log(action.payload.searchedDeals);
            return {
                ...state,
                searchedDeals: action.payload.searchedDeals,
                searchTerm: action.payload.searchTerm
            };
        case "FILTER_DEALS_BY_CATEGORY":
            return initialState;
        case "RESET_NAVBAR":
            return initialState;
        default:
            return state;
    }
}