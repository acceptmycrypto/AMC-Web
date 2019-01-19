export function _loadCategory() {
  const settings = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  };

  return dispatch => {
    dispatch(fetchCategoryBegin());
    return fetch("/category/parent", settings)
      .then(res => res.json())
      .then(jsonCategory => {

        let options = [];
        jsonCategory.map(category => {

          let optionObj = {};
          optionObj.value = category.category_name;
          optionObj.label = category.category_name;

          options.push(optionObj);
        })

        dispatch(fetchCategorySuccess(options));
        
        return options;
      })
      .catch(error => dispatch(fetchCategoryFailure(error)));
  };
}

export const fetchCategoryBegin = () => ({
  type: "FETCH_CATEGORY_BEGIN"
});

export const fetchCategorySuccess = parentCategory => ({
  type: "FETCH_CATEGORY_SUCCESS",
  payload: {parentCategory}
});

export const fetchCategoryFailure = error => ({
  type: "FETCH_CATEGORY_FAILURE",
  payload: { error }
});


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
