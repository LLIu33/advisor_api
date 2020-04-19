module.exports = (sequelize, DataTypes) => {
  const DeliveryApps = sequelize.define(
    'DeliveryApps',
    {
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
  DeliveryApps.associate = function (models) {
    DeliveryApps.belongsToMany(models.Place, {
      through: 'PlaceDeliveryApps',
      as: 'places',
      foreignKey: 'delivery_id',
    });
  };
  return DeliveryApps;
};
