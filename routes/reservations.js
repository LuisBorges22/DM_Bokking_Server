var express = require("express");
var router = express.Router();
const reservationController = require("../controllers/reservation.controller.js");

router.get("/user/:userId", function (req, res, next) {
  reservationController.findAllByUser(req, res);
});

router.get("/:reservationId", function (req, res, next) {
  reservationController.findOne(req, res);
});

router.post("/", function (req, res, next) {
  reservationController.create(req, res);
});

router.put("/:reservationId", function (req, res, next) {
  reservationController.update(req, res);
});

router.delete("/:reservationId", function (req, res, next) {
  reservationController.delete(req, res);
});

module.exports = router;