const firebase = require('firebase-admin');
const { SERVICE_KEY_PATH } = require('@env');

// const serviceKey = require('./service_key.json');
// The secret file is placed in the root directory of the project by default in Render
// ref: https://render.com/docs/configure-environment-variables#secret-files
const serviceKey = require(SERVICE_KEY_PATH);

const db = firebase.initializeApp({
	credential: firebase.credential.cert(serviceKey),
});

db.firestore().settings({ ignoreUndefinedProperties: true });
module.exports = db.firestore();
