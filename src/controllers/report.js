const reportModel = require('../models/report');

const create = async (req, res) => {
  try {
    const newData = req.body;
    await reportModel.create(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  create,
};
