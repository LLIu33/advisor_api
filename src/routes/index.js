const express = require('express');
const uuid = require('uuid/v4');
const firebase = require('../utils/firebase');

const rootRouter = express.Router(); // eslint-disable-line new-cap

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

const db = firebase.getDb();

entities.forEach(function (collectionName) {
  const router = express.Router(); // eslint-disable-line new-cap
  // create
  router.post('/', (req, res) => {
    (async () => {
      try {
        const newData = req.body;
        await db
          .collection(collectionName)
          .doc('/' + uuid() + '/')
          .create(newData);
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // read item
  router.get('/:item_id', (req, res) => {
    (async () => {
      try {
        const document = db.collection(collectionName).doc(req.params.item_id);
        const item = await document.get();
        const response = item.data();
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // read all
  router.get('/', (req, res) => {
    (async () => {
      try {
        const query = db.collection(collectionName);
        const querySnapshot = await query.orderBy('id').limit(10).offset(0).get();
        const response = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // update
  router.put('/:item_id', (req, res) => {
    (async () => {
      try {
        const document = db.collection(collectionName).doc(req.params.item_id);
        const newData = req.body;
        await document.update(newData);
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // delete
  router.delete('/:item_id', (req, res) => {
    (async () => {
      try {
        const document = db.collection(collectionName).doc(req.params.item_id);
        await document.delete();
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  rootRouter.use(`/api/${collectionName}`, router);
});

module.exports = rootRouter;
