module.exports = (sequelize, DataTypes) => {
  const ListReport = sequelize.define(
    'ListReport',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: DataTypes.STRING,
      listId: DataTypes.INTEGER,
      listUid: DataTypes.STRING,
      text: DataTypes.STRING,
      timestamp: DataTypes.DATE,
    },
    {}
  );
  ListReport.associate = function (models) {
    // associations can be defined here
  };
  return ListReport;
};
