'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListReport = sequelize.define('ListReport', {
    id: DataTypes.STRING,
    listId: DataTypes.STRING,
    text: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {});
  ListReport.associate = function(models) {
    // associations can be defined here
  };
  return ListReport;
};