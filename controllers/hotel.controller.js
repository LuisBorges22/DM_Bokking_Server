const { NotFound } = require("http-errors");
const Hotel = require("../models/hotel.model.js");

exports.findAllByCity = (req, res) => {
  const { cityId } = req.params;
  Hotel.getAllByCityId(cityId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Hotels from City with Id ${cityId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Hotels from City with Id ${cityId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const { hotelId } = req.params;
  Hotel.findById(hotelId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Hotel with Id ${hotelId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Hotel with Id ${hotelId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.updatePopularity = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Hotel.updatePopularityById(req.params.hotelId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Hotel with id ${req.params.hotelId}.`,
        });
      } else {
        res.status(500).send({
          message: err || "Error updating Hotel with id " + req.params.hotelId,
        });
      }
    } else res.send(data);
  });
};
