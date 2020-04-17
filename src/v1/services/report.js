const firebase = require('../../utils/firebase');
const uuid = require('uuid/v4');

const db = firebase.getDb();
const reviewReportsName = 'reports';
const photoReportsName = 'photo-reports';
const listReportsName = 'list-reports';

const createReviewReport = async (newData) => {
  return await db
    .collection(reviewReportsName)
    .doc('/' + uuid() + '/')
    .create(newData);
};

const createPhotoReport = async (newData) => {
  return await db
    .collection(photoReportsName)
    .doc('/' + uuid() + '/')
    .create(newData);
};

const createListReport = async (newData) => {
  return await db
    .collection(listReportsName)
    .doc('/' + uuid() + '/')
    .create(newData);
};

module.exports = {
  createReviewReport,
  createPhotoReport,
  createListReport,
};
