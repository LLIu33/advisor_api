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
      placeId: DataTypes.INTEGER,
      photoId: DataTypes.INTEGER,
      placeUid: DataTypes.STRING,
      photoUid: DataTypes.STRING,
      timestamp: DataTypes.DATE,
    },
    {}
  );
  PhotoReport.associate = function (models) {
    // associations can be defined here
  };
  return PhotoReport;
};
