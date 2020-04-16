'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfilePlace = sequelize.define('ProfilePlace', {
    profileId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER
  }, {});
  ProfilePlace.associate = function(models) {
    // associations can be defined here
  };
  return ProfilePlace;
};