const uuid = require('uuid/v4');

const firebase = require('../utils/firebase');

const db = firebase.getDb();

const create = async (collectionName, newData) => {
  return await db
    .collection(collectionName)
    .doc('/' + uuid() + '/')
    .create(newData);
};
const getById = async (collectionName, entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  const item = await document.get();
  return item.data();
};
const getList = async (collectionName, limit, offset) => {
  const query = db.collection(collectionName);
  const querySnapshot = await query.orderBy('id').limit(limit).offset(offset).get();
  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return {
    data,
    limit,
    offset,
  };
};
const updateById = async (collectionName, entityId, newData) => {
  const document = db.collection(collectionName).doc(entityId);
  return await document.update(newData);
};
const deleteById = async (collectionName, entityId) => {
  const document = db.collection(collectionName).doc(entityId);
  await document.delete();
};

module.exports = {
  create,
  getList,
  getById,
  updateById,
  deleteById,
};
