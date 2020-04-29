const helper = require('../../utils/helper');

module.exports = {
  up: async (queryInterface) => {
    const data = require('../../../data/profiles.json')['collection:profiles'];
    const placesQuery = `SELECT id, uid from Place`;
    const places = await queryInterface.sequelize.query(placesQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const placesHash = {};
    places.forEach((item) => {
      placesHash[item.uid] = item.id;
    });
    // console.log(placesHash);
    const profileQuery = `SELECT id, uid from Profile`;
    const profiles = await queryInterface.sequelize.query(profileQuery, {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const profilesHash = {};
    profiles.forEach((item) => {
      profilesHash[item.uid] = item.id;
    });
    // console.log(deliveriesHash);
    let dataToInsert = [];
    for (const key in data) {
      const profile = data[key];
      const profileId = profilesHash[profile.uid];

      const entitiesList = profile.placeIds || [];
      entitiesList.forEach((entity) => {
        const placeId = placesHash[entity];
        const item = {
          placeId: placeId,
          profileId: profileId,
        };
        if (placeId && profileId) {
          dataToInsert.push(item);
        }
        // console.log(entity);
      });
    }
    dataToInsert = [...new Set(dataToInsert)];
    //console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('ProfilePlace', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('ProfilePlace', null, {});
  },
};
