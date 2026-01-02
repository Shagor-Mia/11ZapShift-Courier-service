const admin = require("firebase-admin");

if (!process.env.FIREBASE_ADMIN) {
  throw new Error("FIREBASE_ADMIN env variable missing");
}

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN, "base64").toString("utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
