'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.STRING,
      },
      userUid: {
        type: Sequelize.STRING,
      },
      placeId: {
        type: Sequelize.INTEGER,
      },
      atmosphereRating: {
        type: Sequelize.INTEGER,
      },
      serviceRating: {
        type: Sequelize.INTEGER,
      },
      qualityRating: {
        type: Sequelize.INTEGER,
      },
      atmosphereText: {
        type: Sequelize.STRING,
      },
      serviceText: {
        type: Sequelize.STRING,
      },
      qualityText: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      publishedAt: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Review');
  },
};
