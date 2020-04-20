'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      placeId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      area: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    },
    {}
  );
  Locations.associate = function (models) {
    // associations can be defined here
  };
  return Locations;
};
