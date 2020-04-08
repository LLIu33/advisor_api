const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');

const db = firebase.getDb();
const collectionName = 'lists';

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
  return await db
    .collection(collectionName)
    .doc('/' + uuid() + '/')
    .create(newData);
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
  getCollectionOfLists,
  create,
  getById,
  updateById,
  deleteById,
};
