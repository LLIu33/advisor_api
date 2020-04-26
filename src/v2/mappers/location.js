const jsonToLocation = (data) => {
  return {
    address: data.address,
    area: data.area,
    longitude: data.coordinates._latitude,
    latitude: data.coordinates._longitude,
  };
};

const locationToJson = (entity) => {
  return {
    address: entity.address,
    area: entity.area,
    coordinates: {
      _latitude: entity.latitude,
      _longitude: entity.longitude,
    },
  };
};

module.exports = {
  jsonToLocation,
  locationToJson,
};
