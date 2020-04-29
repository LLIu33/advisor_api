const db = require('../models');
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const { toJson, toShortPlace, jsonToPlace } = require('../mappers/place');

const fullArrayNestedModels = [
  { model: db.Cuisines, as: 'cuisines' },
  { model: db.DeliveryApps, as: 'DeliveryApps' },
  { model: db.DeliveryApps, as: 'PickupApps' },
  { model: db.PhotoReferences, as: 'PhotoReferences' },
  { model: db.Dishes, as: 'popularDishes' },
  { model: db.Photos, as: 'photos' },
  { model: db.GooglePhotos, as: 'googlePhotos' },
  { model: db.PositionedPhotos, as: 'positionedPhotos' },
  { model: db.Periods, as: 'openingHours' },
  { model: db.Locations, as: 'location' },
  { model: db.Contacts, as: 'contacts' },
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
        { model: db.Photos, as: 'photos' },
        { model: db.GooglePhotos, as: 'googlePhotos' },
        { model: db.PositionedPhotos, as: 'positionedPhotos' },
        { model: db.Periods, as: 'openingHours' },
        { model: db.Locations, as: 'location' },
        { model: db.Contacts, as: 'contacts' },
        { model: db.Ratings, as: 'rating' },
        { model: db.GoogleReviews, as: 'googleReviews' },
      ],
      offset: offset,
      limit: limit,
    });
    const places = data.length ? data.map((place) => toShortPlace(place)) : [];
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
      include: fullArrayNestedModels,
    });
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
    const response = await Place.create(newData, { include: fullArrayNestedModels });
    return res.status(200).send(toJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = jsonToPlace(req.body);
    await Place.update(newData, {
      where: { uid: entityId },
    });
    const response = await Place.findOne({ where: { uid: entityId } });
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

// const addPhotoToPlace = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const photoObj = req.body;
//     await Place.addPhotoToPlace(entityId, photoObj);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

module.exports = {
  getAllplaces,
  getList,
  get,
  getByIds,
  create,
  update,
  // addPhotoToPlace,
  remove,
};
