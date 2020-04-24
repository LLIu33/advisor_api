const helper = require('../../utils/helper');
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
      const location = place.location || [];
      if (!placeId) {
        continue;
      }
      location.coordinates = helper.getDataFromJson(location.coordinates);
      //console.log(location.coordinates);
      const item = {
        placeId: placeId,
        area: location.area || '',
        address: location.address || '',
        longitude: location.coordinates.data._longitude,
        latitude: location.coordinates.data._latitude,
      };
      //console.log(item);
      dataToInsert.push(item);
    }

    // dataToInsert = [...new Set(dataToInsert)];
    // console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('Locations', dataToInsert, {});
    }
    return null;
  },
  //   location
  // address "The Port"
  // area "Fnaitees"
  // coordinates [29.2193904° N, 48.1020703° E]

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {});
  },
};
