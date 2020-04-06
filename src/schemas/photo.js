const Joi = require('@hapi/joi');

/**
 * @swagger
 * components:
 *   schemas:
 *     Photo:
 *       type: object
 *       properties:
 *         googlePhotoRef:
 *           type: string
 *           example: CmRaAAAA1ATesW5LcItcd4wAZ2yYi4LeOHfmZ-V7kXGxU-W9g24MQ7Fgo8TX4Eqc_zhTDYODBMjJ5ZbJJO3R
 *         storageRef:
 *           type: string
 *           example: place-photos/360_Mall_+_Murooj-B+F_Open_Flame_Kitchen-29.266775-47.9925806/google/01-14-2020_15:43:13
 *         position:
 *           type: string
 *           example: 2
 *         reviewId:
 *           type: string
 *           example: NhzAZI7vdgRlqpC83k2bPWLcQ8N2
 *         imageUrl:
 *           type: string
 *           example: https://firebasestorage.googleapis.com/v0/b/fobe-id.appspot.com/o/place-photo
 *         uid:
 *           type: string
 *           example: NhzAZI7vdgRlqpC83k2bPWLcQ8N2
 *         date:
 *           $ref: '#/components/schemas/Date'
 *         caption:
 *           type: string
 *           example: Google Photos
 *         category:
 *           type: string
 *           example: Instagram
 */

//   *         profileRef:
//  *           $ref: '#/components/schemas/Profile'
const photoSchema = Joi.object({
  imageUrl: Joi.string(),
  caption: Joi.string().allow(null),
  category: Joi.string().allow(null),
  storageRef: Joi.string().allow(null),
  uid: Joi.string().allow(null),
  reviewId: Joi.string().allow(null),
  googlePhotoRef: Joi.string().allow(null),
  position: Joi.number().allow(null),
  date: Joi.object().allow(null),
  // profileRef: Joi.object().allow(null),
});

module.exports = photoSchema;
