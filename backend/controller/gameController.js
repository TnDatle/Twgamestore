const db = require("../config/firebase");

exports.getGamesByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const platformRef = db.collection("Game").doc(platform);
    const seriesCollections = await platformRef.listCollections();

    // chạy song song các series
    const results = await Promise.all(
      seriesCollections.map(async (series) => {
        const docs = await series.listDocuments();
        // chạy song song các docs
        const snaps = await Promise.all(docs.map((doc) => doc.get()));

        return snaps
          .filter((snap) => snap.exists)
          .map((snap) => ({
            id: snap.id,
            series: series.id,
            platform,
            ...snap.data(),
          }));
      })
    );

    // gộp mảng con lại
    res.json(results.flat());
  } catch (err) {
    console.error("❌ Firestore error (/games):", err);
    res.status(500).json({ error: err.message });
  }
};

