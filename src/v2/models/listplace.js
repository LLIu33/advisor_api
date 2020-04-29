'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListPlace = sequelize.define(
    'ListPlace',
    {
      listId: {
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
  ListPlace.associate = function (models) {
    // associations can be defined here
  };
  return ListPlace;
};
