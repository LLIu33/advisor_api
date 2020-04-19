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
    // associations can be defined here
  };
  return PhotoReferences;
};
