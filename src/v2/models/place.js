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
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Place.associate = function (models) {
    Place.belongsToMany(models.Profile, {
      through: 'ProfilePlace',
      as: 'profile',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.List, {
      through: 'ListPlace',
      as: 'lists',
      foreignKey: 'placeId',
    });
    Place.hasMany(models.Review, {
      foreignKey: 'placeId',
      as: 'reviews',
    });
    Place.belongsToMany(models.Cuisines, {
      through: 'PlaceCuisines',
      as: 'cuisines',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.DeliveryApps, {
      through: 'PlaceDeliveryApps',
      as: 'DeliveryApps',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.DeliveryApps, {
      through: 'PlacePickupApps',
      as: 'PickupApps',
      foreignKey: 'placeId',
    });
    Place.hasMany(models.PhotoReferences, {
      foreignKey: 'placeId',
      as: 'PhotoReferences',
    });
    Place.hasMany(models.Dishes, {
      foreignKey: 'placeId',
      as: 'popularDishes',
    });
    Place.belongsToMany(models.Photos, {
      through: 'PlacePhotos',
      as: 'photos',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.Photos, {
      through: 'PlaceGooglePhotos',
      as: 'googlePhotos',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.Photos, {
      through: 'PlaceMainPhotos',
      as: 'mainPhotos',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.Photos, {
      through: 'PlaceTopPhotos',
      as: 'topPhotos',
      foreignKey: 'placeId',
    });
    Place.belongsToMany(models.Photos, {
      through: 'PlacePositionedPhotos',
      as: 'positionedPhotos',
      foreignKey: 'placeId',
    });
    Place.hasMany(models.Periods, {
      foreignKey: 'placeId',
      as: 'openingHours',
    });
    Place.hasOne(models.Locations, {
      foreignKey: 'placeId',
      as: 'location',
    });
    Place.hasOne(models.Contacts, {
      foreignKey: 'placeId',
      as: 'contacts',
    });
    Place.hasOne(models.Ratings, {
      foreignKey: 'placeId',
      as: 'rating',
    });
    Place.hasMany(models.GoogleReviews, {
      foreignKey: 'placeId',
      as: 'googleReviews',
    });
  };
  return Place;
};
