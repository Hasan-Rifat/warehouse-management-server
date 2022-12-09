const express = require("express");
const api = require("../../controllers/car.controllers");
const router = express.Router();

router.route("/").post(api.addNewCar);
router.route("/:id").get(api.getCar).put(api.carUpdate);

module.exports = router;
