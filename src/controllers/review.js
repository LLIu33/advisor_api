const reviewModel = require('../models/review');
const helper = require('./helper');

const getList = async (req, res) => {
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
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const get = async (req, res) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const response = await reviewModel.getById(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    const placeId = req.params.place_id;
    const response = await reviewModel.create(newData, placeId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const update = async (req, res) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await reviewModel.updateById(entityId, newData, placeId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const addPhoto = async (req, res) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const photoObj = req.body;
    const response = await reviewModel.updateById(entityId, placeId, photoObj);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const removePhoto = async (req, res) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const photoId = req.params.photo_id;
    const response = await reviewModel.deleteById(entityId, placeId, photoId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
  }
};

const remove = async (req, res) => {
  try {
    const placeId = req.params.place_id;
    const entityId = req.params.item_id;
    const response = await reviewModel.deleteById(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send([{ code: 500, message: 'Internal server error' }]);
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
