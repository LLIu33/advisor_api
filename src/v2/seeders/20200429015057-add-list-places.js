const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/lists.json');
    const placesQuery = `SELECT id, uid from Place`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    // console.log(placesHash);
    const listQuery = `SELECT id, uid from List`;
    const lists = await queryInterface.sequelize.query(listQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const listsHash = {};
    lists.forEach((item) => {
      listsHash[item.uid] = item.id;
    });
    // console.log(listsHash);
    let dataToInsert = [];
    const addedEntity = [];
    for (const key in data) {
      const list = data[key];
      const listId = listsHash[list.id];
      const entitiesList = list.placeListItems || [];
      entitiesList.forEach((entity) => {
        const placeId = placesHash[entity.placeId];
        const item = {
          placeId: placeId,
          listId: listId,
          createdAt: helper.fbTimestampToDatetime(entity.date),
        };
        if (placeId && listId && !addedEntity.includes(placeId + '_' + listId)) {
          addedEntity.push(placeId + '_' + listId);
          dataToInsert.push(item);
        }
        // console.log(entity);
      });
    }
    dataToInsert = [...new Set(dataToInsert)];
    //console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('ListPlace', dataToInsert, {}).catch(function (err) {
      console.log(err);
    });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('ListPlace', null, {});
  },
};
