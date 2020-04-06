const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         atmosphere:
 *           type: number
 *           example: 0
 *         service:
 *           type: number
 *           example: 0
 *         quality:
 *           type: number
 *           example: 0
 */

const ratingSchema = Joi.object({
  atmosphere: Joi.number().required(),
  service: Joi.number().required(),
  quality: Joi.number().required(),
});

module.exports = ratingSchema;
