'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoReferences = sequelize.define(
    'PhotoReferences',
    {
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference: DataTypes.STRING,
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
  PhotoReferences.associate = function (models) {
    PhotoReferences.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'CASCADE',
    });
  };
  return PhotoReferences;
};
