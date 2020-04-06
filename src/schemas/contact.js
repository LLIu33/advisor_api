const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         carrigeMenu:
 *           type: string
 *           example: null
 *         phone:
 *           type: string
 *           example: +965 6000 8420
 *         deliverooMenu:
 *           type: string
 *           example: null
 *         website:
 *           type: string
 *           example: ''
 *         instagram:
 *           type: string
 *           example: bon_kw
 *         menusite:
 *           type: string
 *           example: ''
 *         talabatMenu:
 *           type: string
 *           example: null
 */

const contactSchema = Joi.object({
  atmosphere: Joi.number().required(),
  service: Joi.number().required(),
  quality: Joi.number().required(),
});

module.exports = contactSchema;
