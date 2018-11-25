export const searchDeals = (searchTerm, allDeals) => {
    console.log("searchTerm: "+searchTerm);
    let searchedDeals = allDeals.filter(deal => {
        if (deal.deal_name.toLowerCase().includes(searchTerm) || deal.deal_description.toLowerCase().includes(searchTerm)){
            return deal;
        }
    })
    return {
        type: "SEARCH_DEALS_SUCCESS",
        payload: { searchedDeals,searchTerm }
    }
}