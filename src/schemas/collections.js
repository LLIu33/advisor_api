const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   parameters:
 *     Collection:
 *       in: path
 *       name: collection
 *       schema:
 *         type: string
 *         enum: ['AppSettings', 'cuisines', 'feedbacks', 'index-places', 'lists', 'photo-reports', 'place-add-suggestions', 'place-edit-suggestions', 'places', 'profiles', 'reports']
 *       required: true
 *       description: name for collection of entities
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
  'places_backup',
  'profiles',
  'reports',
];

const collectionSchema = Joi.string().valid(...entities);

module.exports = collectionSchema;
