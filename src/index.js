const admin = require('firebase-admin');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('binary'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = admin.firestore();

const entities = ['places', 'reviews', 'profiles', 'lists'];

entities.forEach(function (collectionName) {
  const router = express.Router(); // eslint-disable-line new-cap
  // create
  router.post('/', (req, res) => {
    (async () => {
      try {
        await db
          .collection(collectionName)
          .doc('/' + req.body.item_id + '/')
          .create({ item: req.body.item });
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
        const querySnapshot = await query.get();
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

  app.use(`/api/${collectionName}`, router);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('An error occurred');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
