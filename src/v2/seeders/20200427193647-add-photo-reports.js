const firebase = require('../../utils/firebase');
const db = firebase.getDb();
const collectionName = 'photo-reports';
const { jsonToPhotoReport } = require('../mappers/report');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = db.collection(collectionName);
    const reportsSnap = await query.get();
    const reports = reportsSnap.docs;
    const DataToSeed = reports.map((item) => jsonToPhotoReport(item.data()));

    console.log(DataToSeed.length);
    return queryInterface.bulkInsert('PhotoReport', DataToSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PhotoReport', null, {});
  },
};
