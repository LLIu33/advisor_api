const collectionSchema = require('../schemas/collections');
const { httpCodes } = require('../utils/http');

module.exports = (req, res, next) => {
  const collectionName = req.params.collection;
  const { error } = collectionSchema.validate(collectionName);

  if (error) {
    return res.status(httpCodes.NOT_FOUND).send('Not found');
  }
  next();
};
