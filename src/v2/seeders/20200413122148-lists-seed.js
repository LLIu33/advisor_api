const helper = require('../../utils/helper');
const listsData = require('../../../data/lists.json');

module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    const query = `SELECT uid from Profile`;
    const profiles = await queryInterface.sequelize.query(query, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    // console.log(profiles);
    // placeListItems;
    const DataToSeed = [];
    const addedEntity = [];
    for (const listKey in listsData) {
      const list = listsData[listKey];
      if (addedEntity.includes(list.id)) {
        continue;
      }
      addedEntity.push(list.id);
      const item = {
        uid: list.id,
        name: list.name,
        coverUrl: helper.emptyOrNullToString(list.coverUrl),
        createdAt: helper.fbTimestampToDatetime(list.date),
        isTrending: list.isTrending ? list.isTrending.data : false,
        isPublic: list.isPublic ? list.isPublic.data : false,
        creatorUid: list.creatorId && profiles.includes(list.creatorId) ? list.creatorId : null,
      };
      // console.log(item);
      DataToSeed.push(item);
    }
    console.log(DataToSeed.length);
    return queryInterface.bulkInsert('List', DataToSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('List', null, {});
  },
};
