const express = require('express');
const AreaCtrl = require('../../controllers/area');
const areaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: CRUD operations for areas
 */

/**
 * @swagger
 * /api/areas:
 *   get:
 *     description: Get list of areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Successfully got list of areas
 */
areaRouter.get('/areas', AreaCtrl.getList);

module.exports = areaRouter;
