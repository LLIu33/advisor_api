module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define(
    'Photos',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      caption: DataTypes.STRING,
      category: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      googlePhotoRef: DataTypes.STRING,
      imageUrl: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      storageRef: DataTypes.STRING,
      uid: DataTypes.STRING,
      reviewId: DataTypes.INTEGER,
      reviewUid: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW() ON UPDATE NOW()'),
      },
    },
    { charset: 'utf8mb4', collate: 'utf8mb4_general_ci' }
  );
  Photos.associate = function (models) {
    Photos.belongsToMany(models.Place, {
      through: 'PlacePhotos',
      as: 'places',
      foreignKey: 'photoId',
    });
    Photos.belongsToMany(models.Place, {
      through: 'PlaceGooglePhotos',
      as: 'placesForGoogle',
      foreignKey: 'photoId',
    });
    Photos.belongsToMany(models.Place, {
      through: 'PlaceMainPhotos',
      as: 'placesForMain',
      foreignKey: 'photoId',
    });
    Photos.belongsToMany(models.Place, {
      through: 'PlaceTopPhotos',
      as: 'placesForTop',
      foreignKey: 'photoId',
    });
    Photos.belongsToMany(models.Place, {
      through: 'PlacePositionedPhotos',
      as: 'placesForPositioned',
      foreignKey: 'photoId',
    });
  };
  return Photos;
};
