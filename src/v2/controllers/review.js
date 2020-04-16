const db = require('../models');
const Review = db.Review;
const helper = require('./helper');

const getList = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    const lists = await Review.findAll({ where: filter });
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
    const response = await Review.findOne({ where: { uid: entityId } });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    await Review.create(newData);
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
    await Review.update(newData, {
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
    await Review.destroy({
      where: { uid: entityId },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// const addPhoto = async (req, res) => {
//   try {
//     const placeId = req.params.place_id;
//     const entityId = req.params.item_id;
//     const photoObj = req.body;
//     await reviewModel.updateById(entityId, placeId, photoObj);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

// const removePhoto = async (req, res) => {
//   try {
//     const placeId = req.params.place_id;
//     const entityId = req.params.item_id;
//     const photoId = req.params.photo_id;
//     await reviewModel.deleteById(entityId, placeId, photoId);
//     return res.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

module.exports = {
  getList,
  get,
  create,
  update,
  // addPhoto,
  // removePhoto,
  remove,
};
