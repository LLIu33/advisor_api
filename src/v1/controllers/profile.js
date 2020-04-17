const profileModel = require('../services/profile');
const helper = require('./helper');

const getList = async (req, res) => {
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
    console.log(error);
    return res.status(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getPhotos = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getPhotosById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await profileModel.getReviewsById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    const response = await profileModel.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await profileModel.updateById(entityId, newData);
    return res.status(200).send(response);
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
