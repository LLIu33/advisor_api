const helper = require('../../utils/helper');
module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const placesQuery = `SELECT id, uid from Places`;
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
      const entity = place.rating || [];
      console.log(entity);
      const item = {
        placeId: placeId,
        atmosphere: helper.emptyOrNullToNumber(entity.atmosphere).data,
        quality: helper.emptyOrNullToNumber(entity.quality).data,
        service: helper.emptyOrNullToNumber(entity.service).data,
      };
      console.log(item);
      dataToInsert.push(item);
    }

    // dataToInsert = [...new Set(dataToInsert)];
    // console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('Ratings', dataToInsert, {});
    }
    return null;
  },

  // rating
  // atmosphere 5
  // quality 5
  // service 5

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Ratings', null, {});
  },
};
