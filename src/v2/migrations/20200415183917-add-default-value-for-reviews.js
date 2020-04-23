'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Review', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });

    return queryInterface.changeColumn('Review', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Review', 'createdAt', {
      type: Sequelize.DATE,
    });

    return queryInterface.changeColumn('Review', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },
};
