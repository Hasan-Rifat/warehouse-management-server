const express = require("express");
const api = require("../../controllers/car.controllers");
const router = express.Router();

router.route("/:id").get(api.getAllCars);

module.exports = router;
