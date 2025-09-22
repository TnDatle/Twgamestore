const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

let db;

// ================== FIREBASE INIT ==================
if (process.env.NODE_ENV === "production") {
  // 👉 Dùng ENV khi deploy (Vercel)
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey?.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });

  console.log("🔥 [Production] Firebase bằng ENV");
} else {
  // 👉 Local dev dùng file JSON
  const serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("🔥 [Local] Firebase bằng serviceAccountKey.json");
}

db = admin.firestore();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================

// Test
app.get("/", (req, res) => {
  res.send("✅ Backend TWGameStore running!");
});

/* ================== GAMES ================== */
// Lấy game theo platform (tối ưu với Promise.all + get())
app.get("/games/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    console.log("📌 Fetching games for:", platform);

    const platformRef = db.collection("Game").doc(platform);
    const seriesCollections = await platformRef.listCollections();

    let results = [];

    await Promise.all(
      seriesCollections.map(async (series) => {
        const snaps = await series.get();
        snaps.forEach((doc) => {
          results.push({
            id: doc.id,
            series: series.id,
            platform,
            ...doc.data(),
          });
        });
      })
    );

    console.log(`✅ Found ${results.length} games`);
    res.json(results);
  } catch (err) {
    console.error("❌ Firestore error (/games):", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================== CONSOLE ================== */
// Lấy console theo platform
app.get("/console/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("Console").doc(platform);
    const modelCollections = await platformRef.listCollections();

    let results = [];

    await Promise.all(
      modelCollections.map(async (model) => {
        const snaps = await model.get();
        snaps.forEach((doc) => {
          results.push({
            id: doc.id,
            model: model.id,
            platform,
            ...doc.data(),
          });
        });
      })
    );

    res.json(results);
  } catch (err) {
    console.error("❌ Firestore error (/console):", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================== OLD CONSOLE ================== */
// Lấy old console theo platform
app.get("/oldconsole/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("OldConsole").doc(platform);
    const modelCollections = await platformRef.listCollections();

    let results = [];

    await Promise.all(
      modelCollections.map(async (model) => {
        const snaps = await model.get();
        snaps.forEach((doc) => {
          const data = doc.data();
          if (data.Name && data.Images) {
            results.push({
              id: doc.id,
              model: model.id,
              platform,
              ...data,
            });
          }
        });
      })
    );

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
