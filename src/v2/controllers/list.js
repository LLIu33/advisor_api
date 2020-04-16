const db = require('../models');
const List = db.List;
const Place = db.Place;
const helper = require('./helper');

const getCollection = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    const lists = await List.findAll({ where: filter });
    const response = {
      lists,
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
    const response = await List.findOne({ where: { uid: entityId } });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    await List.create(newData);
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
    await List.update(newData, {
      where: { uid: entityId },
    });
    return res.status(200).send();
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

// const getPlacesByListId = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const response = await List.findOne({ where: { uid: entityId }, include: [{ model: Place }] });
//     return res.status(200).send(response);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

// const addPlacesToList = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const newPlaces = req.body;
//     await List.addPlacesToList(entityId, newPlaces);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

// const removePlaceFromList = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const placeId = req.params.place_id;
//     await List.removePlaceFromList(entityId, placeId);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

module.exports = {
  getCollection,
  get,
  // getPlacesByListId,
  create,
  update,
  // addPlacesToList,
  // removePlaceFromList,
  remove,
};
