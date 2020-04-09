const express = require('express');
const ListCtrl = require('../controllers/list');
const listRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: CRUD operations for lists
 */

/**
 * @swagger
 * /api/lists:
 *   get:
 *     description: Get collection of lists
 *     tags: [Lists]
 *     parameters:
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Successfully got collection of lists
 */
listRouter.get('/lists', ListCtrl.getCollection);

/**
 * @swagger
 * /api/lists:
 *   post:
 *     description: Create list
 *     tags: [Lists]
 *     responses:
 *       201:
 *         description: Successfully created
 */
listRouter.post('/lists', ListCtrl.create);

/**
 * @swagger
 * /api/lists/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
listRouter.get('/lists/:item_id', ListCtrl.get);

/**
 * @swagger
 * /api/lists/{item_id}/places:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get places for list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
listRouter.get('/lists/:item_id/places', ListCtrl.getPlacesByListId);

/**
 * @swagger
 * /api/lists/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
listRouter.put('/lists/:item_id', ListCtrl.update);

/**
 * @swagger
 * /api/lists/{item_id}/addPlaces:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Add places to exist list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
listRouter.put('/lists/:item_id/addPlaces', ListCtrl.addPlacesToList);

/**
 * @swagger
 * /api/lists/{item_id}/addPlaces:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Remove place from exist list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
listRouter.delete('/lists/:item_id/removePlace/:place_id', ListCtrl.removePlaceFromList);

/**
 * @swagger
 * /api/lists/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Successfully removed
 */
listRouter.delete('/lists/:item_id', ListCtrl.remove);

module.exports = listRouter;
