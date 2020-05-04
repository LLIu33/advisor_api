const listModel = require('../services/list');
const helper = require('./helper');

const getCollection = async (req, res, next) => {
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
    next(error);
  }
};

const getPlacesByListId = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const response = await listModel.getPlacesByListId(entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const response = await listModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newData = req.body;
    const response = await listModel.create(newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    const response = await listModel.updateById(entityId, newData);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const addPlacesToList = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const newPlaces = req.body.placeIds;
    const response = await listModel.addPlacesToList(entityId, newPlaces);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const removePlaceFromList = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    const placeId = req.params.place_id;
    const response = await listModel.removePlaceFromList(entityId, placeId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const entityId = req.params.item_id;
    await listModel.deleteById(entityId);
    return res.status(200).send();
  } catch (error) {
    next(error);
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
