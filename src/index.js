const admin = require('firebase-admin');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fobe-id.firebaseio.com',
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
        const query = db.collection('items');
        const response = [];
        await query.get().then((querySnapshot) => {
          const docs = querySnapshot.docs;
          for (const doc of docs) {
            const selectedItem = {
              id: doc.id,
              item: doc.data().item,
            };
            response.push(selectedItem);
          }
          return response;
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
        await document.update({
          item: req.body.item,
        });
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

  app.use(`/${collectionName}`, router);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('An error occurred');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
