const genericModel = require('../models');

const entities = [
  'AppSettings',
  'cuisines',
  'feedbacks',
  'index-places',
  'lists',
  'photo-reports',
  'place-add-suggestions',
  'place-edit-suggestions',
  'places',
  'profiles',
  'reports',
];

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
    const response = await genericModel.getList(collectionName, undefined, undefined);
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
