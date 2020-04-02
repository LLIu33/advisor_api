const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('An error occurred');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
