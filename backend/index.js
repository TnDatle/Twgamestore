const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000;

// ================== FIREBASE INIT ==================
let serviceAccount;
try {
  serviceAccount = require("./serviceAccountKey.json");
} catch (err) {
  console.error("❌ Không tìm thấy serviceAccountKey.json");
  process.exit(1); // dừng server luôn
}

// Chỉ init 1 lần để tránh lỗi khi nodemon reload
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin đã khởi tạo bằng serviceAccountKey.json");
}

const db = admin.firestore();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================

// Test API
app.get("/", (req, res) => {
  res.send("✅ Backend TWGameStore running!");
});

// Test kết nối Firestore
app.get("/ping-firestore", async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({
      ok: true,
      collections: collections.map((c) => c.id),
    });
  } catch (err) {
    console.error("❌ Firestore connect fail:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================== GAMES ================== */
app.get("/games/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    console.log("📌 Platform:", platform);

    const platformRef = db.collection("Game").doc(platform);
    const seriesCollections = await platformRef.listCollections();

    let results = [];

    for (const series of seriesCollections) {
      const docs = await series.listDocuments();
      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          results.push({
            id: doc.id,
            series: series.id,
            platform,
            ...snap.data(),
          });
        }
      }
    }

    console.log(`✅ Trả về ${results.length} games`);
    res.json(results);
  } catch (err) {
    console.error("❌ Firestore error (/games):", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================== CONSOLE ================== */
app.get("/console/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("Console").doc(platform);
    const modelCollections = await platformRef.listCollections();

    let results = [];

    for (const model of modelCollections) {
      const docs = await model.listDocuments();
      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          results.push({
            id: doc.id,
            model: model.id,
            platform,
            ...snap.data(),
          });
        }
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Firestore error (/console):", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================== OLD CONSOLE ================== */
app.get("/oldconsole/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("OldConsole").doc(platform);
    const modelCollections = await platformRef.listCollections();

    let results = [];

    for (const model of modelCollections) {
      const docs = await model.listDocuments();
      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          const data = snap.data();
          if (data.Name && data.Images) {
            results.push({
              id: doc.id,
              model: model.id,
              platform,
              ...data,
            });
          }
        }
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Firestore error (/oldconsole):", err);
    res.status(500).json({ error: err.message });
  }
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
