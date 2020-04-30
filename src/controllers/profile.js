const profileModel = require('../models/profile');
const helper = require('./helper');

const getList = async (req, res, next) => {
  try {
    const { limit, offset, ...filterParams } = req.query;
    const params = {
      limit: helper.processLimit(limit),
      offset: helper.processOffset(offset),
      filter: helper.processFilter(filterParams),
    };

    const response = await profileModel.getListOfProfiles(params);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getPhotos = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getPhotosById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getReviewsById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newData = req.body;
    const response = await profileModel.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await profileModel.updateById(entityId, newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
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
