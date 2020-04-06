const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: HSCiGEw4ZC6fFBPRczLv
 *         name:
 *           type: string
 *           example: Saved
 *         creatorId:
 *           type: string
 *           example: 5o7InilKeWdk62pyjwJNnJ4oxIX2
 *         coverUrl:
 *           type: string
 *           example: https://firebasestorage.googleapis.com/v0/b/fobe-id.appspot.com/o/list-covers
 *         isPublic:
 *           type: boolean
 *           example: false
 *         isTrending:
 *           type: boolean
 *           example: false
 *         placeListItems:
 *           type: array
 *           items:
 *             type: string
 *             example: placeItem
 *         date:
 *           $ref: '#/components/schemas/Date'
 */

const listSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  creatorId: Joi.string().required(),
  coverUrl: Joi.string().allow(null),
  isPublic: Joi.boolean(),
  isTrending: Joi.boolean(),
  placeListItems: Joi.array().items(Joi.string()),
  date: Joi.object(),
});

module.exports = listSchema;
