const firebaseAdmin = require('firebase-admin');

const jsonToList = (data) => {
  return {
    name: data.name,
    coverUrl: data.coverUrl,
    isTrending: data.isTrending,
    isPublic: data.isPublic,
    uid: data.id,
    creatorUid: data.creatorId,
    createdAt: new firebaseAdmin.firestore.Timestamp(data.date._seconds, data.date._nanoseconds).toDate(),
  };
};

const listToJson = (entity) => {
  entity.places = entity.places ? entity.places : [];
  return {
    id: entity.uid,
    name: entity.name,
    coverUrl: entity.coverUrl,
    creatorId: entity.creatorUid,
    date: entity.createdAt ? firebaseAdmin.firestore.Timestamp.fromDate(entity.createdAt) : null,
    isPublic: entity.isPublic,
    isTrending: entity.isTrending,
    placeListItems: entity.places.map((item) => {
      return {
        placeId: item.uid,
        date: item.ListPlace.createdAt ? firebaseAdmin.firestore.Timestamp.fromDate(item.ListPlace.createdAt) : null,
      };
    }),
  };
};

module.exports = {
  jsonToList,
  listToJson,
};
