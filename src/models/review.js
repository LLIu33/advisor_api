'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: DataTypes.INTEGER,
      uid: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      userUid: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      placeUid: DataTypes.STRING,
      atmosphereRating: DataTypes.INTEGER,
      serviceRating: DataTypes.INTEGER,
      qualityRating: DataTypes.INTEGER,
      atmosphereText: DataTypes.STRING,
      serviceText: DataTypes.STRING,
      qualityText: DataTypes.STRING,
      text: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
  };
  return Review;
};
