const express = require("express");
const router = express.Router();
const { getOldConsoleByPlatform } = require("../controller/oldConsoleController");

router.get("/:platform", getOldConsoleByPlatform);

module.exports = router;
