const firebase = require('../utils/firebase');
const uuid = require('uuid/v4');
const firebaseAdmin = require('firebase-admin');
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
    const placeQuery = db.collection(parentCollectionName).doc(placeId);
    const placeSnap = await placeQuery.get();
    const place = { id: placeSnap.id, ...placeSnap.data() };
    const reviewsSnap = await placeQuery.collection(collectionName).get();
    const reviewsByPlace = reviewsSnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    place.reviews = reviewsByPlace;
    return place;
  });
  const result = await Promise.all(promises);
  return [].concat.apply([], result);
};

const create = async (newData, placeId) => {
  const newEntityId = uuid();
  newData.id = newEntityId;
  newData = processDataForReview(newData);
  const isCreated = await db
    .collection(parentCollectionName)
    .doc(placeId)
    .collection(collectionName)
    .doc('/' + newEntityId + '/')
    .create(newData);
  if (!isCreated) {
    return false;
  }
  return getPlaceById(placeId);
};

const getById = async (entityId, placeId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  const item = await document.get();
  return item.data();
};

const updateById = async (entityId, newData, placeId) => {
  newData = processDataForReview(newData);
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  await document.update(newData);
  return getPlaceById(placeId);
};

const addPhoto = async (entityId, placeId, photoObj) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  const revieweSnap = await document.get();
  const review = revieweSnap.data();
  photoObj.date = photoObj.date
    ? new firebaseAdmin.firestore.Timestamp(photoObj.date._seconds, photoObj.date._nanoseconds)
    : null;
  review.photos.push(photoObj);
  await document.set({ photos: review.photos }, { merge: true });
  return getPlaceById(placeId);
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
  await document.set({ photos: review.photos }, { merge: true });
  return getPlaceById(placeId);
};

const deleteById = async (entityId, placeId) => {
  const document = db.collection(parentCollectionName).doc(placeId).collection(collectionName).doc(entityId);
  await document.delete();
  return getPlaceById(placeId);
};

const getPlaceById = async (placeId) => {
  const place = await db.collection(parentCollectionName).doc(placeId).get();
  if (place.reviewsNumber) {
    const reviewsSnap = await db.collection(collectionName).doc(placeId).collection('reviews').get();
    place.reviews = reviewsSnap.docs.map((review) => {
      return review.data();
    });
  }
  return place.data();
};

const processDataForReview = (data) => {
  data.date = new firebaseAdmin.firestore.Timestamp(data.date._seconds, data.date._nanoseconds);
  if (data.photos && data.photos.length > 0) {
    data.photos = data.photos.map((photo) => {
      photo.date = photo.date
        ? new firebaseAdmin.firestore.Timestamp(photo.date._seconds, photo.date._nanoseconds)
        : null;
      return photo;
    });
  }
  return data;
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
