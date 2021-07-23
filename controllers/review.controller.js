const { NotFound } = require("http-errors");
const Review = require("../models/review.model.js");

exports.findAllByHotel = (req, res) => {
  const { hotelId } = req.params;
  Review.getAllByHotelId(hotelId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Reviews from Hotel with Id ${hotelId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Reviews from Hotel with Id ${hotelId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findAllByUser = (req, res) => {
  const { userId } = req.params;
  Review.getAllByUserId(userId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Reviews from User with Id ${userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Reviews from User with Id ${userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const { reviewId } = req.params;
  Review.findById(reviewId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Review with Id ${reviewId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Review with Id ${reviewId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    const review = new Review({
      Body: req.body.Body,
      Date: new Date().toISOString().slice(0, 10),
      HotelID: req.body.HotelID,
      UserID: req.body.UserID,
    });
    
    Review.create(review, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message,
        });
      else res.send(data);
    });
  };

  exports.updateBody = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    Review.updateBodyById(req.params.reviewId, req.body, (err, data) => {
      if (err) {
        if (err.type === "not_found") {
          res.status(404).send({
            message: `Not found Review with id ${req.params.reviewId}.`,
          });
        } else {
          res.status(500).send({
            message: err || "Error updating Review with id " + req.params.reviewId,
          });
        }
      } else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    Review.remove(req.params.reviewId, (err, data) => {
      if (err) {
        if (err.type === "not_found") {
          res.status(404).send({
            message: `Not found Review with id ${req.params.reviewId}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete Review with id " + req.params.reviewId,
          });
        }
      } else res.send({ message: `Review was deleted successfully!` });
    });
  };
  
