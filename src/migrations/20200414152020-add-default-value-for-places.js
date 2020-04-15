'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Places', 'createdAt', {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.literal('NOW()'),
    });

    return queryInterface.changeColumn('Places', 'updatedAt', {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.literal('NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Places', 'createdAt', {
      type: Sequelize.INTEGER,
    });

    return queryInterface.changeColumn('Places', 'updatedAt', {
      type: Sequelize.INTEGER,
    });
  },
};
