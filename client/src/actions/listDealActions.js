export function _uploadImage(imageData) {

  const settings = {
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: imageData
  };

  return dispatch => {
    dispatch(uploadingImageBegin());
    return fetch("/image/upload", settings)
      .then(res => res.json())
      .then(jsonImages => {
        dispatch(uploadingImageSuccess(jsonImages));
        return jsonImages;
      })
      .catch(error => dispatch(uploadingImageFailure(error)));
  };
}

export const uploadingImageBegin = () => ({
  type: "UPLOADING_IMAGES_BEGIN"
});

export const uploadingImageSuccess = images => ({
  type: "UPLOADING_IMAGES_SUCCESS",
  payload: { images }
});

export const uploadingImageFailure = error => ({
  type: "UPLOADING_IMAGES_FAILURE",
  payload: { error }
});
