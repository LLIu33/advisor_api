const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           example: NhzAZI7vdgRlqpC83k2bPWLcQ8N2
 *         firstName:
 *           type: string
 *           example: CmRaAAAA1ATesW5LcItcd4wAZ2yYi4LeOHfmZ-V7kXGxU-W9g24MQ7Fgo8TX4Eqc_zhTDYODBMjJ5ZbJJO3R
 *         lastName:
 *           type: string
 *           example: place-photos/360_Mall_+_Murooj-B+F_Open_Flame_Kitchen-29.266775-47.9925806/google/01-14-2020_15:43:13
 *         gender:
 *           type: string
 *           example: 2
 *         birthday:
 *           type: object
 *           properies:
 *             _seconds:
 *               type: number
 *               example: 1579012993
 *             _nanoseconds:
 *               type: number
 *               example: 315973000
 *         avatarUrl:
 *           type: string
 *           example: https://firebasestorage.googleapis.com/v0/b/fobe-id.appspot.com/o/place-photo
 *         placeIds:
 *           type: array
 *         reviewsPlaceListItems:
 *           type: string
 *           example: NhzAZI7vdgRlqpC83k2bPWLcQ8N2
 *         photosPlaceListItems:
 *           type: string
 *           example: Google Photos
 *         savedPlaceIds:
 *           type: string
 *           example: Instagram
 *         level:
 *           type: array
 *         latestCongratsLevel:
 *           type: string
 *           example: NhzAZI7vdgRlqpC83k2bPWLcQ8N2
 *         points:
 *           type: string
 *           example: Google Photos
 *         role:
 *           type: string
 *           example: Instagram
 *         date:
 *           type: object
 *           properies:
 *             _seconds:
 *               type: number
 *               example: 1579012993
 *             _nanoseconds:
 *               type: number
 *               example: 315973000
 */

const placeSchema = Joi.object({
  uid: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  gender: Joi.string(),
  birthday: Joi.object().allow(null),
  avatarUrl: Joi.string().allow(null),
  placeIds: Joi.array().items(Joi.string()),
  reviewsPlaceListItems: Joi.array().items(Joi.object()),
  photosPlaceListItems: Joi.array().items(Joi.object()),
  savedPlaceIds: Joi.array().items(Joi.string()).allow(null),
  level: Joi.number(),
  latestCongratsLevel: Joi.number(),
  points: Joi.number(),
  role: Joi.number().allow(null),
  date: Joi.object().allow(null),
});

module.exports = placeSchema;
