const db = require('../models');
const ReviewReport = db.ReviewReport;
const PhotoReport = db.PhotoReport;
const ListReport = db.ListReport;

const { jsonToReviewReport, jsonToListReport, jsonToPhotoReport } = require('../mappers/report');

const createReviewReport = async (req, res) => {
  try {
    const newData = jsonToReviewReport(req.body);
    const response = await ReviewReport.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const createPhotoReport = async (req, res) => {
  try {
    const newData = jsonToPhotoReport(req.body);
    const response = await PhotoReport.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const createListReport = async (req, res) => {
  try {
    const newData = jsonToListReport(req.body);
    const response = await ListReport.create(newData);
    return res.status(200).send(response);
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
