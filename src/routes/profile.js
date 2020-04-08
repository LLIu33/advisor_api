const express = require('express');

const ProfileCtrl = require('../controllers/profile');
const queryValidation = require('../middlewares/queryValidation');

const profileRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: CRUD operations for profiles
 */

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     description: Get list of profiles
 *     tags: [Profiles]
 *     parameters:
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Successfully got list of profiles
 */
profileRouter.get('/profiles', queryValidation, ProfileCtrl.getList);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     description: Create profile
 *     tags: [Profiles]
 *     responses:
 *       201:
 *         description: Successfully created
 */
profileRouter.post('/profiles', queryValidation, ProfileCtrl.create);

/**
 * @swagger
 * /api/profiles/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get profile
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
profileRouter.get('/profiles/:item_id', queryValidation, ProfileCtrl.get);

/**
 * @swagger
 * /api/profiles/{item_id}/photos:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get user’s photos
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
profileRouter.get('/profiles/:item_id/photos', queryValidation, ProfileCtrl.getPhotos);

/**
 * @swagger
 * /api/profiles/{item_id}/reviews:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get user’s reviews
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
profileRouter.get('/profiles/:item_id/reviews', queryValidation, ProfileCtrl.getReviews);

/**
 * @swagger
 * /api/profiles/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update profile
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
profileRouter.put('/profiles/:item_id', queryValidation, ProfileCtrl.update);

module.exports = profileRouter;
