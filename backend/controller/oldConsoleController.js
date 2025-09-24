const db = require("../config/firebase");

exports.getOldConsoleByPlatform = async (req, res) => {
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
};
