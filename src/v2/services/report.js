const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');

const db = firebase.getDb();
const reviewReportsName = 'reports';
const photoReportsName = 'photo-reports';
const listReportsName = 'list-reports';

const createReviewReport = async (newData) => {
  const newEntityId = uuid();
  newData.id = newEntityId;
  const isCreated = await db
    .collection(reviewReportsName)
    .doc('/' + newEntityId + '/')
    .create(newData);
  if (!isCreated) {
    return false;
  }
  const document = await db.collection(reviewReportsName).doc(newEntityId).get();
  return document.data();
};

const createPhotoReport = async (newData) => {
  const newEntityId = uuid();
  newData.id = newEntityId;
  const isCreated = await db
    .collection(photoReportsName)
    .doc('/' + newEntityId + '/')
    .create(newData);
  if (!isCreated) {
    return false;
  }
  const document = await db.collection(photoReportsName).doc(newEntityId).get();
  return document.data();
};

const createListReport = async (newData) => {
  const newEntityId = uuid();
  newData.id = newEntityId;
  const isCreated = await db
    .collection(listReportsName)
    .doc('/' + newEntityId + '/')
    .create(newData);
  if (!isCreated) {
    return false;
  }
  const document = await db.collection(listReportsName).doc(newEntityId).get();
  return document.data();
};

module.exports = {
  createReviewReport,
  createPhotoReport,
  createListReport,
};
