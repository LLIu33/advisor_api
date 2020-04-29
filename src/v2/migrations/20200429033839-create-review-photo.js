'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ReviewPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storageRef: {
        type: Sequelize.TEXT,
      },
      position: {
        type: Sequelize.INTEGER,
      },
      profileRef: {
        type: Sequelize.TEXT,
      },
      reviewId: {
        type: Sequelize.INTEGER,
      },
      reviewUid: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      uid: {
        type: Sequelize.STRING,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      caption: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      googlePhotoRef: {
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
    return queryInterface.dropTable('ReviewPhotos');
  },
};
