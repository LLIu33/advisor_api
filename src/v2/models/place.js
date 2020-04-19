module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    'Place',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      isNewlyOpened: DataTypes.BOOLEAN,
      googlePlaceId: DataTypes.STRING,
      reviewsNumber: DataTypes.INTEGER,
      hidden: DataTypes.BOOLEAN,
      hasDelivery: DataTypes.BOOLEAN,
      venueId: DataTypes.INTEGER,
      venueUid: DataTypes.STRING,
      hasOutdoorSeating: DataTypes.BOOLEAN,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8mb4_general_ci',
    }
  );
  Place.associate = function (models) {
    Place.belongsToMany(models.List, {
      through: 'ListPlace',
      as: 'lists',
      foreignKey: 'placeId',
    });
    Place.hasMany(models.Review, {
      foreignKey: 'placeId',
      as: 'reviews',
    });
    Place.belongsToMany(models.DeliveryApps, {
      through: 'PlaceDeliveryApps',
      as: 'DeliveryApps',
      foreignKey: 'place_id',
    });
  };
  return Place;
};
