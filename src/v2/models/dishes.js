'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dishes = sequelize.define(
    'Dishes',
    {
      name: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
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
  Dishes.associate = function (models) {
    Dishes.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'CASCADE',
    });
  };
  return Dishes;
};
