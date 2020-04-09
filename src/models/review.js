const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');

const db = firebase.getDb();
const parentCollectionName = 'places';
const collectionName = 'reviews';

const getListOfReviews = async (params) => {
  const { placeId, limit, offset, filter } = params;
  let query = db
    .collection(parentCollectionName)
    .doc(placeId)
    //get sub-collection
    .collection(collectionName)
    .limit(limit)
    .offset(offset);

  if (filter) {
    for (const prop in filter) {
      query = query.where(prop, '==', filter[prop]);
    }
  }

  const querySnapshot = await query.get();
  const reviews = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return {
    reviews,
    limit,
    offset,
  };
};

const getReviewsByPlaceIds = async (ids) => {
  const promises = ids.map(async (placeId) => {
    const reviewsSnap = await db.collection(parentCollectionName).doc(placeId).collection(collectionName).get();
    const reviewsByPlace = reviewsSnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return reviewsByPlace;
  });
  const result = await Promise.all(promises);
  return [].concat.apply([], result);
};

const create = async (newData, placeId) => {
  return await db
    .collection(parentCollectionName)
    .doc(placeId)
    .collection(collectionName)
    .doc('/' + uuid() + '/')
    .create(newData);
};
const getById = async (entityId, placeId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  const item = await document.get();
  return item.data();
};

const updateById = async (entityId, newData, placeId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  return await document.update(newData);
};

const addPhoto = async (entityId, placeId, photoObj) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  const revieweSnap = await document.get();
  const review = revieweSnap.data();
  review.photos.push(photoObj);
  return await document.set({ photos: review.photos }, { merge: true });
};

const removePhoto = async (entityId, placeId, photoId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  const revieweSnap = await document.get();
  const review = revieweSnap.data();
  review.photos = review.photos.filter((photoObj) => {
    if (photoObj.id !== photoId) {
      return photoObj;
    }
  });
  return await document.set({ photos: review.photos }, { merge: true });
};

const deleteById = async (entityId, placeId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  await document.delete();
};

module.exports = {
  getReviewsByPlaceIds,
  getListOfReviews,
  create,
  getById,
  updateById,
  addPhoto,
  removePhoto,
  deleteById,
};
