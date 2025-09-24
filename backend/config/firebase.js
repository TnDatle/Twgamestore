const admin = require("firebase-admin");

let serviceAccount;
try {
  serviceAccount = require("../serviceAccountKey.json");
} catch (err) {
  console.error("❌ Không tìm thấy serviceAccountKey.json");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin đã khởi tạo");
}

const db = admin.firestore();
module.exports = db;
