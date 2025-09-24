const express = require("express");
const cors = require("cors");

const gamesRoutes = require("./routes/game");
const consolesRoutes = require("./routes/console");
const oldConsolesRoutes = require("./routes/oldconsole");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test
app.get("/", (req, res) => {
  res.send("✅ Backend TWGameStore running!");
});

// Ping Firestore
const db = require("./config/firebase");
app.get("/ping-firestore", async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({
      ok: true,
      collections: collections.map(c => c.id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/games", gamesRoutes);
app.use("/console", consolesRoutes);
app.use("/oldconsole", oldConsolesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
