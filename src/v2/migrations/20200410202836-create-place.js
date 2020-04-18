'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      isNewlyOpened: {
        type: Sequelize.BOOLEAN,
      },
      googlePlaceId: {
        type: Sequelize.STRING,
      },
      reviewsNumber: {
        type: Sequelize.INTEGER,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
      },
      hasDelivery: {
        type: Sequelize.BOOLEAN,
      },
      venueId: {
        type: Sequelize.INTEGER,
      },
      venueUid: {
        type: Sequelize.STRING,
      },
      hasOutdoorSeating: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Places');
  },
};
