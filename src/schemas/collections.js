const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   parameters:
 *     Collection:
 *       type: string
 *       enum: ['AppSettings', 'cuisines', 'feedbacks', 'index-places', 'lists', 'photo-reports', 'place-add-suggestions', 'place-edit-suggestions', 'places', 'profiles', 'reports']
 */

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
