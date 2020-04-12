module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    'Place',
    {
      id: DataTypes.INTEGER,
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      isNewlyOpen: DataTypes.BOOLEAN,
      googlePlaceId: DataTypes.STRING,
      reviewsNumber: DataTypes.INTEGER,
      hidden: DataTypes.BOOLEAN,
      hasDelivery: DataTypes.BOOLEAN,
      venueId: DataTypes.INTEGER,
      venueUid: DataTypes.STRING,
      hasOutdoorSeating: DataTypes.BOOLEAN,
    },
    {}
  );
  Place.associate = function (models) {
    Place.belongsToMany(models.List, {
      through: 'ListPlace',
      as: 'lists',
      foreignKey: 'place_id',
    });
  };
  return Place;
};
