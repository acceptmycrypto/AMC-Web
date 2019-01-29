const initialState = {
    category: null,
    filteredCategory: [],
    categoryTerm: "",
    categoriesDeals: [],
    categoryPage: 1,
    categoryNumberOfResults: 0,
    parentCategory: [],
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
        case "CATEGORIES_DEALS_SUCCESS":
            return {
                ...state,
                categoryTerm: action.payload.categoryTerm,
                categoriesDeals: action.payload.categoriesDeals,
                categoryPage: action.payload.categoryPage,
                categoryNumberOfResults: action.payload.categoryNumberOfResults
            };
        case "FETCH_CATEGORY_SUCCESS":
            return {
                ...state,
                parentCategory: action.payload.parentCategory
            };
        default:
            return state;
    }
}