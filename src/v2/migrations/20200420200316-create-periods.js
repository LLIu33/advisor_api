'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Periods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      placeId: {
        type: Sequelize.INTEGER,
      },
      openDay: {
        type: Sequelize.INTEGER,
      },
      openTime: {
        type: Sequelize.STRING,
      },
      closeDay: {
        type: Sequelize.INTEGER,
      },
      closeTime: {
        type: Sequelize.STRING,
      },
      closed: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Periods');
  },
};
