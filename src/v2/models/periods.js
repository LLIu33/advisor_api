'use strict';
module.exports = (sequelize, DataTypes) => {
  const Periods = sequelize.define(
    'Periods',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      placeId: DataTypes.INTEGER,
      openDay: DataTypes.INTEGER,
      openTime: DataTypes.STRING,
      closeDay: DataTypes.INTEGER,
      closeTime: DataTypes.STRING,
      closed: DataTypes.BOOLEAN,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    },
    {}
  );
  Periods.associate = function (models) {
    Periods.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'CASCADE',
    });
  };
  return Periods;
};
