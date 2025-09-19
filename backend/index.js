const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const admin = require("firebase-admin");
require("dotenv").config(); // Load biến môi trường từ .env

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend TWGameStore running!");
});

// 🔹 API lấy game theo platform (PS4, PS5, Switch, ...)
app.get("/games/:platform", async (req, res) => {
  try {
    const { platform } = req.params; // ví dụ: "PS4"
    const platformRef = db.collection("Game").doc(platform);

    // Lấy tất cả series trong platform (FIFA, PES, ...)
    const seriesCollections = await platformRef.listCollections();

    let results = [];

    for (const series of seriesCollections) {
      // Lấy tất cả games trong series (FF23, PES21, ...)
      const docs = await series.listDocuments();

      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          results.push({
            id: doc.id,        // "FF23"
            series: series.id, // "FIFA"
            platform,          // "PS4"
            ...snap.data(),    // { Name, Image, Price }
          });
        }
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Lỗi khi query Firestore:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 API lấy console theo platform (PS4, PS5, ...)
app.get("/console/:platform", async (req, res) => {
  try {
    const { platform } = req.params; // ví dụ: "PS4"
    const platformRef = db.collection("Console").doc(platform);

    // Lấy tất cả loại máy (Slim, Pro, ...)
    const modelCollections = await platformRef.listCollections();

    let results = [];

    for (const model of modelCollections) {
      // Lấy tất cả document trong model (Slim -> docs)
      const docs = await model.listDocuments();

      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          results.push({
            id: doc.id,       // ID doc
            model: model.id,  // Slim, Pro,...
            platform,         // PS4, PS5,...
            ...snap.data(),   // { Name, Price, Images }
          });
        }
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Lỗi khi query Firestore:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔹 API lấy old console theo platform (PS4, PS5, ...)
app.get("/oldconsole/:platform", async (req, res) => {
  try {
    const { platform } = req.params; // ví dụ: "PS4"
    const platformRef = db.collection("OldConsole").doc(platform);

    // Lấy tất cả model (Slim, Pro, ... trong OldConsole)
    const modelCollections = await platformRef.listCollections();

    let results = [];

    for (const model of modelCollections) {
      // Lấy tất cả document trong model (Slim -> docs)
      const docs = await model.listDocuments();

      for (const doc of docs) {
        const snap = await doc.get();
        if (snap.exists) {
          const data = snap.data();

          // Chỉ push nếu có đủ dữ liệu cần thiết
          if (data.Name && data.Images) {
            results.push({
              id: doc.id,       // ID doc
              model: model.id,  // Slim, Pro,...
              platform,         // PS4, PS5,...
              ...data           // { Name, Price, Images }
            });
          }
        }
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Lỗi khi query Firestore (OldConsole):", err);
    res.status(500).json({ error: err.message });
  }
});



app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
