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
        case "RESET_SEARCHBAR":
            return state;
        default:
            return state;
    }
}