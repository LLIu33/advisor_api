'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListPlace = sequelize.define(
    'ListPlace',
    {
      listId: DataTypes.INTEGER,
      placeId: DataTypes.INTEGER,
    },
    {}
  );
  ListPlace.associate = function (models) {
    // associations can be defined here
  };
  return ListPlace;
};
