'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlacePickupApps = sequelize.define(
    'PlacePickupApps',
    {
      placeId: DataTypes.INTEGER,
      deliveryId: DataTypes.INTEGER,
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
  PlacePickupApps.associate = function (models) {
    // associations can be defined here
  };
  return PlacePickupApps;
};
