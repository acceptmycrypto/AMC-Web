export const FETCH_HOMEPAGE_DEALS_BEGIN = "FETCH_HOMEPAGE_DEALS_BEGIN";
export const FETCH_HOMEPAGE_DEALS_SUCCESS = "FETCH_HOMEPAGE_DEALS_SUCCESS";
export const FETCH_HOMEPAGE_DEALS_FAILURE = "FETCH_HOMEPAGE_DEALS_FAILURE";

export function _loadHomepage() {
    
    return dispatch => {
      dispatch(fetchHomepageDealsBegin());
      return Promise.all([
        fetch("/load/categories/list"),
        fetch("/home/deals/1") // deals in category_id = 1 (Apparel & Accessories )
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([category_list, apparel_accessories]) => {
            dispatch(fetchHomepageDealsSuccess(category_list, apparel_accessories));
            console.log(category_list, apparel_accessories);
            return (category_list, apparel_accessories);
        })
        .catch(error => dispatch(fetchHomepageDealsFailure(error)));
    };
  }

  export const fetchHomepageDealsBegin = () => ({
    type: FETCH_HOMEPAGE_DEALS_BEGIN
  });
  
  export const fetchHomepageDealsSuccess = (category_list, apparel_accessories) => ({
    type: FETCH_HOMEPAGE_DEALS_SUCCESS,
    payload: {category_list, apparel_accessories}
  });
  
  export const fetchHomepageDealsFailure = error => ({
    type: FETCH_HOMEPAGE_DEALS_FAILURE,
    payload: { error }
  });