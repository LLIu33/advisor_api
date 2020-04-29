'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewPhoto = sequelize.define(
    'ReviewPhoto',
    {
      storageRef: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      profileRef: DataTypes.TEXT,
      reviewId: DataTypes.INTEGER,
      reviewUid: DataTypes.STRING,
      imageUrl: DataTypes.TEXT,
      uid: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      caption: DataTypes.STRING,
      category: DataTypes.STRING,
      googlePhotoRef: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    { charset: 'utf8mb4', collate: 'utf8mb4_general_ci' }
  );
  ReviewPhoto.associate = function (models) {
    ReviewPhoto.belongsTo(models.Review, {
      foreignKey: 'reviewId',
      onDelete: 'CASCADE',
    });
  };
  return ReviewPhoto;
};
