const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');
const placeModel = require('./place');

const db = firebase.getDb();
const collectionName = 'lists_backup';

const getCollectionOfLists = async (params) => {
  const { limit, offset, filter } = params;
  let query = db.collection(collectionName).limit(limit).offset(offset);
  if (filter) {
    for (const prop in filter) {
      query = query.where(prop, '==', filter[prop]);
    }
  }
  const querySnapshot = await query.get();
  const lists = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return {
    lists,
    limit,
    offset,
  };
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
  return item.data();
};

const getPlacesByListId = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const list = await document.get();
  const listData = list.data();
  let places = [];
  if (listData.placeListItems) {
    const placeIds = listData.placeListItems.map((placeIdObj) => {
      return placeIdObj.placeId;
    });
    places = await placeModel.getPlacesByIds(placeIds);
  }
  return places;
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

const addPlacesToList = async (entityId, input) => {
  const document = db.collection(collectionName).doc(entityId);
  const existListSnap = await document.get();
  const existList = existListSnap.data();
  existList.placeListItems.forEach((placeIdObj) => {
    if (input.includes(placeIdObj.placeId)) {
      input.splice(input.indexOf(placeIdObj.placeId), 1);
    }
  });
  const newPlaces = input.map((placeId) => {
    return {
      date: new Date(),
      placeId,
    };
  });
  const isUpdated = await document.set({ placeListItems: existList.placeListItems.concat(newPlaces) }, { merge: true });
  if (!isUpdated) {
    return false;
  }
  const updatedDoc = await db.collection(collectionName).doc(entityId).get();
  return updatedDoc.data();
};

const removePlaceFromList = async (entityId, placeId) => {
  const document = db.collection(collectionName).doc(entityId);
  const existListSnap = await document.get();
  const existList = existListSnap.data();
  const newPlaceList = existList.placeListItems.filter((placeIdObj) => {
    if (placeIdObj.placeId !== placeId) return placeIdObj;
  });
  const isUpdated = await document.set({ placeListItems: newPlaceList }, { merge: true });
  if (!isUpdated) {
    return false;
  }
  const updatedDoc = await db.collection(collectionName).doc(entityId).get();
  return updatedDoc.data();
};

const deleteById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  await document.delete();
};

module.exports = {
  getCollectionOfLists,
  create,
  getById,
  getPlacesByListId,
  updateById,
  addPlacesToList,
  removePlaceFromList,
  deleteById,
};
