const reviewModel = require('../models/review');
const helper = require('./helper');

const getList = async (req, res, next) => {
  try {
    const { limit, offset, ...filterParams } = req.query;
    const params = {
      placeId: req.params.place_id,
      limit: helper.processLimit(limit),
      offset: helper.processOffset(offset),
      filter: helper.processFilter(filterParams),
    };

    const response = await reviewModel.getListOfReviews(params);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const response = await reviewModel.getById(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newData = req.body;
    const placeId = req.params.place_id;
    const response = await reviewModel.create(newData, placeId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await reviewModel.updateById(entityId, newData, placeId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const addPhoto = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const photoObj = req.body;
    const response = await reviewModel.updateById(entityId, placeId, photoObj);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const removePhoto = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const photoId = req.params.photo_id;
    const response = await reviewModel.deleteById(entityId, placeId, photoId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const response = await reviewModel.deleteById(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  get,
  create,
  update,
  addPhoto,
  removePhoto,
  remove,
};
