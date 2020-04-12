'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lists', {
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
      coverUrl: {
        type: Sequelize.STRING,
      },
      isTrending: {
        type: Sequelize.BOOLEAN,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
      },
      creatorId: {
        type: Sequelize.STRING,
      },
      creatorUid: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Lists');
  },
};
