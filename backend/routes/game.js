const express = require("express");
const router = express.Router();
const { getGamesByPlatform } = require("../controller/gameController");

router.get("/:platform", getGamesByPlatform);

module.exports = router;
