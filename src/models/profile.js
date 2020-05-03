const firebase = require('../utils/firebase');
const firebaseAdmin = require('firebase-admin');
const uuid = require('uuid/v4');
const reviewModel = require('./review');
const placeModel = require('./place');

const db = firebase.getDb();
const collectionName = 'profiles';

const getListOfProfiles = async (params) => {
  const { limit, offset, filter } = params;
  let query = db.collection(collectionName).limit(limit).offset(offset);
  if (filter) {
    for (const prop in filter) {
      query = query.where(prop, '==', filter[prop]);
    }
  }

  const querySnapshot = await query.get();
  const profiles = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    profiles,
    limit,
    offset,
  };
};

const create = async (newData) => {
  const newEntityId = newData.id || newData.uid || uuid();
  newData.uid = newEntityId;
  newData = processDataForProfile(newData);
  const isCreated = await db
    .collection(collectionName)
    .doc('/' + newEntityId + '/')
    .create(newData);
  if (!isCreated) {
    return false;
  }
  const document = await db.collection(collectionName).doc(newEntityId).get();
  return document.data();
};

const getById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const item = await document.get();
  return item.data();
};

const getReviewsById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const profile = await document.get();
  const profileData = profile.data();
  const data = [];
  if (profileData.placeIds.length > 0) {
    const places = await reviewModel.getReviewsByPlaceIds(profileData.placeIds);
    places.forEach((place) => {
      const review = place.reviews.length > 0 && place.reviews[0].id === profileData.uid ? place.reviews[0] : null;
      if (review) {
        data.push({
          placeId: place.id,
          review: review,
        });
      }
    });
  }
  return data;
};

const getPhotosById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const item = await document.get();
  const profileData = item.data();
  const data = [];
  if (profileData.placeIds.length > 0) {
    const places = await placeModel.getPlacesByIds(profileData.placeIds);
    places.forEach((place) => {
      place.photos = place.photos || [];
      data.push({
        placeId: place.id,
        photos: place.photos.filter((photo) => photo.uid === profileData.uid),
      });
    });
  }
  return data;
};

const updateById = async (entityId, newData) => {
  newData.uid = entityId;
  newData = processDataForProfile(newData);
  const isUpdated = await db.collection(collectionName).doc(entityId).update(newData);
  if (!isUpdated) {
    return false;
  }
  const document = await db.collection(collectionName).doc(entityId).get();
  return document.data();
};

const processDataForProfile = (data) => {
  data.date = new firebaseAdmin.firestore.Timestamp(data.date._seconds, data.date._nanoseconds);
  data.birthday = new firebaseAdmin.firestore.Timestamp(data.birthday._seconds, data.birthday._nanoseconds);
  return data;
};

module.exports = {
  getListOfProfiles,
  create,
  getById,
  getPhotosById,
  getReviewsById,
  updateById,
};
