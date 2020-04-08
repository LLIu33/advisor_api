const profileModel = require('../models/profile');
const helper = require('./helper');

const getList = async (req, res) => {
  try {
    const { limit, offset, ...filterParams } = req.query;
    const params = {
      limit: helper.processLimit(limit),
      offset: helper.processOffset(offset),
      filter: helper.processFilter(filterParams),
    };

    const response = await profileModel.getProfileOfProfiles(params);
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
const create = async (req, res) => {
  try {
    const newData = req.body;
    await profileModel.create(newData);
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
    await profileModel.updateById(entityId, newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await profileModel.deleteById(entityId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getList,
  get,
  create,
  update,
  remove,
};
