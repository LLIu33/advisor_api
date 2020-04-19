'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PhotoReferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      placeId: {
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PhotoReferences');
  },
};
