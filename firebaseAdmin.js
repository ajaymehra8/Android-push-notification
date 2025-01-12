const admin = require("firebase-admin");

// Replace 'path-to-serviceAccountKey.json' with the path to your service account key file
const serviceAccount = require("./firebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
