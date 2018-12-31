export function _uploadImage(token, imageData) {
  //once image is uploaded, push that image to the state

  const settings = {
    method: "POST",
    headers: {
      Authorization: token, //verify the token in the headers
    },
    body: imageData
  };

  return dispatch => {
    dispatch(uploadingImageBegin());
    return fetch("/image/upload", settings)
      .then(res => res.json())
      .then(jsonImage => {
        dispatch(uploadingImageSuccess(jsonImage));
        return jsonImage;
      })
      .catch(error => dispatch(uploadingImageFailure(error)));
  };
}

export const uploadingImageBegin = () => ({
  type: "UPLOADING_IMAGES_BEGIN"
});

export const uploadingImageSuccess = imageData => ({
  type: "UPLOADING_IMAGES_SUCCESS",
  payload: imageData
});

export const uploadingImageFailure = error => ({
  type: "UPLOADING_IMAGES_FAILURE",
  payload: { error }
});

export const onSelectImageToView = (event) => {
  return {
      type: 'VIEW_UPLOADED_IMAGE',
      payload: event.target.getAttribute('src')
  }
};

export function _removeImage(token, imageKey) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token, imageKey})
  };

  fetch("/image/remove", settings).then(res => res.json());

  return {
    type: 'REMOVE_UPLOADED_IMAGE',
    payload: imageKey
  }
}

