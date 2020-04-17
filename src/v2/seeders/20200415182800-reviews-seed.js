const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    for (const key in data) {
      const entity = data[key];
      if (entity['collection:reviews']) {
        const reviews = entity['collection:reviews'];
        for (const reviewKey in reviews) {
          let profile = [];
          let place = [];
          const placeQuery = `SELECT id from Places WHERE uid = "${entity.id}";`;
          place = await queryInterface.sequelize.query(placeQuery, {
            type: queryInterface.sequelize.QueryTypes.SELECT,
          });
          const review = reviews[reviewKey];
          // console.log(review);
          if (review.userID) {
            const profileQuery = `SELECT id from Profiles WHERE uid = "${review.userID}";`;
            profile = await queryInterface.sequelize.query(profileQuery, {
              type: queryInterface.sequelize.QueryTypes.SELECT,
            });
          }
          const atmosphereRating = helper.emptyOrNullToString(review.rating.atmosphere);
          const serviceRating = helper.emptyOrNullToString(review.rating.service);
          const qualityRating = helper.emptyOrNullToString(review.rating.quality);
          const item = {
            uid: review.id,
            userId: profile.length ? profile[0].id : null,
            userUid: review.userID,
            placeId: place.length ? place[0].id : null,
            placeUid: entity.id,
            atmosphereRating: atmosphereRating.data,
            serviceRating: serviceRating.data,
            qualityRating: qualityRating.data,
            atmosphereText: review.ratingTexts.atmosphere,
            serviceText: review.ratingTexts.service,
            qualityText: review.ratingTexts.quality,
            text: review.text,
            publishedAt: helper.fbTimestampToDatetime(review.date),
          };
          // console.log(item);
          dataToInsert.push(item);
        }
      }
    }
    console.log(dataToInsert);
    // fs.writeFileSync('./reviews.json', JSON.stringify(dataToInsert), 'utf8');
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('Reviews', dataToInsert, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8mb4_general_ci',
    });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
