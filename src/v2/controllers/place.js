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

const toShortPlace = (data) => {
  console.log(data);
  const item = { id: data.id, topPhotos: [] };
  for (const fieldName of placeFieldNames) {
    if (fieldName === 'positionedPhotos') {
      const positionedPhotos = data[fieldName];
      if (positionedPhotos && positionedPhotos.length) {
        item[fieldName] = positionedPhotos.map((p) => Object.assign(Object.assign({}, p), { profileRef: undefined }));
      } else {
        item[fieldName] = positionedPhotos;
      }
    } else if (fieldName === 'photos' || fieldName === 'googlePhotos') {
      if (data[fieldName] && data[fieldName].length) {
        item.topPhotos = data[fieldName].map((item) => shortPhotoToJson(item));
      }
    }
  }
  item.positionedPhotos =
    item.positionedPhotos && item.positionedPhotos
      ? item.positionedPhotos.sort((a, b) => (a.position || 0) - (b.position || 0))
      : item.positionedPhotos;
  let dateSortedPhotos = [...item.topPhotos].sort(sortPhotos);

  for (const i of [...Array(item.positionedPhotos ? item.positionedPhotos.length : 0).keys()]) {
    const priorPhoto = item.positionedPhotos[i];
    const index = dateSortedPhotos.findIndex((tp) => tp.imageUrl === priorPhoto.imageUrl);
    if (index !== -1) {
      const photo = dateSortedPhotos[index];
      dateSortedPhotos.splice(index, 1);
      dateSortedPhotos.splice(i, 0, photo);
    } else {
      dateSortedPhotos.splice(i, 0, priorPhoto);
    }
  }
  dateSortedPhotos = dateSortedPhotos.filter((p) => !(p.category && p.category.includes('Menu')));
  item.topPhotos = dateSortedPhotos.slice(0, 4).map((p) => zipImageUrl(p));
  delete item.positionedPhotos;
  // item.openingHours = zipOpeningHours(item);
  // return item;
  return {
    id: data.uid,
    name: data.name,
    cost: data.cost,
    reviewsNumber: data.reviewsNumber,
    hidden: data.hidden,
    cuisines: data.cuisines.map((item) => item.name),
    rating: ratingToJson(data.rating),
    location: locationToJson(data.location),
    openingHours: data.openingHours.map((item) => shortPeriodToJson(item)),
    googleReviews_number: data.googleReviews.length,
    // google_rating,
    googleReviews: data.googleReviews.map((item) => shortGoogleReviewToJson(item)),
    topPhotos: item.topPhotos,
  };
};

const sortPhotos = (a, b) => {
  const aDate = a.publishedAt ? a.publishedAt.toDate().getTime() : new Date();
  const bDate = b.publishedAt ? b.publishedAt.toDate().getTime() : new Date();
  if (aDate > bDate) {
    return -1;
  } else if (aDate < bDate) {
    return 1;
  } else if (a.imageUrl < b.imageUrl) {
    return -1;
  } else if (a.imageUrl > b.imageUrl) {
    return 1;
  }
  return 0;
};

function zipImageUrl(photo) {
  const placeImageDirPath = 'https://firebasestorage.googleapis.com/v0/b/fobe-id.appspot.com/o/place-photos%2F';
  return { imageUrl: photo.imageUrl.replace(placeImageDirPath, '') };
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
  return {
    author_name: entity.authorName,
    profile_photo_url: entity.profilePhotoUrl,
    rating: entity.rating,
    text: entity.text,
    time: moment(entity.publishedAt).unix(),
  };
};

const shortPhotoToJson = (photo) => {
  return {
    imageUrl: photo.imageUrl,
    date: photo.publishedAt,
    category: photo.category,
    position: photo.position,
  };
};

const shortGoogleReviewToJson = (entity) => {
  return {
    rating: entity.rating,
    time: moment(entity.publishedAt).unix(),
  };
};

function shortPeriodToJson(period) {
  return [period.openDay, period.openTime, period.closeDay, period.closeTime];
}

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
