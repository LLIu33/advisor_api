'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    date: DataTypes.DATE,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    latestCongratsLevel: DataTypes.NUMBER,
    level: DataTypes.NUMBER,
    role: DataTypes.NUMBER,
    points: DataTypes.NUMBER,
    avatarUrl: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};