const placeModel = require('../models/place');

const MIN_LIMIT = 1;
const MAX_LIMIT = 1000;
const DEFAULT_OFFSET = 0;

const getList = async (req, res) => {
  try {
    const isUnlim = req.query.unlim;
    const limit = processLimitParameter(req.query.limit);
    const offset = parseInt(req.query.offset) || DEFAULT_OFFSET;

    const response = await placeModel.getListOfPlaces(limit, offset, isUnlim);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await placeModel.getById(entityId);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const create = async (req, res) => {
  try {
    const newData = req.body;
    await placeModel.create(newData);
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
    await placeModel.updateById(entityId, newData);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await placeModel.deleteById(entityId);
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
  getList,
  get,
  create,
  update,
  remove,
};
