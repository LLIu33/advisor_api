'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoReference = sequelize.define(
    'PhotoReference',
    {
      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference: DataTypes.STRING,
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
  PhotoReference.associate = function (models) {
    PhotoReference.belongsTo(models.Place, {
      onDelete: 'CASCADE',
    });
  };
  return PhotoReference;
};
