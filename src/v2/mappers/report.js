const firebaseAdmin = require('firebase-admin');

const jsonToPhotoReport = (item) => {
  return {
    uid: item.uid,
    placeId: item.placeId,
    photoCaption: item.photo.caption,
    photoCategory: item.photo.category,
    photoDate: item.photo.date
      ? new firebaseAdmin.firestore.Timestamp(item.photo.date._seconds, item.photo.date._nanoseconds).toDate()
      : null,
    photoImageUrl: item.photo.imageUrl,
    photoProfileRef: item.photo.profileRef ? item.photo.profileRef.id : null,
    photoReviewId: item.photo.reviewId,
    photoStorageRef: item.photo.storageRef,
    photoUid: item.photo.uid,
    timestamp: new firebaseAdmin.firestore.Timestamp(item.timestamp._seconds, item.timestamp._nanoseconds).toDate(),
  };
};

const jsonToReviewReport = (item) => {
  return {
    uid: item.uid,
    placeId: item.placeId,
    text: item.text,
    reviewId: item.reviewId,
    reviewUID: item.reviewUID,
    timestamp: new firebaseAdmin.firestore.Timestamp(item.timestamp._seconds, item.timestamp._nanoseconds).toDate(),
  };
};

const jsonToListReport = (item) => {
  return {
    uid: item.uid,
    listId: item.listId,
    text: item.text,
    timestamp: new firebaseAdmin.firestore.Timestamp(item.timestamp._seconds, item.timestamp._nanoseconds).toDate(),
  };
};

module.exports = {
  jsonToPhotoReport,
  jsonToReviewReport,
  jsonToListReport,
};
