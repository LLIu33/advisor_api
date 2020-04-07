const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');
const axios = require('axios');

const db = firebase.getDb();
const collectionName = 'places';

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
  const { limit, offset, isUnlim, search } = params;
  let query = db.collection(collectionName);
  query = search ? query.where('id', '==', search) : query.orderBy('id');
  if (!isUnlim) {
    query = query.limit(limit).offset(offset);
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
const updateById = async (entityId, newData) => {
  const document = db.collection(collectionName).doc(entityId);
  return await document.update(newData);
};
const deleteById = async (entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  await document.delete();
};

module.exports = {
  getAll,
  getListOfPlaces,
  create,
  getById,
  updateById,
  deleteById,
};
