const db = require('../models');
const Review = db.Review;
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const { jsonToReview, reviewToJson } = require('../mappers/review');

const getList = async (req, res) => {
  try {
    const placeUid = req.params.place_id;
    const place = await Place.findOne({
      where: { uid: placeUid },
    });
    const placeId = place.id;
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    filter.placeId = placeId;

    const reviews = await Review.findAll({ where: filter, include: { model: db.ReviewPhoto, as: 'photos' } });
    const response = {
      reviews: reviews.map((item) => reviewToJson(item)),
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
    const placeUid = req.params.place_id;
    const place = await Place.findOne({
      where: { uid: placeUid },
    });
    const placeId = place.id;
    const entityId = req.params.item_id;
    const response = await Review.findOne({
      where: { uid: entityId, placeId: placeId },
      include: { model: db.ReviewPhoto, as: 'photos' },
    });
    return res.status(200).send(reviewToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const placeUid = req.params.place_id;
    const place = await Place.findOne({
      where: { uid: placeUid },
    });
    const placeId = place.id;
    let newData = req.body;
    newData.placeId = placeId;
    newData = jsonToReview(newData);
    const review = await Review.create(newData, { include: { model: db.ReviewPhoto, as: 'photos' } });
    const response = await Review.findOne({
      where: { uid: review.uid, placeId: placeId },
      include: { model: db.ReviewPhoto, as: 'photos' },
    });
    return res.status(200).send(reviewToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const placeUid = req.params.place_id;
    const place = await Place.findOne({
      where: { uid: placeUid },
    });
    const placeId = place.id;
    const entityId = req.params.item_id;
    let newData = req.body;
    newData.placeId = placeId;
    newData = jsonToReview(newData);
    const review = await Review.findOne({
      where: { uid: entityId, placeId: placeId },
    });

    await review.setPhotos([]);
    await review.update(newData, {
      where: { uid: entityId, placeId: placeId },
    });
    if (newData.photos.length > 0) {
      newData.photos = newData.photos.map((photo) => {
        photo.reviewId = review.id;
        return photo;
      });
      await db.ReviewPhoto.bulkCreate(newData.photos);
    }

    const response = await Review.findOne({
      where: { uid: entityId, placeId: placeId },
      include: { model: db.ReviewPhoto, as: 'photos' },
    });
    return res.status(200).send(reviewToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const placeUid = req.params.place_id;
    const place = await Place.findOne({
      where: { uid: placeUid },
    });
    const placeId = place.id;
    const entityId = req.params.item_id;
    await Review.destroy({
      where: { uid: entityId, placeId: placeId },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// const addPhoto = async (req, res) => {
//   try {
//     const placeId = req.params.place_id;
//     const entityId = req.params.item_id;
//     const photoObj = req.body;
//     await reviewModel.updateById(entityId, placeId, photoObj);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

// const removePhoto = async (req, res) => {
//   try {
//     const placeId = req.params.place_id;
//     const entityId = req.params.item_id;
//     const photoId = req.params.photo_id;
//     await reviewModel.deleteById(entityId, placeId, photoId);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

module.exports = {
  getList,
  get,
  create,
  update,
  // addPhoto,
  // removePhoto,
  remove,
};
