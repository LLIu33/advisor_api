const placeModel = require('../models/place');
const helper = require('./helper');

const getAllplaces = async (req, res) => {
  try {
    const response = await placeModel.getAll();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const getList = async (req, res) => {
  try {
    const { limit, offset, ...filterParams } = req.query;
    const params = {
      limit: helper.processLimit(limit),
      offset: helper.processOffset(offset),
      filter: helper.processFilter(filterParams),
    };

    const response = await placeModel.getListOfPlaces(params);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const getByIds = async (req, res) => {
  try {
    const ids = req.query.ids;
    const response = await placeModel.getPlacesByIds(ids);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await placeModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    const response = await placeModel.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await placeModel.updateById(entityId, newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const addPhotoToPlace = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const photoObj = req.body;
    const response = await placeModel.addPhotoToPlace(entityId, photoObj);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await placeModel.deleteById(entityId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

module.exports = {
  getAllplaces,
  getList,
  get,
  getByIds,
  create,
  update,
  addPhotoToPlace,
  remove,
};
