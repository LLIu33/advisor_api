module.exports = (sequelize, DataTypes) => {
  const ReviewReport = sequelize.define(
    'ReviewReport',
    {
      id: DataTypes.INTEGER,
      uid: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      reviewId: DataTypes.INTEGER,
      placeUid: DataTypes.STRING,
      reviewUid: DataTypes.STRING,
      text: DataTypes.STRING,
      timestamp: DataTypes.DATE,
    },
    {}
  );
  ReviewReport.associate = function (models) {
    // associations can be defined here
  };
  return ReviewReport;
};
