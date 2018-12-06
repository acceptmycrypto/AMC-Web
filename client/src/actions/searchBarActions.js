export const searchDeals = (searchTerm, allDeals) => {

    let searchedDeals = allDeals.filter(deal => {
        if (deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase()) || deal.deal_description.toLowerCase().includes(searchTerm.toLowerCase()) || deal.venue_name.toLowerCase().includes(searchTerm.toLowerCase())){
            return deal;
        }
    })
    return {
        type: "SEARCH_DEALS_SUCCESS",
        payload: {
            searchedDeals,
            searchTerm
        }
    }
}

export const resetSearchbar = () => {
    console.log("reset searchbar");
    return {
        type: "RESET_FILTER"
    }
}