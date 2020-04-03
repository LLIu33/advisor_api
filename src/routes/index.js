const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { createEntity, getEntity, getListOfEntity, updateEntity, delteEntity } = require('../controllers');
const swaggerOptions = require('../utils/swagger');

const rootRouter = express.Router(); // eslint-disable-line new-cap

const apiRouter = express.Router();
apiRouter.post('/:collection', createEntity);
apiRouter.get('/:collection', getListOfEntity);
apiRouter.get('/:collection/:item_id', getEntity);
apiRouter.put('/:collection/:item_id', updateEntity);
apiRouter.delete('/:collection/:item_id', delteEntity);

const swaggerSpec = swaggerJsdoc(swaggerOptions);
rootRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
rootRouter.use('/api', apiRouter);

module.exports = rootRouter;
