'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlacePhotos = sequelize.define(
    'PlaceGooglePhotos',
    {
      placeId: DataTypes.INTEGER,
      photoId: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
    },
    {}
  );
  PlacePhotos.associate = function (models) {};
  return PlacePhotos;
};
