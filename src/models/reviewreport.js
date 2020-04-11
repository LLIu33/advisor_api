'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewReport = sequelize.define('ReviewReport', {
    id: DataTypes.STRING,
    placeId: DataTypes.STRING,
    reviewId: DataTypes.STRING,
    text: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {});
  ReviewReport.associate = function(models) {
    // associations can be defined here
  };
  return ReviewReport;
};