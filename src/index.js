const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { handleError, ErrorHandler } = require('./utils/error');

const routes = require('./routes');
const PORT = process.env.PORT || 5000;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(Sentry.Handlers.requestHandler());
app.use('/', routes);
app.use(Sentry.Handlers.errorHandler());

app.use((req, res) => {
  handleError(new ErrorHandler(404, 'Not found'), res);
});

app.use((err, req, res, next) => {
  console.log(err);
  handleError(new ErrorHandler(500, 'Internal server error'), res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
