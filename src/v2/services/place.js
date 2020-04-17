const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');
const axios = require('axios');

const db = firebase.getDb();
// const collectionName = 'places';
const collectionName = 'places_backup';

const getAll = async () => {
  const url = 'https://fobe-id.firebaseapp.com/list-cached';
  const response = await axios.get(url);
  if (!response || !response.data) {
    return [];
  }
  return {
    places: response.data,
    total: response.data.length,
  };
};

const getListOfPlaces = async (params) => {
  const { limit, offset, filter } = params;
  let query = db.collection(collectionName).limit(limit).offset(offset);
  if (filter) {
    for (const prop in filter) {
      query = query.where(prop, '==', filter[prop]);
    }
  }

  const querySnapshot = await query.get();
  const places = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    places,
    limit,
    offset,
  };
};

const getPlacesByIds = async (ids) => {
  const querySnapshot = await db.collection(collectionName).where('id', 'in', ids).get();
  const places = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return places;
};

const create = async (newData) => {
  const newEntityId = uuid();
  newData.id = newEntityId;
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
  const itemData = item.data();
  if (itemData.reviewsNumber) {
    const reviewsSnap = await db.collection(collectionName).doc(item.id).collection('reviews').get();
    itemData.reviews = reviewsSnap.docs.map((review) => {
      return review.data();
    });
  }
  return itemData;
};

const updateById = async (entityId, newData) => {
  newData.id = entityId;
  const isUpdated = await db.collection(collectionName).doc(entityId).update(newData);
  if (!isUpdated) {
    return false;
  }
  const document = await db.collection(collectionName).doc(entityId).get();
  return document.data();
};

const addPhotoToPlace = async (entityId, photoObj) => {
  const document = db.collection(collectionName).doc(entityId);
  const placeSnap = await document.get();
  const place = placeSnap.data();
  place.photos.push(photoObj);
  const isUpdated = await document.set({ photos: place.photos }, { merge: true });
  if (!isUpdated) {
    return false;
  }
  const updatedPlace = await db.collection(collectionName).doc(entityId).get();
  return updatedPlace.data();
};

const deleteById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  await document.delete();
};

module.exports = {
  getAll,
  getListOfPlaces,
  getPlacesByIds,
  addPhotoToPlace,
  create,
  getById,
  updateById,
  deleteById,
};
