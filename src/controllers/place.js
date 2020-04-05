const placeModel = require('../models/place');

const getList = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    limit = limit >= 0 ? limit : 0;
    limit = limit <= 100 ? limit : 100;
    const offset = parseInt(req.query.offset) || 0;
    const response = await placeModel.getListOfPlaces(limit, offset);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getList,
};
