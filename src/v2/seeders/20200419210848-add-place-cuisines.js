const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const placesQuery = `SELECT id, uid from Places`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    console.log(placesHash);
    const cuisinesQuery = `SELECT id, name from Cuisines`;
    const cuisines = await queryInterface.sequelize.query(cuisinesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const cuisinesHash = {};
    cuisines.forEach((item) => {
      cuisinesHash[item.name] = item.id;
    });
    console.log(cuisinesHash);
    let dataToInsert = [];
    for (const key in data) {
      const place = data[key];
      const placeId = placesHash[place.id];
      const entitiesList = place.cuisines || [];

      entitiesList.forEach((entity) => {
        const item = {
          placeId: placeId,
          cuisineId: cuisinesHash[entity],
        };
        // console.log(entity);
        dataToInsert.push(item);
      });
    }

    dataToInsert = [...new Set(dataToInsert)];
    console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('PlaceCuisines', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('PlaceCuisines', null, {});
  },
};
