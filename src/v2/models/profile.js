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
      uid: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
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
  Profile.associate = function (models) {
    Profile.hasMany(models.Review, {
      foreignKey: 'userUid',
      as: 'reviews',
      sourceKey: 'uid',
    });

    Profile.belongsToMany(models.Place, {
      through: 'ProfilePlace',
      as: 'places',
      foreignKey: 'profileId',
    });
  };
  return Profile;
};
