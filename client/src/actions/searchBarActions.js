export const searchDeals = (searchTerm, page) => {
    return dispatch => {
        dispatch(searchDealBegin());
        return fetch("/search?term="+searchTerm+"&page="+page, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(searchedDeals => {
            console.log("searchedDeals");
            console.log(searchedDeals);
            dispatch(searchDealSuccess(searchTerm, searchedDeals.results, page, searchedDeals.numberOfResults[0]["COUNT(*)"]));
        })
    }
}

export const scrollDeals = (searchTerm, page, num) => {
    
    return dispatch => {
        
        return fetch("/search?term="+searchTerm+"&page="+(page+num), {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(searchedDeals => {
            console.log("searchedDeals");
            console.log(searchedDeals);
            dispatch(searchDealSuccess(searchTerm, searchedDeals.results, page+num, searchedDeals.numberOfResults[0]["COUNT(*)"]));
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
//     let searchedDeals = allDeals.filter(deal => {
//         if (deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase()) || deal.deal_description.toLowerCase().includes(searchTerm.toLowerCase()) || deal.venue_name.toLowerCase().includes(searchTerm.toLowerCase())){
//             return deal;
//         }
//     })
//     return {
//         type: "SEARCH_DEALS_SUCCESS",
//         payload: {
//             searchedDeals,
//             searchTerm
//         }
//     }
// }

// export const resetSearchbar = () => {
//     console.log("reset searchbar");
//     return {
//         type: "RESET_FILTER"
//     }
// }