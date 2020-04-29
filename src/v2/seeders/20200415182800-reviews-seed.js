const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const existPlaces = [];
    const addedReviews = [];
    for (const key in data) {
      const entity = data[key];
      const uid = entity.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());
      if (entity['collection:reviews']) {
        const reviews = entity['collection:reviews'];
        for (const reviewKey in reviews) {
          let place = [];
          const placeQuery = `SELECT id from Place WHERE uid = "${entity.id}";`;
          place = await queryInterface.sequelize.query(placeQuery, {
            type: queryInterface.sequelize.QueryTypes.SELECT,
          });
          const review = reviews[reviewKey];
          // console.log(review);
          const profileQuery = `SELECT id from Profile WHERE uid = "${review.userID}";`;
          const profile = await queryInterface.sequelize.query(profileQuery, {
            type: queryInterface.sequelize.QueryTypes.SELECT,
          });
          if (profile.length === 0) {
            continue;
          }

          const atmosphereRating = helper.emptyOrNullToString(review.rating.atmosphere);
          const serviceRating = helper.emptyOrNullToString(review.rating.service);
          const qualityRating = helper.emptyOrNullToString(review.rating.quality);
          const item = {
            uid: review.id,
            userUid: review.userID,
            placeId: place.length ? place[0].id : null,
            atmosphereRating: atmosphereRating.data,
            serviceRating: serviceRating.data,
            qualityRating: qualityRating.data,
            atmosphereText: review.ratingTexts.atmosphere,
            serviceText: review.ratingTexts.service,
            qualityText: review.ratingTexts.quality,
            text: review.text,
            publishedAt: helper.fbTimestampToDatetime(review.date),
          };
          if (addedReviews.includes(entity.id + '_' + item.uid)) {
            console.log(entity.id + '_' + item.uid);
            continue;
          }
          // console.log(addedReviews);
          addedReviews.push(entity.id + '_' + item.uid);
          dataToInsert.push(item);
        }
      }
    }
    //console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Review', dataToInsert).catch(function (err) {
      console.log(err);
    });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Review', null, {});
  },
};
