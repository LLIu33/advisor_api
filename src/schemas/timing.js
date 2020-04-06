const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Timing:
 *       type: object
 *       properties:
 *         periods:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               open:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 0
 *                   time:
 *                     type: string
 *                     example: "0800"
 *               close:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   time:
 *                     type: string
 *                     example: "0000"
 *               closed:
 *                 type: boolean
 *                 example: false
 */

const timingSchema = Joi.object({
  periods: Joi.array().items(
    Joi.object({
      open: Joi.object({
        day: Joi.number(),
        time: Joi.string()
      }),
      close: Joi.object({
        day: Joi.number(),
        time: Joi.string()
      }).allow(null),
      closed: Joi.boolean().allow(null),
    }
  ),
});

module.exports = timingSchema;
