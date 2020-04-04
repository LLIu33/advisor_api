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
 *     responses:
 *       200:
 *         description: Successfully created
 */
apiRouter.get('/:collection', queryValidation, getListOfEntity);

/**
 * @swagger
 * /{collection}/{item_id}:
 *   get:
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
