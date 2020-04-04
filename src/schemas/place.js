const Joi = require('@hapi/joi');

const placeSchema = Joi.object({
  id: Joi.string().alphanum().min(3).max(90).required(),
  name: Joi.string().alphanum().min(3).max(90).required(),
  deliveryApps: Joi.array().items(Joi.string()),
  googlePhotos: Joi.array().items(Joi.object()),
  cost: Joi.number(),
  isNewlyOpened: Joi.boolean(),
  cuisines: Joi.array().items(Joi.string()),
  googlePlaceId: Joi.string(),
  positionedPhotos: Joi.array(),
  openingHours: Joi.object(),
  reviewsNumber: Joi.number(),
  hidden: Joi.boolean(),
  hasDelivery: Joi.boolean(),
  rating: Joi.object(),
  popularDishes: Joi.array(),
  venueId: Joi.string(),
  googleReviews: Joi.array(),
  hasOutdoorSeating: Joi.boolean(),
  reviews: Joi.array(),
  contacts: Joi.object(),
  mainPhotos: Joi.array(),
  pickUpApps: Joi.array(),
  photo_references: Joi.array(),
  location: Joi.object(),
  photos: Joi.array(),
});

module.exports = placeSchema;
