'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoReferences = sequelize.define(
    'PhotoReferences',
    {
      placeId: DataTypes.INTEGER,
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
    });
  };
  return PhotoReferences;
};
