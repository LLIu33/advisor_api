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
    for (const key in data) {
      const place = data[key];
      const placeId = placesHash[place.id];
      const entity = place.contacts || [];
      // console.log(entity);
      const item = {
        placeId: placeId,
        carrigeMenu: helper.isJsonString(entity.carrigeMenu) ? null : entity.carrigeMenu,
        deliverooMenu: helper.isJsonString(entity.deliverooMenu) ? null : entity.deliverooMenu,
        instagram: helper.isJsonString(entity.instagram) ? null : entity.instagram,
        menusite: helper.isJsonString(entity.menusite) ? null : entity.menusite,
        phone: helper.isJsonString(entity.phone) ? null : entity.phone,
        talabatMenu: helper.isJsonString(entity.talabatMenu) ? null : entity.talabatMenu,
        website: helper.isJsonString(entity.website) ? null : entity.website,
      };
      // console.log(item);
      dataToInsert.push(item);
    }

    // dataToInsert = [...new Set(dataToInsert)];
    // console.log(dataToInsert);
    console.log('dataToInsert.length: ', dataToInsert.length);
    if (dataToInsert.length > 0) {
      return queryInterface.bulkInsert('Contacts', dataToInsert, {});
    }
    return null;
  },

  // contacts
  // carrigeMenu "https://www.trycarriage.com/restaurants/easy-burger"
  // deliverooMenu null
  // instagram "easyburger_kw"
  // menusite ""
  // phone "+965 2220 4285"
  // talabatMenu "www.talabat.com/kuwait/easy-burger/"
  // website "http://www.easyburger.net/"

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Contacts', null, {});
  },
};
