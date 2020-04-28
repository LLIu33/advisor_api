const reportModel = require('../models/report');

const createReviewReport = async (req, res) => {
  try {
    const newData = req.body;
    const response = await reportModel.createReviewReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const createPhotoReport = async (req, res) => {
  try {
    const newData = req.body;
    const response = await reportModel.createPhotoReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const createListReport = async (req, res) => {
  try {
    const newData = req.body;
    const response = await reportModel.createListReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

module.exports = {
  createReviewReport,
  createPhotoReport,
  createListReport,
};
