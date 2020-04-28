'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PhotoReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: Sequelize.STRING,
      placeId: Sequelize.STRING,
      photoCaption: Sequelize.STRING,
      photoCategory: Sequelize.STRING,
      photoDate: Sequelize.DATE,
      photoImageUrl: Sequelize.STRING,
      photoProfileRef: Sequelize.STRING,
      photoReviewId: Sequelize.STRING,
      photoStorageRef: Sequelize.STRING,
      photoUid: Sequelize.STRING,
      timestamp: Sequelize.DATE,
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
    return queryInterface.dropTable('PhotoReports');
  },
};
