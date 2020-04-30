const reportModel = require('../models/report');

const createReviewReport = async (req, res, next) => {
  try {
    const newData = req.body;
    const response = await reportModel.createReviewReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const createPhotoReport = async (req, res, next) => {
  try {
    const newData = req.body;
    const response = await reportModel.createPhotoReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const createListReport = async (req, res, next) => {
  try {
    const newData = req.body;
    const response = await reportModel.createListReport(newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReviewReport,
  createPhotoReport,
  createListReport,
};
