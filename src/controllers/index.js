const genericModel = require('../models');

const MIN_LIMIT = 1;
const MAX_LIMIT = 1000;
const DEFAULT_OFFSET = 0;

const createEntity = async (req, res) => {
  try {
    const newData = req.body;
    const collectionName = req.params.collection;
    await genericModel.create(collectionName, newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const getEntity = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    const response = await genericModel.getById(collectionName, entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const getListOfEntity = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const limit = processLimitParameter(req.query.limit);
    const offset = parseInt(req.query.offset) || DEFAULT_OFFSET;
    const response = await genericModel.getList(collectionName, limit, offset);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const updateEntity = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    const newData = req.body;
    await genericModel.updateById(collectionName, entityId, newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const delteEntity = async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const entityId = req.params.item_id;
    await genericModel.deleteById(collectionName, entityId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

function processLimitParameter(input) {
  let limit = parseInt(input) || 100;
  limit = limit >= MIN_LIMIT ? limit : MIN_LIMIT;
  limit = limit <= MAX_LIMIT ? limit : MAX_LIMIT;
  return limit;
}

module.exports = {
  createEntity,
  getEntity,
  getListOfEntity,
  updateEntity,
  delteEntity,
};
