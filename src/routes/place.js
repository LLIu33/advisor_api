const express = require('express');

const { getList } = require('../controllers/place');
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
placeRouter.get('/places', queryValidation, getList);

module.exports = placeRouter;
