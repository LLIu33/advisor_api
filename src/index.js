const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const { httpCodes } = require('./utils/http');
require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use('/', routes);

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).send('Not found');
});

app.use((err, req, res) => {
  console.log(err);
  res.status(httpCodes.INTERNAL_ERROR).send('Internal server error');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
