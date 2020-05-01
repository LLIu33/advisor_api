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
    // console.log(placesHash);
    let dataToInsert = [];
    const existPlaces = [];
    for (const key in data) {
      const place = data[key];
      const uid = place.id;
      if (existPlaces.includes(uid.toLowerCase())) {
        continue;
      }
      existPlaces.push(uid.toLowerCase());
      const placeId = placesHash[place.id];
      const entitiesList = place.photo_references || [];
      if (!placeId) {
        continue;
      }
      entitiesList.forEach((entity) => {
        //console.log(entity);
        const item = {
          placeId: placeId,
          reference: entity,
        };
        // console.log(entity);
        dataToInsert.push(item);
      });
    }
    dataToInsert = [...new Set(dataToInsert)];
    // console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    return queryInterface.bulkInsert('PhotoReference', dataToInsert, {});
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('PhotoReference', null, {});
  },
};
