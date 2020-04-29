const firebaseAdmin = require('firebase-admin');
const { photoToJson, jsonToPhoto } = require('./photo');

const jsonToReview = (data) => {
  return {
    uid: data.id,
    userUid: data.userID,
    placeId: data.placeId,
    atmosphereRating: data.rating.atmosphere,
    serviceRating: data.rating.service,
    qualityRating: data.rating.quality,
    atmosphereText: data.ratingTexts.atmosphere,
    serviceText: data.ratingTexts.service,
    qualityText: data.ratingTexts.atmosphere,
    text: data.text,
    publishedAt: new firebaseAdmin.firestore.Timestamp(data.date._seconds, data.date._nanoseconds).toDate(),
    photos: jsonToPhoto(data.photos),
  };
};

const reviewToJson = (entity) => {
  entity.photos = entity.photos || [];
  return {
    id: entity.uid,
    text: entity.text,
    userID: entity.userUid,
    rating: {
      atmosphere: entity.atmosphereRating,
      service: entity.serviceRating,
      quality: entity.qualityRating,
    },
    ratingTexts: {
      atmosphere: entity.atmosphereText,
      service: entity.serviceText,
      quality: entity.qualityText,
    },
    date: entity.publishedAt ? firebaseAdmin.firestore.Timestamp.fromDate(entity.publishedAt) : null,
    photos: entity.photos.map((item) => photoToJson(item, entity.uid)),
  };
};

module.exports = {
  jsonToReview,
  reviewToJson,
};
