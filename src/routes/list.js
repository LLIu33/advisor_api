const express = require('express');

const ListCtrl = require('../controllers/list');
const queryValidation = require('../middlewares/queryValidation');

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
listRouter.get('/lists', queryValidation, ListCtrl.getCollection);

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
listRouter.post('/lists', queryValidation, ListCtrl.create);

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
 *         description: Successfully retuned
 */
listRouter.get('/lists/:item_id', queryValidation, ListCtrl.get);

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
listRouter.put('/lists/:item_id', queryValidation, ListCtrl.update);

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
listRouter.delete('/lists/:item_id', queryValidation, ListCtrl.remove);

module.exports = listRouter;
