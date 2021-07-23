var express = require("express");
var router = express.Router();
const reviewController = require("../controllers/review.controller.js");

router.get("/hotelId=:hotelId", function (req, res, next) {
  reviewController.findAllByHotel(req, res);
});

router.get("/userId=:userId", function (req, res, next) {
  reviewController.findAllByUser(req, res);
});

router.get("/:reviewId", function (req, res, next) {
  reviewController.findOne(req, res);
});

router.post("/", function (req, res, next) {
  reviewController.create(req, res);
});

router.put("/:reviewId", function (req, res, next) {
  reviewController.updateBody(req, res);
});

router.delete("/:reviewId", function (req, res, next) {
  reviewController.delete(req, res);
});

module.exports = router;