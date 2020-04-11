'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: DataTypes.STRING,
    userId: DataTypes.STRING,
    atmosphereRating: DataTypes.NUMBER,
    serviceRating: DataTypes.NUMBER,
    qualityRating: DataTypes.NUMBER,
    atmosphereText: DataTypes.STRING,
    serviceText: DataTypes.STRING,
    qualityText: DataTypes.STRING,
    text: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};