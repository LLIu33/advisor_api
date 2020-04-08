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
    return res.status(500).send(error);
  }
};
const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await listModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const create = async (req, res) => {
  try {
    const newData = req.body;
    await listModel.create(newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = req.body;
    await listModel.updateById(entityId, newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await listModel.deleteById(entityId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getCollection,
  get,
  create,
  update,
  remove,
};
