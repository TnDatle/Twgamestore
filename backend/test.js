const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

(async () => {
  try {
    const collections = await db.listCollections();
    console.log("✅ Firestore OK, collections:", collections.map(c => c.id));
  } catch (err) {
    console.error("❌ Firestore connect fail:", err);
  }
})();
