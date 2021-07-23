var express = require("express");
var router = express.Router();
const hotelController = require("../controllers/hotel.controller.js");

router.get("/city/:cityId", function (req, res, next) {
  hotelController.findAllByCity(req, res);
});

router.get("/:hotelId", function (req, res, next) {
  hotelController.findOne(req, res);
});

router.put("/:hotelId", function (req, res, next) {
  hotelController.updatePopularity(req, res);
});

module.exports = router;
