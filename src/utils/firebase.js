const firebaseAdmin = require('firebase-admin');

let db = null;
let admin = null;

const initDb = () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('binary').replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  admin = firebaseAdmin;
  const firestore = firebaseAdmin.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  db = firestore;
  return firestore;
};

const getDb = () => {
  if (!db) {
    initDb();
  }
  return db;
};

const getAdmin = () => {
  if (!admin) {
    initDb();
  }
  return admin;
};

module.exports = {
  getDb,
  getAdmin,
};
