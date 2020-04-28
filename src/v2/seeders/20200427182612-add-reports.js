const firebase = require('../../utils/firebase');
const db = firebase.getDb();
const collectionName = 'reports';
const { jsonToReviewReport } = require('../mappers/report');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = db.collection(collectionName);
    const reportsSnap = await query.get();
    const reports = reportsSnap.docs;
    const DataToSeed = reports.map((item) => jsonToReviewReport(item.data()));

    console.log(DataToSeed.length);
    return queryInterface.bulkInsert('ReviewReport', DataToSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReviewReport', null, {});
  },
};
