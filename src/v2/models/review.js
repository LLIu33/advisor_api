module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: DataTypes.STRING,
      userUid: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      atmosphereRating: DataTypes.INTEGER,
      serviceRating: DataTypes.INTEGER,
      qualityRating: DataTypes.INTEGER,
      atmosphereText: DataTypes.STRING,
      serviceText: DataTypes.STRING,
      qualityText: DataTypes.STRING,
      text: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      indexes: [
        {
          unique: true,
          fields: ['placeId', 'uid'],
        },
      ],
    }
  );
  Review.associate = function (models) {
    Review.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Profile, {
      foreignKey: 'userUid',
      targetKey: 'uid',
    });
    Review.hasMany(models.ReviewPhoto, {
      foreignKey: 'reviewId',
      as: 'photos',
    });
  };
  return Review;
};
