'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.NUMBER
      },
      isNewlyOpen: {
        type: Sequelize.BOOLEAN
      },
      googlePlaceId: {
        type: Sequelize.STRING
      },
      reviewsNumber: {
        type: Sequelize.NUMBER
      },
      hidden: {
        type: Sequelize.BOOLEAN
      },
      hasDelivery: {
        type: Sequelize.BOOLEAN
      },
      venueId: {
        type: Sequelize.STRING
      },
      hasOutdoorSeating: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Places');
  }
};