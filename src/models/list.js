module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      id: DataTypes.STRING,
      name: DataTypes.STRING,
      coverUrl: DataTypes.STRING,
      isTrending: DataTypes.BOOLEAN,
      isPublic: DataTypes.BOOLEAN,
      creatorId: DataTypes.STRING,
    },
    {}
  );
  List.associate = function (models) {
    List.hasOne(models.Profile, {
      foreignKey: 'creatorId',
      as: 'profile',
    });
  };
  return List;
};
