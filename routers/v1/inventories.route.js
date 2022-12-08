const express = require("express");
const api = require("../../controllers/inventories.controllers");
const router = express.Router();

router.route("/").get(api.getInventories);

module.exports = router;
