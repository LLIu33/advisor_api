'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      atmosphereRating: {
        type: Sequelize.NUMBER
      },
      serviceRating: {
        type: Sequelize.NUMBER
      },
      qualityRating: {
        type: Sequelize.NUMBER
      },
      atmosphereText: {
        type: Sequelize.STRING
      },
      serviceText: {
        type: Sequelize.STRING
      },
      qualityText: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Reviews');
  }
};