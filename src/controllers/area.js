const areaModel = require('../models/area');

const getList = async (req, res) => {
  try {
    const response = await areaModel.getListOfAreas();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

module.exports = {
  getList,
};
