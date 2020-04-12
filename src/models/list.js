module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      id: DataTypes.INTEGER,
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
      coverUrl: DataTypes.STRING,
      isTrending: DataTypes.BOOLEAN,
      isPublic: DataTypes.BOOLEAN,
      creatorId: DataTypes.INTEGER,
      creatorUid: DataTypes.STRING,
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
      foreignKey: 'list_id',
    });
  };
  return List;
};
