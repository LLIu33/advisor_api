const moment = require('moment');

const jsonToGoogleReview = (data) => {
  return {
    authorName: data.author_name,
    profilePhotoUrl: data.profile_photo_url,
    rating: data.rating,
    text: data.text,
    publishedAt: data.time,
  };
};

const googleReviewToJson = (entity) => {
  return {
    author_name: entity.authorName,
    profile_photo_url: entity.profilePhotoUrl,
    rating: entity.rating,
    text: entity.text,
    time: moment(entity.publishedAt).unix(),
  };
};

const shortGoogleReviewToJson = (entity) => {
  return {
    rating: entity.rating,
    time: moment(entity.publishedAt).unix(),
  };
};

module.exports = {
  jsonToGoogleReview,
  googleReviewToJson,
  shortGoogleReviewToJson,
};
