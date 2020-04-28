module.exports = (sequelize, DataTypes) => {
  const ReviewReport = sequelize.define(
    'ReviewReport',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: DataTypes.STRING,
      placeId: DataTypes.STRING,
      reviewId: DataTypes.STRING,
      reviewUid: DataTypes.STRING,
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
  ReviewReport.associate = function (models) {
    // associations can be defined here
  };
  return ReviewReport;
};
