'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      placeId: DataTypes.INTEGER,
      atmosphere: DataTypes.INTEGER,
      quality: DataTypes.INTEGER,
      service: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {}
  );
  Ratings.associate = function (models) {
    // associations can be defined here
  };
  return Ratings;
};
