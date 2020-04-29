const firebaseAdmin = require('firebase-admin');

const jsonToProfile = (data) => {
  return {
    avatarUrl: data.avatarUrl,
    lastname: data.lastName,
    firstname: data.firstName,
    level: data.level,
    uid: data.uid,
    role: data.role,
    points: data.points,
    gender: data.gender,
    latestCongratsLevel: data.latestCongratsLevel,
    registeredAt: new firebaseAdmin.firestore.Timestamp(data.date._seconds, data.date._nanoseconds).toDate(),
    birthday: new firebaseAdmin.firestore.Timestamp(data.birthday._seconds, data.birthday._nanoseconds).toDate(),
  };
};

const profileToJson = (entity) => {
  entity.places = entity.places ? entity.places : [];
  return {
    uid: entity.uid,
    firstName: entity.firstname,
    lastName: entity.lastname,
    date: entity.registeredAt ? firebaseAdmin.firestore.Timestamp.fromDate(entity.registeredAt) : null,
    birthday: entity.birthday ? firebaseAdmin.firestore.Timestamp.fromDate(entity.birthday) : null,
    gender: entity.gender,
    latestCongratsLevel: entity.latestCongratsLevel,
    level: entity.level,
    role: entity.role,
    points: entity.points,
    avatarUrl: entity.avatarUrl,
    placeIds: entity.places.map((item) => item.uid),
  };
};

module.exports = {
  jsonToProfile,
  profileToJson,
};
