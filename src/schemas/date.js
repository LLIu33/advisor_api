const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Date:
 *       type: object
 *       properies:
 *         _seconds:
 *           type: number
 *           example: 1579012993
 *         _nanoseconds:
 *           type: number
 *           example: 315973000
 */

const dateSchema = Joi.object({
  _seconds: Joi.number().required(),
  _nanoseconds: Joi.number().required(),
});

module.exports = dateSchema;
