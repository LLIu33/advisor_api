const jsonToPhoto = (photo, placeId = null) => {
  return {
    placeId: placeId,
    caption: photo.caption,
    category: photo.category,
    googlePhotoRef: photo.googlePhotoRef,
    imageUrl: photo.imageUrl,
    position: photo.position,
    storageRef: photo.storageRef,
    uid: photo.uid,
    reviewUid: photo.reviewId === '' ? null : photo.reviewId,
  };
};

const photoToJson = (photo, reviewId = null) => {
  return {
    imageUrl: photo.imageUrl,
    date: photo.publishedAt,
    caption: photo.caption,
    category: photo.category,
    googlePhotoRef: photo.googlePhotoRef,
    storageRef: photo.storageRef,
    position: photo.position,
    reviewId: reviewId ? reviewId : photo.reviewUid,
  };
};

const shortPhotoToJson = (photo) => {
  return {
    imageUrl: photo.imageUrl,
    date: photo.publishedAt,
    category: photo.category,
    position: photo.position,
  };
};

module.exports = {
  jsonToPhoto,
  photoToJson,
  shortPhotoToJson,
};
