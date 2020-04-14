const helper = require('../utils/helper');

const data = require('../../data/profiles.json')['collection:profiles'];
const dataToInsert = [];
const addedEntity = [];
for (const key in data) {
  const entity = data[key];
  if (addedEntity.includes(entity.uid)) {
    continue;
  }
  addedEntity.push(entity.uid);
  dataToInsert.push({
    uid: entity.uid,
    firstName: entity.firstName,
    lastName: entity.lastName,
    avatarUrl: entity.avatarUrl,
    latestCongratsLevel: entity.latestCongratsLevel ? entity.latestCongratsLevel.data : 0,
    level: entity.level ? entity.level.data : 0,
    points: entity.points ? entity.points.data : 0,
    role: entity.role ? entity.role.data : 0,
    birthday: helper.fbTimestampToDatetime(entity.birthday),
    registeredAt: helper.fbTimestampToDatetime(entity.date),
    gender: entity.gender,
  });
}
module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Profiles', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Profiles', null, {});
  },
};
