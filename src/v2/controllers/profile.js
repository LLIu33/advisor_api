const db = require('../models');
const Profile = db.Profile;
const helper = require('./helper');

const getList = async (req, res) => {
  try {
    let { limit, offset, ...filter } = req.query;
    limit = helper.processLimit(limit);
    offset = helper.processOffset(offset);
    filter = helper.processFilter(filter);

    const profiles = await Profile.findAll({ where: filter });
    const response = {
      profiles,
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
    const response = await Profile.findOne({ where: { uid: entityId } });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    await Profile.create(newData);
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
    await Profile.update(newData, {
      where: { uid: entityId },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// const getPhotos = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const response = await profileModel.getPhotosById(entityId);
//     return res.status(200).send(response);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

// const getReviews = async (req, res) => {
//   try {
//     const entityId = req.params.item_id;
//     const response = await profileModel.getReviewsById(entityId);
//     return res.status(200).send(response);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// };

module.exports = {
  getList,
  get,
  // getPhotos,
  // getReviews,
  create,
  update,
};
