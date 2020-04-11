'use strict';
module.exports = (sequelize, DataTypes) => {
  const PhotoReport = sequelize.define('PhotoReport', {
    id: DataTypes.STRING,
    placeId: DataTypes.STRING,
    photoId: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {});
  PhotoReport.associate = function(models) {
    // associations can be defined here
  };
  return PhotoReport;
};