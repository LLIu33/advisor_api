const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         coordinates:
 *           type: object
 *           properties:
 *             _latitude:
 *               type: string
 *               example: 29.2119619
 *             _longitude:
 *               type: string
 *               example: 48.1046707
 *         address:
 *           type: string
 *           example: Fnaitees
 *         area:
 *           type: string
 *           example: Fnaitees
 */

const locationSchema = Joi.object({
  coordinates: Joi.object().required(),
  address: Joi.string().required(),
  area: Joi.string().required(),
});

module.exports = locationSchema;
