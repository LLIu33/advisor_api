const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const existCuisines = [];
    const existPlaces = [];
    for (const key in data) {
      const place = data[key];
      const uid = place.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());
      const entitiesList = place.cuisines || [];

      entitiesList.forEach((entity) => {
        // console.log(entity);
        if (existCuisines.indexOf(entity) === -1) {
          existCuisines.push(entity);
          dataToInsert.push({
            name: entity,
          });
        }
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Cuisines', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Cuisines', null, {});
  },
};
