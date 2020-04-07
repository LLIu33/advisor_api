const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');

const db = firebase.getDb();
const collectionName = 'places';

const getListOfPlaces = async (limit, offset, isUnlim) => {
  let query = db.collection(collectionName);
  if (!isUnlim) {
    query = query.orderBy('id').limit(limit).offset(offset);
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
  getListOfPlaces,
  create,
  getById,
  updateById,
  deleteById,
};
