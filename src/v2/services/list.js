const uuid = require('uuid/v4');
const db = require('../models');
const List = db.List;
// const Op = db.Sequelize.Op;


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
  return await document.set({ placeListItems: existList.placeListItems.concat(newPlaces) }, { merge: true });
};

const removePlaceFromList = async (entityId, placeId) => {
  const document = db.collection(collectionName).doc(entityId);
  const existListSnap = await document.get();
  const existList = existListSnap.data();
  const newPlaceList = existList.placeListItems.filter((placeIdObj) => {
    if (placeIdObj.placeId !== placeId) return placeIdObj;
  });
  return await document.set({ placeListItems: newPlaceList }, { merge: true });
};


module.exports = {
  getPlacesByListId,
  addPlacesToList,
  removePlaceFromList,
};
