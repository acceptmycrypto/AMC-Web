export const FETCH_HOMEPAGE_DEALS_BEGIN = "FETCH_HOMEPAGE_DEALS_BEGIN";
export const FETCH_HOMEPAGE_DEALS_SUCCESS = "FETCH_HOMEPAGE_DEALS_SUCCESS";
export const FETCH_HOMEPAGE_DEALS_FAILURE = "FETCH_HOMEPAGE_DEALS_FAILURE";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SHOW_CRYPTOS_LOGOS_FOR_HOME_PAGE = "SHOW_CRYPTOS_LOGOS_FOR_HOME_PAGE";


export function _loadAllHomepageDeals() {

  return dispatch => {
    dispatch(fetchAllHomepageDealsBegin());
    return Promise.all([
      fetch("/load/categories/list"),
      fetch("/home/categorized/deals"),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([category_list, jsonCategorizedDeals]) => {


        dispatch(fetchAllHomepageDealsSuccess(category_list,jsonCategorizedDeals));

        return jsonCategorizedDeals;
      })
      .catch(error => dispatch(fetchAllHomepageDealsFailure(error)));
  };
}

  export const fetchAllHomepageDealsBegin = () => ({
    type: FETCH_HOMEPAGE_DEALS_BEGIN
  });

  export const fetchAllHomepageDealsSuccess = (category_list, homepage_deals) => ({
    type: FETCH_HOMEPAGE_DEALS_SUCCESS,
    payload: {category_list, homepage_deals}
  });

  export const fetchAllHomepageDealsFailure = error => ({
    type: FETCH_HOMEPAGE_DEALS_FAILURE,
    payload: { error }
  });


  export function _loadAllHomepageDealsMobile() {

    return dispatch => {
      dispatch(fetchAllHomepageDealsMobileBegin());
      return Promise.all([
        fetch("/load/categories/list/mobile"),
        fetch("/home/categorized/deals"),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([category_list, jsonCategorizedDeals]) => {
          
  
          dispatch(fetchAllHomepageDealsMobileSuccess(category_list,jsonCategorizedDeals));
          
          return jsonCategorizedDeals;
        })
        .catch(error => dispatch(fetchAllHomepageDealsMobileFailure(error)));
    };
  }
  
    export const fetchAllHomepageDealsMobileBegin = () => ({
      type: FETCH_HOMEPAGE_DEALS_BEGIN
    });
    
    export const fetchAllHomepageDealsMobileSuccess = (category_list, homepage_deals) => ({
      type: FETCH_HOMEPAGE_DEALS_SUCCESS,
      payload: {category_list, homepage_deals}
    });
    
    export const fetchAllHomepageDealsMobileFailure = error => ({
      type: FETCH_HOMEPAGE_DEALS_FAILURE,
      payload: { error }
    });

  export const updateSelectedCategory = (categoriesSelected) => {
    return {
      type: SELECT_CATEGORY,
      payload: {categoriesSelected}
    }
  };


  export const showCryptoLogos = () => ({
    type: SHOW_CRYPTOS_LOGOS_FOR_HOME_PAGE
  });

