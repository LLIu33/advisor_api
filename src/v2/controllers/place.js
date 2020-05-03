const db = require('../models');
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const { toJson, toShortPlace, jsonToPlace } = require('../mappers/place');
const { jsonToPhoto } = require('../mappers/photo');

const nestedModels = [
  { model: db.Cuisines, as: 'cuisines' },
  { model: db.DeliveryApps, as: 'DeliveryApps' },
  { model: db.DeliveryApps, as: 'PickupApps' },
  { model: db.PhotoReference, as: 'photoReferences' },
  { model: db.Dishes, as: 'popularDishes' },
  { model: db.Periods, as: 'openingHours' },
  { model: db.Locations, as: 'location' },
  { model: db.Contacts, as: 'contact' },
  { model: db.Ratings, as: 'rating' },
  { model: db.GoogleReviews, as: 'googleReviews' },
];

const getList = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);
    const data = await Place.findAll({
      where: filter,
      include: [
        { model: db.Cuisines, as: 'cuisines' },
        { model: db.Periods, as: 'openingHours' },
        { model: db.Locations, as: 'location' },
        { model: db.Contacts, as: 'contact' },
        { model: db.Ratings, as: 'rating' },
        { model: db.GoogleReviews, as: 'googleReviews' },
      ],
      offset: offset,
      limit: limit,
    });
    const places = [];
    for (const key in data) {
      const place = data[key];
      place.photos = await place.getPhotos();
      place.googlePhotos = await place.getGooglePhotos();
      place.positionedPhotos = await place.getPositionedPhotos();
      places.push(toShortPlace(place));
    }
    const response = {
      places,
      limit,
      offset,
    };
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const place = await Place.findOne({
      where: { uid: entityId },
      include: nestedModels,
    });
    place.photos = await place.getPhotos();
    place.googlePhotos = await place.getGooglePhotos();
    place.positionedPhotos = await place.getPositionedPhotos();
    const response = toJson(place);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = jsonToPlace(req.body);
    nestedModels.push({ model: db.Photos, as: 'photos' });
    nestedModels.push({ model: db.GooglePhotos, as: 'googlePhotos' });
    nestedModels.push({ model: db.PositionedPhotos, as: 'positionedPhotos' });
    const response = await Place.create(newData, { include: nestedModels });
    return res.status(200).send(toJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;

    const place = await Place.findOne({
      where: { uid: entityId },
    });

    const newData = jsonToPlace(req.body, place.id);
    await place.update(newData);

    const contact = await place.getContact();
    await contact.update({ ...contact.toJSON(), ...newData.contacts });
    const location = await place.getLocation();
    await location.update({ ...location.toJSON(), ...newData.location });
    const rating = await place.getRating();
    await rating.update({ ...rating.toJSON, ...newData.rating });

    const deliveryAppsHash = await getDeliveryAppsHash();
    newData.deliveryApps = newData.deliveryApps.map((item) => deliveryAppsHash[item.name]);
    await place.setDeliveryApps(newData.deliveryApps);
    newData.pickUpApps = newData.pickUpApps.map((item) => deliveryAppsHash[item.name]);
    await place.setPickupApps(newData.pickUpApps);

    const cuisinesHash = await getCuisinesHash();
    newData.cuisines = newData.cuisines.map((item) => cuisinesHash[item.name]);
    await place.setCuisines(newData.cuisines);

    await db.PhotoReference.destroy({ where: { placeId: place.id } });
    await db.PhotoReference.bulkCreate(newData.photoReferences);

    await db.Dishes.destroy({ where: { placeId: place.id } });
    await db.Dishes.bulkCreate(newData.popularDishes);

    await db.Photos.destroy({ where: { placeId: place.id } });
    await db.Photos.bulkCreate(newData.photos);

    await db.GooglePhotos.destroy({ where: { placeId: place.id } });
    await db.GooglePhotos.bulkCreate(newData.googlePhotos);

    await db.PositionedPhotos.destroy({ where: { placeId: place.id } });
    await db.PositionedPhotos.bulkCreate(newData.positionedPhotos);

    await db.Periods.destroy({ where: { placeId: place.id } });
    await db.Periods.bulkCreate(newData.openingHours);

    await db.GoogleReviews.destroy({ where: { placeId: place.id } });
    await db.GoogleReviews.bulkCreate(newData.googleReviews);

    const response = await Place.findOne({
      where: { uid: entityId },
      include: nestedModels,
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await Place.destroy({
      where: { uid: entityId },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getAllplaces = async (req, res) => {
  try {
    const response = await Place.findAll();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getByIds = async (req, res) => {
  try {
    const ids = req.query.ids;
    const response = await Place.findAll({
      where: {
        uid: {
          [Op.in]: ids,
        },
      },
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addPhotoToPlace = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const photoObj = req.body;
    const place = await Place.findOne({ where: { uid: entityId } });
    await place.createPhoto(jsonToPhoto(photoObj));
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getDeliveryAppsHash = async () => {
  const deliveries = await db.DeliveryApps.findAll({
    attributes: ['id', 'name'],
  });
  const deliveriesHash = {};
  deliveries.forEach((item) => {
    deliveriesHash[item.name] = item.id;
  });
  return deliveriesHash;
};

const getCuisinesHash = async () => {
  const cuisines = await db.Cuisines.findAll({
    attributes: ['id', 'name'],
  });
  const cuisinesHash = {};
  cuisines.forEach((item) => {
    cuisinesHash[item.name] = item.id;
  });
  return cuisinesHash;
};

module.exports = {
  getAllplaces,
  getList,
  get,
  getByIds,
  create,
  update,
  addPhotoToPlace,
  remove,
};
