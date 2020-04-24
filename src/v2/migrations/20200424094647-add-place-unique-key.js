'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Place', 'uid', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Place', 'uid', {
      type: Sequelize.STRING,
    });
  },
};
