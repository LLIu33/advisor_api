const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    for (const key in data) {
      const place = data[key];
      const googlePhotos = place.googlePhotos || [];
      const mainPhotos = place.mainPhotos || [];
      const photos = place.photos || [];
      const positionedPhotos = place.positionedPhotos || [];
      const topPhotos = place.topPhotos || [];
      const entitiesList = [...new Set([...googlePhotos, ...mainPhotos, ...photos, ...positionedPhotos, ...topPhotos])];

      entitiesList.forEach((entity) => {
        // console.log(entity);
        const item = {
          caption: entity.caption || '',
          category: entity.category || '',
          publishedAt: helper.fbTimestampToDatetime(entity.date),
          imageUrl: entity.imageUrl,
          googlePhotoRef: entity.googlePhotoRef,
          position: +helper.emptyOrNullToString(entity.position) || 0,
          storageRef: entity.storageRef || '',
          uid: entity.uid || '',
          reviewUid: entity.reviewId || '',
        };
        console.log(item);
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
