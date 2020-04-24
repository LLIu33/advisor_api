const tableName = 'Place';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          tableName,
          'googleReviewsNumber',
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          tableName,
          'googleRating',
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(tableName, 'googleReviewsNumber', { transaction: t }),
        queryInterface.removeColumn(tableName, 'googleRating', { transaction: t }),
      ]);
    });
  },
};
