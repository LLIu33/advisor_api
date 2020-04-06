const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: e2SFHSRIGrXbuz0FUdVq7ZVS1Iv1
 *         userID:
 *           type: string
 *           example: e2SFHSRIGrXbuz0FUdVq7ZVS1Iv1
 *         rating:
 *           $ref: '#/components/schemas/Rating'
 *         ratingTexts:
 *           type: object
 *           properties:
 *             atmosphere:
 *               type: string
 *               example: atmosphere text
 *             quality:
 *               type: string
 *               example: quality text
 *             service:
 *               type: string
 *               example: service text
 *         text:
 *           type: string
 *           example: review text
 *         photos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         date:
 *           $ref: '#/components/schemas/Date'
 */

const reviewSchema = Joi.object({
  id: Joi.string().required(),
  userID: Joi.string().required(),
  rating: Joi.object().required(),
  ratingTexts: Joi.object(),
  text: Joi.string().required(),
  photos: Joi.array(),
  date: Joi.object(),
});

module.exports = reviewSchema;
