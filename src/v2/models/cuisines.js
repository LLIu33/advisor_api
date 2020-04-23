'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuisines = sequelize.define(
    'Cuisines',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
    Cuisines.belongsToMany(models.Place, {
      through: 'PlaceCuisines',
      as: 'places',
      foreignKey: 'cuisineId',
    });
  };
  return Cuisines;
};
