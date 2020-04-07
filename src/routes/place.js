const express = require('express');

const PlaceCtrl = require('../controllers/place');
const queryValidation = require('../middlewares/queryValidation');

const placeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: CRUD operations for places
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     description: Get list of places
 *     tags: [Places]
 *     parameters:
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Successfully got list of places
 */
placeRouter.get('/places', queryValidation, PlaceCtrl.getList);

/**
 * @swagger
 * /api/places:
 *   post:
 *     description: Create place
 *     tags: [Places]
 *     responses:
 *       201:
 *         description: Successfully created
 */
placeRouter.post('/places', queryValidation, PlaceCtrl.create);

/**
 * @swagger
 * /api/places/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully retuned
 */
placeRouter.get('/places/:item_id', queryValidation, PlaceCtrl.get);

/**
 * @swagger
 * /api/places/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
placeRouter.put('/places/:item_id', queryValidation, PlaceCtrl.update);

/**
 * @swagger
 * /api/places/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully removed
 */
placeRouter.delete('/places/:item_id', queryValidation, PlaceCtrl.remove);

module.exports = placeRouter;
