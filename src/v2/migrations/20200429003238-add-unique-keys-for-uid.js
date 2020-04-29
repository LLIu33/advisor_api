'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('List', 'uid', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn('Profile', 'uid', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    });
    return queryInterface.addIndex('Review', ['uid', 'placeId'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('List', 'uid', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('Profile', 'uid', {
      type: Sequelize.STRING,
    });
    return queryInterface.removeIndex('Review', ['uid', 'placeId'], { unique: true });
  },
};
