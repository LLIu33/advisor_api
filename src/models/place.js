const firebase = require('../utils/firebase');

const db = firebase.getDb();
const collectionName = 'places';

const getListOfPlaces = async (limit, offset) => {
  const query = db.collection(collectionName);
  const querySnapshot = await query.orderBy('id').limit(limit).offset(offset).get();
  const places = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return {
    places,
    limit,
    offset,
  };
};

module.exports = {
  getListOfPlaces,
};
