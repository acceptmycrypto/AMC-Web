export function _loadPhoto(token) {
  const settingsPhoto = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };
  
  return dispatch => {
    dispatch(fetchPhotoBegin());
    return fetch("/navbar/photo", settingsPhoto)
      .then(res => res.json())
      .then(jsonPhoto => {
        dispatch(fetchPhotoSuccess(jsonPhoto));
        return jsonPhoto;
      })
      .catch(error => dispatch(fetchPhotoFailure(error)));
  };
}

export const fetchPhotoBegin = () => ({
  type: "FETCH_PHOTO_BEGIN"
});


export const fetchPhotoSuccess = photo => ({
  type: "FETCH_PHOTO_SUCCESS",
  payload: { photo }
});

export const fetchPhotoFailure = error => ({
  type: "FETCH_PHOTO_FAILURE",
  payload: { error }
});

export const resetNavbar = deals => ({
    type: "RESET_NAVBAR"
  });

export const openSideBarOnMobile = () => ({
  type: "OPEN_SIDE_BAR"
});

export const closeSideBarOnMobile = () => ({
  type: "CLOSE_SIDE_BAR"
});
