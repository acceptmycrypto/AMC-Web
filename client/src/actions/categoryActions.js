export const filterCategory = (category, allDeals) => {

  let categorizedDeals = allDeals.filter(deal =>  {
    if(deal.category.includes(category)) {
      return deal;
    }
  });

  return {
      type: "FILTER_DEALS_BY_CATEGORY",
      payload: {
        categorizedDeals,
        category
      }
  }
}

export const resetFilter = deals => ({
  type: "RESET_FILTER"
});