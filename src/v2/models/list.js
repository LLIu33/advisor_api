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
      creatorId: DataTypes.INTEGER,
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
    {}
  );
  List.associate = function (models) {
    List.hasOne(models.Profile, {
      foreignKey: 'creatorId',
      as: 'profile',
    });

    List.belongsToMany(models.Place, {
      through: 'ListPlace',
      as: 'places',
      foreignKey: 'listId',
    });
  };
  return List;
};
