module.exports = (sequelize, DataTypes) => {
  const PlaceDeliveryApps = sequelize.define(
    'PlaceDeliveryApps',
    {
      placeId: DataTypes.INTEGER,
      deliveryId: DataTypes.INTEGER,
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
  PlaceDeliveryApps.associate = function (models) {
    // associations can be defined here
  };
  return PlaceDeliveryApps;
};
