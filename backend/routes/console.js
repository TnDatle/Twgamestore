const express = require("express");
const router = express.Router();
const { getConsoleByPlatform } = require("../controller/consoleController");

router.get("/:platform", getConsoleByPlatform);

module.exports = router;
