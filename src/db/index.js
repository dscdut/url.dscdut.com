const firebase = require('firebase-admin');
const serviceKey = require('./service_key.json');

const db = firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey),
});

module.exports = db.firestore();

