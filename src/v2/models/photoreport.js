module.exports = (sequelize, DataTypes) => {
  const PhotoReport = sequelize.define(
    'PhotoReport',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uid: DataTypes.STRING,
      placeId: DataTypes.STRING,
      photoCaption: DataTypes.STRING,
      photoCategory: DataTypes.STRING,
      photoDate: DataTypes.DATE,
      photoImageUrl: DataTypes.TEXT,
      photoProfileRef: DataTypes.STRING,
      photoReviewId: DataTypes.STRING,
      photoStorageRef: DataTypes.STRING,
      photoUid: DataTypes.STRING,
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
  PhotoReport.associate = function (models) {
    // associations can be defined here
  };
  return PhotoReport;
};
