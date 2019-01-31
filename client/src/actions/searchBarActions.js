export const searchDeals = (searchTerm, page) => {
    return dispatch => {
        dispatch(searchDealBegin());
        return fetch("/api/search?term="+searchTerm+"&page="+page, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(searchedDeals => {
            console.log("searchedDeals");
            console.log(searchedDeals);
            dispatch(searchDealSuccess(searchTerm, searchedDeals.results, page, searchedDeals.numberOfResults[0]["COUNT(DISTINCT deals.id)"]));
        })
    }
}

export const searchDealBegin = (searchTerm) => ({
    type: "SEARCH_DEALS_BEGIN"
});

export const searchDealSuccess = (searchTerm, searchedDeals, searchPage, numberOfResults) => ({
    type: "SEARCH_DEALS_SUCCESS",
    payload: { searchTerm, searchedDeals, searchPage, numberOfResults }
});

export const searchDealFailure = (error) => ({
    type: "SEARCH_DEALS_FAILURE",
    payload: { error }
});