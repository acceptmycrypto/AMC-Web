const initialState = {
  category: null,
  filteredCategory: []
};

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case "FILTER_DEALS_BY_CATEGORY":
            return {
                ...state,
                filteredCategory: action.payload.categorizedDeals,
                category: action.payload.category
            };
        case "SEARCH_DEALS_SUCCESS":
            return initialState;
        case "RESET_NAVBAR":
            return initialState;
        default:
            return state;
    }
}