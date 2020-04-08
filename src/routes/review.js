const express = require('express');

const ReviewCtrl = require('../controllers/review');
const queryValidation = require('../middlewares/queryValidation');

const reviewRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: CRUD operations for reviews
 */

/**
 * @swagger
 * /api/places/{place_id}/reviews:
 *   get:
 *     description: Get list of reviews
 *     tags: [Reviews]
 *     parameters:
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Successfully got list of reviews
 */
reviewRouter.get('/places/:place_id/reviews', queryValidation, ReviewCtrl.getList);

/**
 * @swagger
 * /api/places/{place_id}/reviews:
 *   post:
 *     description: Create review
 *     tags: [Reviews]
 *     responses:
 *       201:
 *         description: Successfully created
 */
reviewRouter.post('/places/:place_id/reviews', queryValidation, ReviewCtrl.create);

/**
 * @swagger
 * /api/places/{place_id}/reviews/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully returned
 */
reviewRouter.get('/places/:place_id/reviews/:item_id', queryValidation, ReviewCtrl.get);

/**
 * @swagger
 * /api/places/{place_id}/reviews/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully updated
 */
reviewRouter.put('/places/:place_id/reviews/:item_id', queryValidation, ReviewCtrl.update);

/**
 * @swagger
 * /api/places/{place_id}/reviews/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully removed
 */
reviewRouter.delete('/places/:place_id/reviews/:item_id', queryValidation, ReviewCtrl.remove);

module.exports = reviewRouter;
