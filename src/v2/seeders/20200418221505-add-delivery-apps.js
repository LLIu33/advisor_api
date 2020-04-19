const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const existDelivery = [];
    for (const key in data) {
      const place = data[key];
      const entitiesList = place.deliveryApps || [];

      entitiesList.forEach((entity) => {
        // console.log(entity);
        if (existDelivery.indexOf(entity) === -1) {
          existDelivery.push(entity);
          dataToInsert.push({
            name: entity,
          });
        }
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('DeliveryApps', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('DeliveryApps', null, {});
  },
};
