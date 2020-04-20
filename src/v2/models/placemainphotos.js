'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlacePhotos = sequelize.define(
    'PlaceMainPhotos',
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
  PlacePhotos.associate = function (models) {
    // associations can be defined here
  };
  return PlacePhotos;
};
