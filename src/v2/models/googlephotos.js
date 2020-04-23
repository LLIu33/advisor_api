module.exports = (sequelize, DataTypes) => {
  const GooglePhotos = sequelize.define(
    'GooglePhotos',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      placeId: DataTypes.INTEGER,
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
  GooglePhotos.associate = function (models) {
    GooglePhotos.belongsTo(models.Place, {
      foreignKey: 'placeId',
    });
  };
  return GooglePhotos;
};
