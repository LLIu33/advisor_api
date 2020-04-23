'use strict';
module.exports = (sequelize, DataTypes) => {
  const GoogleReviews = sequelize.define(
    'GoogleReviews',
    {
      placeId: DataTypes.INTEGER,
      authorName: DataTypes.STRING,
      profilePhotoUrl: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      publishedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  GoogleReviews.associate = function (models) {
    GoogleReviews.belongsTo(models.Place, {
      foreignKey: 'placeId',
    });
  };
  return GoogleReviews;
};
