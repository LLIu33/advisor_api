const areaModel = require('../models/area');

const getList = async (req, res, next) => {
  try {
    const response = await areaModel.getListOfAreas();
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
};
