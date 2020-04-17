module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
      },
    },
    {}
  );
  Profile.associate = function (models) {
    Profile.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });

    Profile.belongsToMany(models.Place, {
      through: 'ProfilePlace',
      as: 'places',
      foreignKey: 'profileId',
    });
  };
  return Profile;
};
