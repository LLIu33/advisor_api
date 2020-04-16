const express = require('express');
const ReportCtrl = require('../controllers/report');
const reportRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints for reports
 */

/**
 * @swagger
 * /v2/api/reports:
 *   post:
 *     description: Create review report
 *     tags: [Reports]
 *     responses:
 *       201:
 *         description: Successfully created
 */
reportRouter.post('/reports', ReportCtrl.createReviewReport);

/**
 * @swagger
 * /v2/api/photo-reports:
 *   post:
 *     description: Create photo report
 *     tags: [Reports]
 *     responses:
 *       201:
 *         description: Successfully created
 */
reportRouter.post('/photo-reports', ReportCtrl.createPhotoReport);

/**
 * @swagger
 * /v2/api/list-reports:
 *   post:
 *     description: Create list report
 *     tags: [Reports]
 *     responses:
 *       201:
 *         description: Successfully created
 */
reportRouter.post('/list-reports', ReportCtrl.createListReport);

module.exports = reportRouter;
