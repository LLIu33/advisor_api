'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dishes = sequelize.define(
    'Dishes',
    {
      name: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
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
  Dishes.associate = function (models) {
    // associations can be defined here
  };
  return Dishes;
};
