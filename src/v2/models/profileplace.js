'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfilePlace = sequelize.define(
    'ProfilePlace',
    {
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
  ProfilePlace.associate = function (models) {
    // associations can be defined here
  };
  return ProfilePlace;
};
