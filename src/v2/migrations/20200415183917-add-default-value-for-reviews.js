'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Reviews', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    });

    return queryInterface.changeColumn('Reviews', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Reviews', 'createdAt', {
      type: Sequelize.DATE,
    });

    return queryInterface.changeColumn('Reviews', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },
};
