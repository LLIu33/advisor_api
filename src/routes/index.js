const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const placeRouter = require('./place');
const listRouter = require('./list');
const reviewRouter = require('./review');
const profileRouter = require('./profile');
const reportRouter = require('./report');
const genericRouter = require('./generic');

const swaggerDefinition = require('../utils/swagger');
const queryValidation = require('../middlewares/queryValidation');
const { requiresLogin } = require('../middlewares/authentication');

const rootRouter = express.Router();
const apiRouter = express.Router();
apiRouter.use(placeRouter);
apiRouter.use(listRouter);
apiRouter.use(requiresLogin, profileRouter);
apiRouter.use(reviewRouter);
apiRouter.use(reportRouter);
apiRouter.use(genericRouter);

const swaggerSpec = swaggerJsdoc(swaggerDefinition);
rootRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
rootRouter.use('/api', queryValidation, apiRouter);

module.exports = rootRouter;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
