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
 *         description: Successfully retuned
 */
profileRouter.get('/profiles/:item_id', queryValidation, ProfileCtrl.get);

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

/**
 * @swagger
 * /api/profiles/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete profile
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Successfully removed
 */
profileRouter.delete('/profiles/:item_id', queryValidation, ProfileCtrl.remove);

module.exports = profileRouter;
