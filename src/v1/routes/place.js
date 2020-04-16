const express = require('express');
const PlaceCtrl = require('../controllers/place');
const placeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: CRUD operations for places
 */

/**
 * @swagger
 * /v1/api/places/all:
 *   get:
 *     description: Get all places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Success
 */
placeRouter.get('/places/all', PlaceCtrl.getAllplaces);

/**
 * @swagger
 * /v1/api/places:
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
placeRouter.get('/places', PlaceCtrl.getList);

/**
 * @swagger
 * /v1/api/places:
 *   post:
 *     description: Create place
 *     tags: [Places]
 *     responses:
 *       201:
 *         description: Successfully created
 */
placeRouter.post('/places', PlaceCtrl.create);

/**
 * @swagger
 * /v1/api/places/byIds:
 *   get:
 *     parameters:
 *       item_ids:
 *         type: array
 *         items:
 *           - $ref: '#/components/parameters/EntityId'
 *     description: Get places by ids from body
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
placeRouter.get('/places/byIds', PlaceCtrl.getByIds);

/**
 * @swagger
 * /v1/api/places/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
placeRouter.get('/places/:item_id', PlaceCtrl.get);

/**
 * @swagger
 * /v1/api/places/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
placeRouter.put('/places/:item_id', PlaceCtrl.update);

/**
 * @swagger
 * /v1/api/places/{item_id}/add_photo:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Add photo to place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
placeRouter.put('/places/:item_id/add_photo', PlaceCtrl.addPhotoToPlace);

/**
 * @swagger
 * /v1/api/places/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete place
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Successfully removed
 */
placeRouter.delete('/places/:item_id', PlaceCtrl.remove);

module.exports = placeRouter;
