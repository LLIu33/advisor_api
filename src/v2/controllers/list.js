const db = require('../models');
const List = db.List;
const Place = db.Place;
const { Op } = require('sequelize');
const helper = require('./helper');
const { jsonToList, listToJson } = require('../mappers/list');

const getCollection = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    const lists = await List.findAll({ where: filter, include: { model: db.Place, as: 'places' } });
    const response = {
      lists: lists.map((item) => listToJson(item)),
      limit,
      offset,
    };
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await List.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(listToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = jsonToList(req.body);
    const list = await List.create(newData);

    if (req.body.placeListItems && req.body.placeListItems.length > 0) {
      const placeIds = req.body.placeListItems.map((item) => item.placeId);
      const places = await Place.findAll({
        where: {
          uid: {
            [Op.in]: placeIds,
          },
        },
      });
      await list.setPlaces(places);
    }
    const response = await List.findOne({ where: { uid: list.uid }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(listToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const newData = jsonToList(req.body);
    const list = await List.findOne({ where: { uid: entityId } });
    await list.update(newData);

    if (req.body.placeListItems && req.body.placeListItems.length > 0) {
      const placeIds = req.body.placeListItems.map((item) => item.placeId);
      const places = await Place.findAll({
        where: {
          uid: {
            [Op.in]: placeIds,
          },
        },
      });
      await list.setPlaces([]);
      await list.setPlaces(places);
    }

    const response = await List.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    return res.status(200).send(listToJson(response));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    await List.destroy({
      where: { uid: entityId },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getPlacesByListId = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const response = await List.findOne({ where: { uid: entityId }, include: [{ model: Place }] });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addPlacesToList = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const placeIds = req.body.placeIds;
    const list = await List.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    await list.addPlaces(placeIds);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const removePlaceFromList = async (req, res) => {
  try {
    const entityId = req.params.item_id;
    const placeId = req.params.place_id;
    const list = await List.findOne({ where: { uid: entityId }, include: { model: db.Place, as: 'places' } });
    await list.removePlace(placeId);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
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
