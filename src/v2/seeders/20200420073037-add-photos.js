const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const placesQuery = `SELECT id, uid from Place`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    const reviewsQuery = `SELECT id, uid from Review`;
    const reviews = await queryInterface.sequelize.query(reviewsQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const reviewsHash = {};
    reviews.forEach((item) => {
      reviewsHash[item.uid] = item.id;
    });
    const dataToInsert = [];
    const existPlaces = [];
    for (const key in data) {
      const place = data[key];
      const uid = place.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());
      const placeId = placesHash[place.id];
      const entitiesList = place.photos || [];
      if (!placeId) {
        continue;
      }
      entitiesList.forEach((entity) => {
        // console.log(entity);
        const item = {
          placeId: placeId,
          caption: entity.caption || '',
          category: entity.category || '',
          publishedAt: helper.fbTimestampToDatetime(entity.date),
          imageUrl: entity.imageUrl,
          googlePhotoRef: entity.googlePhotoRef,
          position: +helper.emptyOrNullToString(entity.position) || 0,
          storageRef: entity.storageRef || '',
          uid: entity.uid || '',
          reviewId: reviewsHash[entity.reviewId] || null,
        };
        //console.log(item);
        dataToInsert.push(item);
      });
    }
    // dataToInsert = [...new Set(dataToInsert)];
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Photos', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Photos', null, {});
  },
};
