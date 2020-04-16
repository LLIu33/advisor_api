const reportModel = require('../services/report');

const createReviewReport = async (req, res) => {
  try {
    const newData = req.body;
    await reportModel.createReviewReport(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const createPhotoReport = async (req, res) => {
  try {
    const newData = req.body;
    await reportModel.createPhotoReport(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const createListReport = async (req, res) => {
  try {
    const newData = req.body;
    await reportModel.createListReport(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  createReviewReport,
  createPhotoReport,
  createListReport,
};
