const db = require("../config/firebase");

exports.getConsoleByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("Console").doc(platform);
    const modelCollections = await platformRef.listCollections();

    // chạy song song tất cả model
    const results = await Promise.all(
      modelCollections.map(async (model) => {
        const docs = await model.listDocuments();
        const snaps = await Promise.all(docs.map((doc) => doc.get()));

        return snaps
          .filter((snap) => snap.exists)
          .map((snap) => ({
            id: snap.id,
            model: model.id,
            platform,
            ...snap.data(),
          }));
      })
    );

    res.json(results.flat()); // gộp mảng 2D thành 1 mảng
  } catch (err) {
    console.error("❌ Firestore error (/console):", err);
    res.status(500).json({ error: err.message });
  }
};
