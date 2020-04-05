const Joi = require('@hapi/joi');

// TODO: create schemas for FoodApp, Review, GoogleReview, Location, Contacts, openingHours
/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 360_Mall_+_Murooj-B+F_Open_Flame_Kitchen-29.266775-47.9925806
 *         name:
 *           type: string
 *           example: B+F Open Flame Kitchen - 360 Mall
 *         deliveryApps:
 *           type: array
 *           items:
 *             type: string
 *             example:
 *               - Talabat
 *               - Deliveroo
 *         googlePhotos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         cost:
 *           type: number
 *           example: 2
 *         isNewlyOpened:
 *           type: boolean
 *           example: true
 *         cuisines:
 *           type: array
 *           items:
 *             type: string
 *             example:
 *               - Desserts
 *               - Coffee
 *         googlePlaceId:
 *           type: string
 *           example: 'ChIJI5ceCOcLzz8RU4aS7wL6Pi0'
 *         positionedPhotos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         openingHours:
 *           type: object
 *           properties:
 *             periods:
 *               type: array
 *               items:
 *                 type: object
 *                 example: period
 *         reviewsNumber:
 *           type: number
 *           example: 0
 *         hidden:
 *           type: boolean
 *           example: false
 *         hasDelivery:
 *           type: boolean
 *           example: false
 *         rating:
 *           type: object
 *           properties:
 *             atmosphere:
 *               type: number
 *               example: 0
 *             service:
 *               type: number
 *               example: 0
 *             quality:
 *               type: number
 *               example: 0
 *         popularDishes:
 *           type: array
 *         venueId:
 *           type: string
 *           example: ''
 *         googleReviews:
 *           type: array
 *           items:
 *             type: object
 *             example: googleReview
 *         hasOutdoorSeating:
 *           type: boolean
 *           example: false
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             example: review
 *         contacts:
 *           type: object
 *           properties:
 *             carrigeMenu:
 *               type: string
 *               example: null
 *             phone:
 *               type: string
 *               example: +965 6000 8420
 *             deliverooMenu:
 *               type: string
 *               example: null
 *             website:
 *               type: string
 *               example: ''
 *             instagram:
 *               type: string
 *               example: bon_kw
 *             menusite:
 *               type: string
 *               example: ''
 *             talabatMenu:
 *               type: string
 *               example: null
 *         mainPhotos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         pickUpApps:
 *           type: array
 *           items:
 *             type: string
 *             example:
 *               - Talabat
 *               - Deliveroo
 *         photo_references:
 *           type: array
 *           items:
 *             type: string
 *             example:
 *               - CmRaAAAAk8C5v1xgLYxYToZr9x3-8zRAM4zKXwBrcPPpjE3aFqYvGQ6xF_e0QpSDmjMRaajzxCZq6J6Xb597XuY2e1ADsJSp--bFCsoBEupz5uy
 *               - CmRaAAAAqDAr0NBiNWFmtX4LOPaZaFVVAVdW92BNwe-i9HZ7aSvUTggV1VY-Xe2eWm5Wgp4VC_2sqzVsG6z15m3gAW3QCcmaZOUOZfWGrt4RtnW
 *         location:
 *           type: object
 *           properties:
 *             coordinates:
 *               type: object
 *               properties:
 *                 _latitude:
 *                   type: string
 *                   example: 29.2119619
 *                 _longitude:
 *                   type: string
 *                   example: 48.1046707
 *             address:
 *               type: string
 *               example: Fnaitees
 *             area:
 *               type: string
 *               example: Fnaitees
 *         photos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 */

const placeSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  deliveryApps: Joi.array().items(Joi.string()),
  googlePhotos: Joi.array().items(Joi.object()),
  cost: Joi.number(),
  isNewlyOpened: Joi.boolean(),
  cuisines: Joi.array().items(Joi.string()),
  googlePlaceId: Joi.string(),
  positionedPhotos: Joi.array(),
  openingHours: Joi.object(),
  reviewsNumber: Joi.number(),
  hidden: Joi.boolean(),
  hasDelivery: Joi.boolean(),
  rating: Joi.object(),
  popularDishes: Joi.array(),
  venueId: Joi.string(),
  googleReviews: Joi.array(),
  hasOutdoorSeating: Joi.boolean(),
  reviews: Joi.array(),
  contacts: Joi.object(),
  mainPhotos: Joi.array(),
  pickUpApps: Joi.array(),
  photo_references: Joi.array(),
  location: Joi.object(),
  photos: Joi.array(),
});

module.exports = placeSchema;
