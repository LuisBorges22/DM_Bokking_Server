var express = require("express");
var router = express.Router();
const cityController = require("../controllers/city.controller.js");

router.get("/", function (req, res, next) {
  cityController.findAll(req, res);
});

router.get("/:cityId", function (req, res, next) {
  cityController.findOne(req, res);
});

router.put("/:cityId", function (req, res, next) {
  cityController.updatePopularity(req, res);
});

module.exports = router;
