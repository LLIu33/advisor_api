'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    isNewlyOpen: DataTypes.BOOLEAN,
    googlePlaceId: DataTypes.STRING,
    reviewsNumber: DataTypes.NUMBER,
    hidden: DataTypes.BOOLEAN,
    hasDelivery: DataTypes.BOOLEAN,
    venueId: DataTypes.STRING,
    hasOutdoorSeating: DataTypes.BOOLEAN
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
  };
  return Place;
};