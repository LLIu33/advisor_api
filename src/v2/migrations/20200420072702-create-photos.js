module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      caption: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      googlePhotoRef: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      position: {
        type: Sequelize.INTEGER,
      },
      storageRef: {
        type: Sequelize.STRING,
      },
      uid: {
        type: Sequelize.STRING,
      },
      reviewId: {
        type: Sequelize.INTEGER,
      },
      reviewUid: {
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
    return queryInterface.dropTable('Photos');
  },
};
