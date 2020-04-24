const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/places.json')['collection:places'];
    const dataToInsert = [];
    const existPlaces = [];
    for (const key in data) {
      const entity = data[key];
      const uid = entity.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());

      // console.log({
      //   id: entity.id,
      //   name: entity.name,
      //   cost: entity.cost,
      //   googleReviews_number: entity.googleReviews_number,
      //   google_rating: entity.google_rating,
      //   isNewlyOpened: entity.isNewlyOpened,
      //   googlePlaceId: entity.googlePlaceId,
      //   level: entity.level,
      //   hidden: entity.hidden,
      //   hasDelivery: entity.hasDelivery,
      //   venueId: entity.venueId,
      //   hasOutdoorSeating: entity.hasOutdoorSeating,
      // });
      entity.cost = helper.emptyOrNullToString(entity.cost);
      entity.hidden = helper.emptyOrNullToString(entity.hidden);
      entity.hasOutdoorSeating = helper.emptyOrNullToString(entity.hasOutdoorSeating);
      entity.google_rating =
        typeof entity.google_rating === 'string' ? helper.getDataFromJson(entity.google_rating) : entity.google_rating;
      entity.isNewlyOpened =
        typeof entity.isNewlyOpened === 'string' ? helper.getDataFromJson(entity.isNewlyOpened) : entity.isNewlyOpened;
      entity.reviewsNumber =
        typeof entity.reviewsNumber === 'string' ? helper.getDataFromJson(entity.reviewsNumber) : entity.reviewsNumber;
      entity.googleReviews_number =
        typeof entity.googleReviews_number === 'string'
          ? helper.getDataFromJson(entity.googleReviews_number)
          : entity.googleReviews_number;
      const item = {
        uid: entity.id,
        name: entity.name,
        cost: entity.cost ? entity.cost.data : 0,
        googleReviewsNumber: entity.googleReviews_number ? entity.googleReviews_number.data : 0,
        googleRating: entity.google_rating ? entity.google_rating.data : 0.0,
        isNewlyOpened: entity.isNewlyOpened ? entity.isNewlyOpened.data : 0,
        googlePlaceId: entity.googlePlaceId,
        reviewsNumber: entity.level ? entity.level.data : 0,
        hidden: entity.hidden ? entity.hidden.data : 0,
        hasDelivery: entity.hasDelivery ? entity.hasDelivery.data : 0,
        venueId: entity.venueId ? entity.venueId : '',
        hasOutdoorSeating: entity.hasOutdoorSeating ? entity.hasOutdoorSeating.data : 0,
      };
      dataToInsert.push(item);
    }
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface
      .bulkInsert('Place', dataToInsert, {})
      .then((dbRes) => {
        console.log(dbRes.length);
      })
      .catch((err) => {
        console.log('error', err);
      });
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Place', null, {});
  },
};
