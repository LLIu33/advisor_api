module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      coverUrl: DataTypes.STRING,
      isTrending: DataTypes.BOOLEAN,
      isPublic: DataTypes.BOOLEAN,
      creatorUid: DataTypes.STRING,
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
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  List.associate = function (models) {
    List.belongsTo(models.Profile, {
      foreignKey: 'creatorUid',
      as: 'profile',
      targetKey: 'uid',
    });

    List.belongsToMany(models.Place, {
      through: 'ListPlace',
      as: 'places',
      foreignKey: 'listId',
    });
  };
  return List;
};
