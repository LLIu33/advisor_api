const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { createEntity, getEntity, getListOfEntity, updateEntity, delteEntity } = require('../controllers');
const swaggerOptions = require('../utils/swagger');
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
 * /{collection}:
 *   post:
 *     description: Create entity
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: name for collection of entities
 *     responses:
 *       201:
 *         description: Successfully created
 */
apiRouter.post('/:collection', queryValidation, createEntity);

/**
 * @swagger
 * /{collection}:
 *   get:
 *     description: Get list of entities
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: name for collection of entities
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         required: false
 *         description: The number of items to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         required: false
 *         description: The number of items to skip before starting to collect the result set.
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.get('/:collection', queryValidation, getListOfEntity);

/**
 * @swagger
 * /{collection}/{item_id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: name for collection of entities
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of entity
 *     description: Get entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.get('/:collection/:item_id', queryValidation, getEntity);

/**
 * @swagger
 * /{collection}/{item_id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: name for collection of entities
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of entity
 *     description: Update entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.put('/:collection/:item_id', queryValidation, updateEntity);

/**
 * @swagger
 * /{collection}/{item_id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: collection
 *         schema:
 *           type: string
 *         required: true
 *         description: name for collection of entities
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of entity
 *     description: Delete entity
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.delete('/:collection/:item_id', queryValidation, delteEntity);

const swaggerSpec = swaggerJsdoc(swaggerOptions);
rootRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
rootRouter.use('/api', apiRouter);

module.exports = rootRouter;
