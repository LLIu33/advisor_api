'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaceCuisines = sequelize.define(
    'PlaceCuisines',
    {
      placeId: DataTypes.INTEGER,
      cuisineId: DataTypes.INTEGER,
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
  PlaceCuisines.associate = function (models) {
    // associations can be defined here
  };
  return PlaceCuisines;
};
