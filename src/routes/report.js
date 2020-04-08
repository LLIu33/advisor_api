const express = require('express');

const ReportCtrl = require('../controllers/report');
const queryValidation = require('../middlewares/queryValidation');

const reportRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints for reports
 */

/**
 * @swagger
 * /api/reports:
 *   post:
 *     description: Create report
 *     tags: [Reports]
 *     responses:
 *       201:
 *         description: Successfully created
 */
reportRouter.post('/reports', queryValidation, ReportCtrl.create);

module.exports = reportRouter;
