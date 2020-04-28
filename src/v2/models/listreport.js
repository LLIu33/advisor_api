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
      listId: DataTypes.STRING,
      text: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {}
  );
  ListReport.associate = function (models) {
    // associations can be defined here
  };
  return ListReport;
};
