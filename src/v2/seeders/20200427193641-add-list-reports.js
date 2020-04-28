const firebase = require('../../utils/firebase');
const db = firebase.getDb();
const collectionName = 'list-reports';
const { jsonToListReport } = require('../mappers/report');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const query = db.collection(collectionName);
    const reportsSnap = await query.get();
    const reports = reportsSnap.docs;
    const DataToSeed = reports.map((item) => jsonToListReport(item.data()));

    console.log(DataToSeed.length);
    return queryInterface.bulkInsert('ListReport', DataToSeed, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ListReport', null, {});
  },
};
