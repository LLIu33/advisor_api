'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Place', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });

    return queryInterface.changeColumn('Place', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Place', 'createdAt', {
      type: Sequelize.DATE,
    });

    return queryInterface.changeColumn('Place', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },
};
