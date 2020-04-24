const helper = require('../../utils/helper');
const moment = require('moment');
module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const placesQuery = `SELECT id, uid from Place`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    const existPlaces = [];
    for (const key in data) {
      const place = data[key];
      const uid = place.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());
      const placeId = placesHash[place.id];
      if (!placeId) {
        continue;
      }
      const entitiesList = place.googleReviews || [];
      entitiesList.forEach((entity) => {
        // console.log(entity);
        const item = {
          placeId: placeId,
          authorName: entity.author_name,
          profilePhotoUrl: entity.profile_photo_url,
          rating: helper.emptyOrNullToNumber(entity.rating).data,
          text: entity.text,
          publishedAt: moment.unix(helper.emptyOrNullToNumber(entity.time).data).format('YYYY-MM-DD hh:mm:ss'),
        };
        //console.log(item);
        dataToInsert.push(item);
      });
    }

    // dataToInsert = [...new Set(dataToInsert)];
    // console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('GoogleReviews', dataToInsert, {});
    }
    return null;
  },

  // author_name "hessa khalid"
  // profile_photo_url "https://lh5.ggpht.com/-8FD3EDSmrDk/AAAAAAAAAAI/AAAAAAAAAAA/jNXvkx3wb9c/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg"
  // rating 5
  // text "Very tasty food 💕💕"
  // time 1570708838

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('GoogleReviews', null, {});
  },
};
