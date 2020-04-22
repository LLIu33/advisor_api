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
      userId: DataTypes.INTEGER,
      userUid: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      placeUid: DataTypes.STRING,
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
  Review.associate = function (models) {
    Review.belongsTo(models.Place, {
      foreignKey: 'placeId',
    });
    Review.belongsTo(models.Profile, {
      foreignKey: 'userId',
    });
  };
  return Review;
};
