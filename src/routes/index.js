const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const placeRouter = require('./place');
const { createEntity, getEntity, getListOfEntity, updateEntity, delteEntity } = require('../controllers');
const swaggerDefinition = require('../utils/swagger');
const queryValidation = require('../middlewares/queryValidation');

const rootRouter = express.Router();
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
apiRouter.post('/:collection', queryValidation, createEntity);

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
apiRouter.get('/:collection', queryValidation, getListOfEntity);

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
apiRouter.get('/:collection/:item_id', queryValidation, getEntity);

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
apiRouter.put('/:collection/:item_id', queryValidation, updateEntity);

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
apiRouter.delete('/:collection/:item_id', queryValidation, delteEntity);

const swaggerSpec = swaggerJsdoc(swaggerDefinition);
rootRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
rootRouter.use('/api', placeRouter);
rootRouter.use('/api', apiRouter);

module.exports = rootRouter;

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
