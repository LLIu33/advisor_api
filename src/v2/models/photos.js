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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    { charset: 'utf8mb4', collate: 'utf8mb4_general_ci' }
  );
  Photos.associate = function (models) {
    Photos.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'CASCADE',
    });
  };
  return Photos;
};
