'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Places', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });

    return queryInterface.changeColumn('Places', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Places', 'createdAt', {
      type: Sequelize.DATE,
    });

    return queryInterface.changeColumn('Places', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },
};
