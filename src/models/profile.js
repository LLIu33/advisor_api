module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      id: DataTypes.INTEGER,
      uid: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      registeredAt: DataTypes.DATE,
      birthday: DataTypes.DATE,
      gender: DataTypes.STRING,
      latestCongratsLevel: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      avatarUrl: DataTypes.STRING,
    },
    {}
  );
  Profile.associate = function (models) {
    Profile.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
  };
  return Profile;
};
