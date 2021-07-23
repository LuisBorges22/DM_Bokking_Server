const City = require("../models/city.model.js");

exports.findAll = (req, res) => {
  City.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Error ocurred while retrieving cities.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const { cityId } = req.params;
  City.findById(cityId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found City with Id ${cityId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving City with Id ${cityId}`,
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

  City.updatePopularityById(req.params.cityId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found City with id ${req.params.cityId}.`,
        });
      } else {
        res.status(500).send({
          message: err || "Error updating City with id " + req.params.cityId,
        });
      }
    } else res.send(data);
  });
};
