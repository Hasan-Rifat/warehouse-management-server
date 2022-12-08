const express = require("express");
const router = express.Router();
const api = require("../../controllers/order.comtrollers");

router.route("/").get(api.getOrder);

module.exports = router;
