const genericModel = require('../models');

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
    let limit = parseInt(req.query.limit) || 10;
    limit = limit >= 0 ? limit : 0;
    limit = limit <= 100 ? limit : 100;
    const offset = parseInt(req.query.offset) || 0;
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

module.exports = {
  createEntity,
  getEntity,
  getListOfEntity,
  updateEntity,
  delteEntity,
};
