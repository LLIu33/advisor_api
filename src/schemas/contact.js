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
  carrigeMenu: Joi.string(),
  phone: Joi.string(),
  deliverooMenu: Joi.string(),
  website: Joi.string(),
  instagram: Joi.string(),
  menusite: Joi.string(),
  talabatMenu: Joi.string(),
});

module.exports = contactSchema;
