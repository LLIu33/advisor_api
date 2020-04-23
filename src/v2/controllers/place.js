const db = require('../models');
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const moment = require('moment');

const getList = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);
    console.log(filter);
    const data = await Place.findAll({
      where: filter,
      include: [
        { model: db.Cuisines, as: 'cuisines' },
        { model: db.Photos, as: 'topPhotos' },
        { model: db.Photos, as: 'positionedPhotos' },
        { model: db.Periods, as: 'openingHours' },
        { model: db.Locations, as: 'location' },
        { model: db.Contacts, as: 'contacts' },
        { model: db.Ratings, as: 'rating' },
        { model: db.GoogleReviews, as: 'googleReviews' },
      ],
      offset: offset,
      limit: limit,
    });
    console.log(data.length);
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
      include: [
        { model: db.Cuisines, as: 'cuisines' },
        { model: db.DeliveryApps, as: 'DeliveryApps' },
        { model: db.DeliveryApps, as: 'PickupApps' },
        { model: db.PhotoReferences, as: 'PhotoReferences' },
        { model: db.Dishes, as: 'popularDishes' },
        { model: db.Photos, as: 'photos' },
        { model: db.Photos, as: 'googlePhotos' },
        { model: db.Photos, as: 'mainPhotos' },
        { model: db.Photos, as: 'topPhotos' },
        { model: db.Periods, as: 'openingHours' },
        { model: db.Locations, as: 'location' },
        { model: db.Contacts, as: 'contacts' },
        { model: db.Ratings, as: 'rating' },
        { model: db.GoogleReviews, as: 'googleReviews' },
      ],
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
    const newData = req.body;
    await Place.create(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    await Place.update(newData, {
      where: { uid: entityId },
    });
    return res.status(200).send();
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

const toShortPlace = (input) => {
  return {
    id: input.uid,
    name: input.name,
    cost: input.cost,
    reviewsNumber: input.reviewsNumber,
    hidden: input.hidden,
    cuisines: input.cuisines.map((item) => item.name),
    rating: ratingToJson(input.rating),
    location: locationToJson(input.location),
    openingHours: input.openingHours.map((item) => zipOpeningHours(item)),
    googleReviews_number: input.googleReviews.length,
    googleReviews: input.googleReviews.map((item) => googleReviewToJson(item)),
    topPhotos: input.topPhotos.map((item) => photoToJson(item)),
  };
};

function zipOpeningHours(period) {
  const openDay = period.open ? period.open.day : null;
  const openTime = period.open ? Number(period.open.time) : null;
  const closeDay = period.close ? period.close.day : null;
  const closeTime = period.close ? Number(period.close.time) : null;
  return [openDay, openTime, closeDay, closeTime];
}

const toJson = (input, withNested = true) => {
  let item = {
    id: input.id,
    uid: input.uid,
    name: input.name,
    cost: input.cost,
    isNewlyOpened: input.isNewlyOpened,
    googlePlaceId: input.googlePlaceId,
    reviewsNumber: input.reviewsNumber,
    hidden: input.hidden,
    hasDelivery: input.hasDelivery,
    venueId: input.venueUid,
    hasOutdoorSeating: input.hasOutdoorSeating,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
  if (withNested) {
    const additionalData = {
      cuisines: input.cuisines.map((item) => item.name),
      DeliveryApps: input.DeliveryApps.map((item) => item.name),
      PickupApps: input.PickupApps.map((item) => item.name),
      photo_references: input.PhotoReferences.map((item) => item.reference),
      popularDishes: input.popularDishes.map((item) => item.name),
      photos: input.photos.map((item) => photoToJson(item)),
      googlePhotos: input.googlePhotos.map((item) => photoToJson(item)),
      mainPhotos: input.mainPhotos.map((item) => photoToJson(item)),
      topPhotos: input.topPhotos.map((item) => photoToJson(item)),
      positionedPhotos: input.positionedPhotos.map((item) => photoToJson(item)),
      openingHours: { periods: input.openingHours.map((item) => periodToJson(item)) },
      location: locationToJson(input.location),
      contacts: contactToJson(input.contacts),
      rating: ratingToJson(input.rating),
      googleReviews: input.googleReviews.map((item) => googleReviewToJson(item)),
    };
    item = Object.assign(item, additionalData);
  }
  return item;
};

const photoToJson = (photo) => {
  return {
    imageUrl: photo.imageUrl,
    date: photo.publishedAt,
    caption: photo.caption,
    category: photo.category,
    googlePhotoRef: photo.googlePhotoRef,
    storageRef: photo.storageRef,
    position: photo.position,
    reviewId: photo.reviewId,
  };
};

const periodToJson = (period) => {
  return {
    open: {
      day: period.openDay,
      time: period.openTime,
    },
    close: {
      day: period.closeDay,
      time: period.closeTime,
    },
    closed: period.closed,
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

const contactToJson = (entity) => {
  return {
    carrigeMenu: entity.carrigeMenu,
    deliverooMenu: entity.deliverooMenu,
    instagram: entity.instagram,
    menusite: entity.menusite,
    phone: entity.phone,
    talabatMenu: entity.talabatMenu,
    website: entity.website,
  };
};

const ratingToJson = (entity) => {
  return {
    atmosphere: entity.atmosphere,
    quality: entity.quality,
    service: entity.service,
  };
};

const googleReviewToJson = (entity) => {
  console.log(entity);
  return {
    author_name: entity.authorName,
    profile_photo_url: entity.profilePhotoUrl,
    rating: entity.rating,
    text: entity.text,
    time: moment(entity.publishedAt).unix(),
  };
};

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
