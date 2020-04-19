'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuisines = sequelize.define(
    'Cuisines',
    {
      name: DataTypes.STRING,
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
  Cuisines.associate = function (models) {
    // associations can be defined here
  };
  return Cuisines;
};
