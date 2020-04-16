const helper = require('../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../data/places.json')['collection:places'];
    const dataToInsert = [];
    data.forEach((entity) => {
      const item = {
        uid: entity.id,
        name: entity.name,
        cost: entity.cost ? entity.cost.data : 0,
        isNewlyOpen: entity.isNewlyOpen ? entity.isNewlyOpen.data : 0,
        googlePlaceId: helper.emptyOrNullToString(entity.googlePlaceId),
        reviewsNumber: entity.level ? entity.level.data : 0,
        hidden: entity.hidden ? entity.hidden.data : 0,
        hasDelivery: entity.hasDelivery ? entity.hasDelivery.data : 0,
        hasOutdoorSeating: entity.hasOutdoorSeating ? entity.hasOutdoorSeating.data : 0,
      };
      dataToInsert.push(item);
    });

    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Places', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Places', null, {});
  },
};
