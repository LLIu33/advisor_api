const express = require('express');
const { createEntity, getEntity, getListOfEntity, updateEntity, delteEntity } = require('../controllers');
const apiRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: CRUD operations for entities
 */

/**
 * @swagger
 * /api/{collection}:
 *   post:
 *     description: Create entity
 *     tags: [Entities]
 *     parameters:
 *       - $ref: '#/components/parameters/Collection'
 *     responses:
 *       201:
 *         description: Successfully created
 */
apiRouter.post('/:collection', createEntity);

/**
 * @swagger
 * /api/{collection}:
 *   get:
 *     description: Get list of entities
 *     tags: [Entities]
 *     parameters:
 *       - $ref: '#/components/parameters/Collection'
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.get('/:collection', getListOfEntity);

/**
 * @swagger
 * /api/{collection}/{item_id}:
 *   get:
 *     parameters:
 *       - $ref: '#/components/parameters/Collection'
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Get entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.get('/:collection/:item_id', getEntity);

/**
 * @swagger
 * /api/{collection}/{item_id}:
 *   put:
 *     parameters:
 *       - $ref: '#/components/parameters/Collection'
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Update entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.put('/:collection/:item_id', updateEntity);

/**
 * @swagger
 * /api/{collection}/{item_id}:
 *   delete:
 *     parameters:
 *       - $ref: '#/components/parameters/Collection'
 *       - $ref: '#/components/parameters/EntityId'
 *     description: Delete entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.delete('/:collection/:item_id', delteEntity);

module.exports = apiRouter;

/**
 * @swagger
 * components:
 *   parameters:
 *     EntityId:
 *       in: path
 *       name: item_id
 *       schema:
 *         type: string
 *       required: true
 *       description: Id of entity
 *     Limit:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 1000
 *         default: 100
 *       required: false
 *       description: The number of items to return.
 *     Offset:
 *       in: query
 *       name: offset
 *       schema:
 *         type: integer
 *         minimum: 0
 *         default: 0
 *       required: false
 *       description: The number of items to skip before starting to collect the result set.
 */
