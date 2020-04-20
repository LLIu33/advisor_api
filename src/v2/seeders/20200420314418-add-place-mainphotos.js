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
    // console.log(placesHash);
    const photoQuery = `SELECT id, storageRef from Photos`;
    const photos = await queryInterface.sequelize.query(photoQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const photosHash = {};
    photos.forEach((item) => {
      photosHash[item.storageRef] = item.id;
    });
    const dataToInsert = [];

    for (const key in data) {
      const place = data[key];
      const placeId = placesHash[place.id];
      const entitiesList = place.mainPhotos || [];

      entitiesList.forEach((entity) => {
        const item = {
          placeId: placeId,
          photoId: photosHash[entity.storageRef],
        };
        // console.log(entity);
        dataToInsert.push(item);
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('PlaceMainPhotos', dataToInsert, {});
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
    return queryInterface.bulkDelete('PlaceMainPhotos', null, {});
  },
};
