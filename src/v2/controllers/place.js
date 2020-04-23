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
        { model: db.Photos, as: 'photos' },
        { model: db.Photos, as: 'googlePhotos' },
        { model: db.Photos, as: 'mainPhotos' },
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
    const places = data.length ? data.map((place) => toJson(place, false)) : [];
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
        { model: db.GooglePhotos, as: 'googlePhotos' },
        { model: db.PositionedPhotos, as: 'positionedPhotos' },
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

// {
//             "id": "360_Mall_+_Murooj-Agnii_360-29.2662873-47.9975469",
//             "name": "Agnii - 360 Mall New",
//             "cost": 2,
//             "cuisines": [
//                 "Indian"
//             ],
//             "rating": {
//                 "atmosphere": 0,
//                 "service": 0,
//                 "quality": 0
//             },
//             "reviewsNumber": 0,
//             "hidden": false,
//             "location": {
//                 "coordinates": {
//                     "_latitude": 29.2662873,
//                     "_longitude": 47.9975469
//                 },
//                 "address": "Jassem Mohammad Al-Kharafi Road, Kuwait",
//                 "area": "360 Mall + Murooj"
//             },
//             "openingHours": [
//                 [
//                     1,
//                     1200,
//                     1,
//                     2330
//                 ],
//                 [
//                     4,
//                     1200,
//                     5,
//                     0
//                 ]
//             ],
//             "googleReviews_number": 16,
//             "google_rating": 5,
//             "googleReviews": [
//                 {
//                     "rating": 5,
//                     "time": 1583006950
//                 },
//                 {
//                     "rating": 5,
//                     "time": 1582058555
//                 },
//                 {
//                     "rating": 5,
//                     "time": 1583064861
//                 },
//                 {
//                     "rating": 5,
//                     "time": 1583005998
//                 },
//                 {
//                     "rating": 5,
//                     "time": 1583009000
//                 }
//             ]
//             "topPhotos": [
//                 {
//                     "imageUrl": "360_Mall_%2B_Murooj-Agnii_360-29.2662873-47.9975469%2Fphotos%2F04-04-2020_16:06:59_0?alt=media&token=c47fc70e-36fe-45c5-a741-0ae2005f0fb0"
//                 },
//                 {
//                     "imageUrl": "360_Mall_%2B_Murooj-Agnii_360-29.2662873-47.9975469%2Fphotos%2F04-04-2020_16:06:59_1?alt=media&token=a2f049f6-85b8-4d0a-a934-ddcb058506d3"
//                 },
//                 {
//                     "imageUrl": "360_Mall_%2B_Murooj-Agnii_360-29.2662873-47.9975469%2Fphotos%2F04-04-2020_16:06:59_2?alt=media&token=8262abdf-b0ae-43c3-b46d-a450527029a0"
//                 },
//                 {
//                     "imageUrl": "360_Mall_%2B_Murooj-Agnii_360-29.2662873-47.9975469%2Fphotos%2F04-04-2020_16:06:59_3?alt=media&token=67c10454-2dd2-43de-86a7-0d864c1a6ece"
//                 }
//             ],
//         },
function cutArraysFields(value, whitelistedFields = [], blacklistedFields = []) {
  if (!value) {
    return value;
  } else {
    if (!value.length) {
      return [];
    } else {
      let result = [...value];
      if (whitelistedFields.length) {
        result = result.map((p) => {
          const item = {};
          for (const field of whitelistedFields) {
            item[field] = p[field];
          }
          return item;
        });
      }
      if (blacklistedFields.length) {
        result = result.map((p) => {
          const item = Object.assign({}, p);
          for (const field of blacklistedFields) {
            delete item[field];
          }
          return item;
        });
      }
      return result;
    }
  }
}
const placeFieldNames = [
  'name',
  'cost',
  'cuisines',
  'rating',
  'reviewsNumber',
  'hidden',
  'isNewlyOpened',
  'location',
  'openingHours',
  'googleReviews_number',
  'google_rating',
  'timings',
  'mainPhotos',
  'photos',
  'googlePhotos',
  'positionedPhotos',
  'googleReviews',
];
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
    // google_rating,
    // googleReviews,
    // topPhotos,
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
