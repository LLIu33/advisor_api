const Joi = require('@hapi/joi');

const entities = [
  'AppSettings',
  'cuisines',
  'feedbacks',
  'index-places',
  'lists',
  'photo-reports',
  'place-add-suggestions',
  'place-edit-suggestions',
  'places',
  'profiles',
  'reports',
];

const collectionSchema = Joi.string().valid(...entities);

module.exports = collectionSchema;
