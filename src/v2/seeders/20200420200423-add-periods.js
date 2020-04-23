const helper = require('../../utils/helper');
module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const placesQuery = `SELECT id, uid from Place`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    for (const key in data) {
      const place = data[key];
      const placeId = placesHash[place.id];
      const entitiesList = place.openingHours.periods || [];

      entitiesList.forEach((entity) => {
        // console.log(entity);
        entity.open = typeof entity.open === 'string' ? helper.getDataFromJson(entity.open) : entity.open;
        entity.close = typeof entity.close === 'string' ? helper.getDataFromJson(entity.close) : entity.close;
        dataToInsert.push({
          placeId: placeId,
          openDay: entity.open.day ? helper.emptyOrNullToNumber(entity.open.day).data : null,
          openTime: entity.open.time || '',
          closeDay: entity.close.day ? helper.emptyOrNullToNumber(entity.close.day).data : null,
          closeTime: entity.close.time || '',
          closed: entity.closed || false,
        });
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    //console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('Periods', dataToInsert, {});
    }
    return null;
  },
  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Periods', null, {});
  },
};
