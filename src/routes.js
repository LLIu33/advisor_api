const express = require('express');

const v1 = require('./v1/routes');
const v2 = require('./v2/routes');

const appRouter = express.Router();

appRouter.use('/v1', v1);
appRouter.use('/v2', v2);
appRouter.use('/', v1);

module.exports = appRouter;
