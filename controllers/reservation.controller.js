const { NotFound } = require("http-errors");
const Reservation = require("../models/reservation.model.js");

exports.findAllByUser = (req, res) => {
  const {userId}  = req.params;
  Reservation.getAllByUserId(userId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Reservations from User with Id ${userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Reservations from User with Id ${userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const { reservationId } = req.params;
  Reservation.findById(reservationId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found Reservation with Id ${reservationId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Reservation with Id ${reservationId}`,
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

  console.log(req.body);
  if (req.body.Nights < 1) {
    res.status(400).send({
      message: "Reservation Nights cannot be less than 1",
    });
    return;
  }

 
  const reservation = new Reservation({
    Nights: req.body.Nights,
    RequestDate: new Date().toISOString().slice(0, 10),
    ReservationDate: req.body.ReservationDate,
    AllInclusive: req.body.AllInclusive,
    HotelID: req.body.HotelID,
    UserID: req.body.UserID,
  });
  console.log();

  Reservation.create(reservation, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (req.body.Nights < 1) {
    res.send({
      InvalidNights: "Reservation Nights cannot be less than 1",
    });
    return;
  }

  Reservation.updateById(req.params.reservationId, req.body, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Reservation with id ${req.params.reservationId}.`,
        });
      } else {
        res.status(500).send({
          message:
            err ||
            "Error updating Reservation with id " + req.params.reservationId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Reservation.remove(req.params.reservationId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Reservation with id ${req.params.reservationId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Reservation with id " + req.params.reservationId,
        });
      }
    } else res.send({ message: `Reservation was deleted successfully!` });
  });
};
