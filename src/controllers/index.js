const genericModel = require('../models');
const helper = require('./helper');

const createEntity = async (req, res, next) => {
  try {
    const newData = req.body;
    const collectionName = req.params.collection;
    await genericModel.create(collectionName, newData);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
const getEntity = async (req, res, next) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    const response = await genericModel.getById(collectionName, entityId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const getListOfEntity = async (req, res, next) => {
  try {
    const collectionName = req.params.collection;
    const limit = helper.processLimit(req.query.limit);
    const offset = helper.processOffset(req.query.offset);
    const response = await genericModel.getList(collectionName, limit, offset);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
const updateEntity = async (req, res, next) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    const newData = req.body;
    await genericModel.updateById(collectionName, entityId, newData);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
const delteEntity = async (req, res, next) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    await genericModel.deleteById(collectionName, entityId);
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEntity,
  getEntity,
  getListOfEntity,
  updateEntity,
  delteEntity,
};
