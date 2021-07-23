var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller.js");

router.get("/", function (req, res, next) {
  userController.findAll(req, res);
});

router.get("/:userId", function (req, res, next) {
  userController.findOne(req, res);
});

router.post("/signin", function (req, res, next) {
  userController.signIn(req, res);
});

router.post("/", function (req, res, next) {
  userController.create(req, res);
});

router.put("/:userId", function (req, res, next) {
  userController.update(req, res);
});

router.delete("/:userId", function (req, res, next) {
  userController.delete(req, res);
});

module.exports = router;