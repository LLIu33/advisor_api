module.exports = (sequelize, DataTypes) => {
  const DeliveryApps = sequelize.define(
    'DeliveryApps',
    {
      name: DataTypes.STRING,
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
  DeliveryApps.associate = function (models) {
    DeliveryApps.belongsToMany(models.Place, {
      through: 'PlaceDeliveryApps',
      as: 'placesForDelivery',
      foreignKey: 'deliveryId',
    });
    DeliveryApps.belongsToMany(models.Place, {
      through: 'PlacePickupApps',
      as: 'placesForPickup',
      foreignKey: 'deliveryId',
    });
  };
  return DeliveryApps;
};
