const uuid = require('uuid/v4');

const { jsonToLocation, locationToJson } = require('./location');
const { jsonToPhoto, photoToJson, shortPhotoToJson } = require('./photo');
const { jsonToPeriods, periodToJson, shortPeriodToJson } = require('./period');
const { jsonToGoogleReview, googleReviewToJson, shortGoogleReviewToJson } = require('./googleReview');

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
    venueId: input.venueId,
    hasOutdoorSeating: input.hasOutdoorSeating,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
  if (withNested) {
    const additionalData = {
      cuisines: input.cuisines ? input.cuisines.map((item) => item.name) : [],
      DeliveryApps: input.DeliveryApps ? input.DeliveryApps.map((item) => item.name) : [],
      PickupApps: input.PickupApps ? input.PickupApps.map((item) => item.name) : [],
      photo_references: input.PhotoReferences ? input.PhotoReferences.map((item) => item.reference) : [],
      popularDishes: input.popularDishes ? input.popularDishes.map((item) => item.name) : [],
      photos: input.photos ? input.photos.map((item) => photoToJson(item)) : [],
      googlePhotos: input.googlePhotos ? input.googlePhotos.map((item) => photoToJson(item)) : [],
      positionedPhotos: input.positionedPhotos ? input.positionedPhotos.map((item) => photoToJson(item)) : [],
      openingHours: input.openingHours ? { periods: input.openingHours.map((item) => periodToJson(item)) } : [],
      location: locationToJson(input.location),
      contacts: contactToJson(input.contacts),
      rating: ratingToJson(input.rating),
      googleReviews: input.googleReviews ? input.googleReviews.map((item) => googleReviewToJson(item)) : [],
    };
    item = Object.assign(item, additionalData);
  }
  return item;
};

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

const jsonToPlace = (input) => {
  const uid = input.id || uuid();
  return {
    uid: uid,
    name: input.name,
    reviewsNumber: input.reviewsNumber,
    hidden: input.hidden,
    hasDelivery: input.hasDelivery,
    venueId: input.venueId,
    hasOutdoorSeating: input.hasOutdoorSeating,
    cost: input.cost,
    isNewlyOpened: input.isNewlyOpened,
    googlePlaceId: input.googlePlaceId,
    location: jsonToLocation(input.location),
    contacts: input.contacts || {},
    rating: input.rating || {},
    popularDishes: input.popularDishes
      ? input.popularDishes.map((item) => {
          return { name: item };
        })
      : [],
    googleReviews: jsonToGoogleReview(input.googleReviews),
    deliveryApps: input.deliveryApps
      ? input.deliveryApps.map((item) => {
          return { name: item };
        })
      : [],
    pickUpApps: input.pickUpApps
      ? input.pickUpApps.map((item) => {
          return { name: item };
        })
      : [],
    PhotoReferences: input.photo_references
      ? input.photo_references.map((item) => {
          return { reference: item };
        })
      : [],
    photos: jsonToPhoto(input.photos),
    positionedPhotos: jsonToPhoto(input.positionedPhotos),
    googlePhotos: jsonToPhoto(input.googlePhotos),
    cuisines: input.cuisines
      ? input.cuisines.map((item) => {
          return { name: item };
        })
      : [],
    openingHours: jsonToPeriods(input.openingHours),
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

const zipImageUrl = (photo) => {
  const placeImageDirPath = 'https://firebasestorage.googleapis.com/v0/b/fobe-id.appspot.com/o/place-photos%2F';
  return { imageUrl: photo.imageUrl.replace(placeImageDirPath, '') };
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

module.exports = {
  toJson,
  toShortPlace,
  jsonToPlace,
};
