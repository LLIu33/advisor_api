const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    for (const key in data) {
      const entity = data[key];
      // console.log(entity);
      entity.cost = helper.emptyOrNullToString(entity.cost);
      entity.hidden = helper.emptyOrNullToString(entity.hidden);
      entity.hasOutdoorSeating = helper.emptyOrNullToString(entity.hasOutdoorSeating);
      const item = {
        uid: entity.id,
        name: entity.name,
        cost: entity.cost ? entity.cost.data : 0,
        isNewlyOpened: entity.isNewlyOpened ? entity.isNewlyOpened.data : 0,
        googlePlaceId: entity.googlePlaceId,
        reviewsNumber: entity.level ? entity.level.data : 0,
        hidden: entity.hidden ? entity.hidden.data : 0,
        hasDelivery: entity.hasDelivery ? entity.hasDelivery.data : 0,
        venueUid: entity.venueId ? entity.venueId : '',
        hasOutdoorSeating: entity.hasOutdoorSeating ? entity.hasOutdoorSeating.data : 0,
      };
      console.log(entity.venueId);
      console.log(item);
      dataToInsert.push(item);
    }

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
