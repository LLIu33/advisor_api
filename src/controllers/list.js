const listModel = require('../models/list');
const helper = require('./helper');

const getCollection = async (req, res) => {
  try {
    const { limit, offset, ...filterParams } = req.query;
    const params = {
      limit: helper.processLimit(limit),
      offset: helper.processOffset(offset),
      filter: helper.processFilter(filterParams),
    };

    const response = await listModel.getCollectionOfLists(params);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const getPlacesByListId = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await listModel.getPlacesByListId(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await listModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    const response = await listModel.create(newData);
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
    const response = await listModel.updateById(entityId, newData);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const addPlacesToList = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newPlaces = req.body.placeIds;
    const response = await listModel.addPlacesToList(entityId, newPlaces);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const removePlaceFromList = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const placeId = req.params.place_id;
    const response = await listModel.removePlaceFromList(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await listModel.deleteById(entityId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.stack);
  }
};

module.exports = {
  getCollection,
  get,
  getPlacesByListId,
  create,
  update,
  addPlacesToList,
  removePlaceFromList,
  remove,
};
