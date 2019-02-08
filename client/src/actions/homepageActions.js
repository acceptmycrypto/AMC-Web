export const FETCH_HOMEPAGE_DEALS_BEGIN = "FETCH_HOMEPAGE_DEALS_BEGIN";
export const FETCH_HOMEPAGE_DEALS_SUCCESS = "FETCH_HOMEPAGE_DEALS_SUCCESS";
export const FETCH_HOMEPAGE_DEALS_FAILURE = "FETCH_HOMEPAGE_DEALS_FAILURE";

// export function _loadHomepage() {
    
//     return dispatch => {
//       dispatch(fetchHomepageDealsBegin());
//       return Promise.all([
//         fetch("/load/categories/list"),
//         fetch("/home/deals/1"), // deals in category_id = 1 (Apparel & Accessories )
//         fetch("/home/deals/4"), // deals in category_id = 4 (Electronics, Computers & Office)
//         fetch("/home/deals/8"), // deals in category_id = 8 (Health & Beauty)
//         fetch("/home/deals/3"), // deals in category_id = 3 (Movies, Music & Games)
//       ])
//         .then(([res1, res2, res3, res4, res5]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()]))
//         .then(([category_list, apparel_accessories, electronics, health_beauty, movies_music_games]) => {
//             dispatch(fetchHomepageDealsSuccess(category_list, apparel_accessories, electronics, health_beauty, movies_music_games));
//             console.log(category_list, apparel_accessories, electronics, health_beauty, movies_music_games);
//             return (category_list, apparel_accessories, electronics, health_beauty, movies_music_games);
//         })
//         .catch(error => dispatch(fetchHomepageDealsFailure(error)));
//     };
//   }

// export const fetchHomepageDealsBegin = () => ({
//   type: FETCH_HOMEPAGE_DEALS_BEGIN
// });

// export const fetchHomepageDealsSuccess = (category_list, apparel_accessories, electronics, health_beauty, movies_music_games) => ({
//   type: FETCH_HOMEPAGE_DEALS_SUCCESS,
//   payload: {category_list, apparel_accessories, electronics, health_beauty, movies_music_games}
// });

// export const fetchHomepageDealsFailure = error => ({
//   type: FETCH_HOMEPAGE_DEALS_FAILURE,
//   payload: { error }
// });

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


  export const updateSelectedCategory = (categoriesSelected) => {
    return {
      type: 'SELECT_CATEGORY',
      payload: {categoriesSelected}
    }
  };