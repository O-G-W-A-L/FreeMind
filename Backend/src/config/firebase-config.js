const admin = require('firebase-admin');
const path = require('path');

// Set up Firebase Admin SDK with the service account key file
const serviceAccount = require(path.join(__dirname, '../../serviceaccountkey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://freemind-2dd3d-default-rtdb.europe-west1.firebasedatabase.app", // Your Firebase Realtime Database URL
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
