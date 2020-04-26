const jsonToPhoto = (photos) => {
  photos = photos || [];
  return photos.map((photo) => {
    return {
      caption: photo.caption,
      category: photo.category,
      googlePhotoRef: photo.googlePhotoRef,
      imageUrl: photo.imageUrl,
      position: photo.position,
      storageRef: photo.storageRef,
      uid: photo.uid,
      reviewId: photo.reviewId === '' ? null : photo.reviewId,
    };
  });
};

const photoToJson = (photo) => {
  return {
    imageUrl: photo.imageUrl,
    date: photo.publishedAt,
    caption: photo.caption,
    category: photo.category,
    googlePhotoRef: photo.googlePhotoRef,
    storageRef: photo.storageRef,
    position: photo.position,
    reviewId: photo.reviewUid,
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
