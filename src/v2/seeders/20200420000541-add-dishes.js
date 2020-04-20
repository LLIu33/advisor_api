module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const existDishes = [];
    for (const key in data) {
      const place = data[key];
      const entitiesList = place.popularDishes || [];

      entitiesList.forEach((entity) => {
        // console.log(entity);
        if (existDishes.indexOf(entity) === -1) {
          existDishes.push(entity);
          dataToInsert.push({
            name: entity,
          });
        }
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('Dishes', dataToInsert, {});
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
    return queryInterface.bulkDelete('Dishes', null, {});
  },
};
