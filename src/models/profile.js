const firebase = require('../utils/firebase');
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
  return await db
    .collection(collectionName)
    .doc('/' + uuid() + '/')
    .create(newData);
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
  const reviews = profileData.placeIds ? await reviewModel.getReviewsByPlaceIds(profileData.placeIds) : [];
  return reviews;
};

const getPhotosById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const item = await document.get();
  const itemData = item.data();
  const photos = [];
  if (itemData.placeIds) {
    const places = await placeModel.getPlacesByIds(itemData.placeIds);
    places.forEach((place) => {
      photos.push(place.photos);
    });
  }
  return photos;
};

const updateById = async (entityId, newData) => {
  const document = db.collection(collectionName).doc(entityId);
  return await document.update(newData);
};

module.exports = {
  getListOfProfiles,
  create,
  getById,
  getPhotosById,
  getReviewsById,
  updateById,
};
