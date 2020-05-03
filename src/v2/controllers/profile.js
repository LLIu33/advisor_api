const db = require('../models');
const Profile = db.Profile;
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const { jsonToProfile, profileToJson } = require('../mappers/profile');
const { reviewToJson } = require('../mappers/review');
const { photoToJson } = require('../mappers/photo');

const getList = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    const profiles = await Profile.findAll({ where: filter, include: { model: db.Place, as: 'places' } });
    const response = {
      profiles: profiles.map((item) => profileToJson(item)),
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
    const response = await Profile.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(profileToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = jsonToProfile(req.body);
    const profile = await Profile.create(newData);

    if (req.body.placeIds) {
      const places = await Place.findAll({
        where: {
          uid: {
            [Op.in]: req.body.placeIds,
          },
        },
      });
      await profile.setPlaces(places);
    }
    const response = await Profile.findOne({ where: { uid: profile.uid }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(profileToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = jsonToProfile(req.body);
    const profile = await Profile.findOne({ where: { uid: entityId } });
    await profile.update(newData);
    if (req.body.placeIds) {
      const places = await Place.findAll({
        where: {
          uid: {
            [Op.in]: req.body.placeIds,
          },
        },
      });
      await profile.setPlaces([]);
      await profile.setPlaces(places);
    }

    const response = await Profile.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(profileToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const profile = await Profile.findOne({ where: { uid: entityId } });
    const places = await profile.getPlaces();

    const reviews = [];
    for (const key in places) {
      const place = places[key];
      let placeReviews = await place.getReviews();
      placeReviews = placeReviews.filter((review) => review.uid === profile.uid);
      const review = placeReviews.length > 0 ? placeReviews[0] : null;
      if (review) {
        reviews.push({
          placeId: place.uid,
          review: reviewToJson(review),
        });
      }
    }
    return res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getPhotos = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const profile = await Profile.findOne({ where: { uid: entityId } });
    const places = await profile.getPlaces();
    const photos = [];
    for (const key in places) {
      const place = places[key];
      let placePhotos = await place.getPhotos();
      placePhotos = placePhotos.filter((photo) => photo.uid === profile.uid);
      photos.push({
        placeId: place.uid,
        photos: placePhotos.map((photo) => photoToJson(photo)),
      });
    }
    return res.status(200).send(photos);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getList,
  get,
  getPhotos,
  getReviews,
  create,
  update,
};
