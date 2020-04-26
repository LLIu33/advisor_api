module.exports = (sequelize, DataTypes) => {
  const PlaceDeliveryApps = sequelize.define(
    'PlaceDeliveryApps',
    {
      placeId: DataTypes.INTEGER,
      deliveryId: DataTypes.INTEGER,
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
  PlaceDeliveryApps.associate = function (models) {
    // associations can be defined here
  };
  return PlaceDeliveryApps;
};
