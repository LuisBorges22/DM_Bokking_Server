const sqlConn = require("./db.js");

class Reservation {
  constructor(reservation) {
    this.ReservationID = reservation.ReservationID;
    this.Nights = reservation.Nights;
    this.RequestDate = reservation.RequestDate;
    this.ReservationDate = reservation.ReservationDate;
    this.AllInclusive = reservation.AllInclusive;
    this.HotelID = reservation.HotelID;
    this.UserID = reservation.UserID;
  }

  static getAllByUserId = (userId, result) => {
    sqlConn.query(
      `SELECT ReservationID, Nights, ReservationDate, AllInclusive, Name, PriceNight, PriceAllInclusive
        FROM Reservations, Hotels
        WHERE UserID = ${userId} AND Hotels.HotelID = Reservations.HotelID`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        console.log(res.length);
        if (res.length) {
          result(null, res);
          return;
        }
        result({ type: "not_found" }, null);
      }
    );
  };

  static findById = (reservationId, result) => {
    sqlConn.query(
      `SELECT *
      FROM Reservations 
      WHERE ReservationID = ${reservationId}`,
      (error, res) => {
        if (error) {
          result(error, null);
          return;
        }

        if (res.length) {
          result(null, res[0]);
          return;
        }
        result({ type: "not_found" }, null);
      }
    );
  };

  static create = (reservation, result) => {
    sqlConn.query("INSERT INTO Reservations SET ?", reservation, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log(res.insertId);
      this.findById(res.insertId, (error, data) => {
        result(error, data);
      });
    });
  };

  static updateById = (reservationId, reservation, result) => {
    sqlConn.query(
      `UPDATE Reservations
      SET Nights = ?, RequestDate = ?, ReservationDate = ?, AllInclusive = ?
      WHERE ReservationID = ?`,
      [
        reservation.Nights,
        new Date().toISOString().slice(0, 10),
        reservation.ReservationDate,
        reservation.AllInclusive,
        reservationId,
      ],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ type: "not_found" }, null);
          return;
        }
        this.findById(reservationId, (error, data) => {
          result(error, data);
        });
      }
    );
  };

  static remove = (reservationId, result) => {
    sqlConn.query(
      "DELETE FROM Reservations WHERE ReservationID = ?",
      reservationId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ type: "not_found" }, null);
          return;
        }
        result(null, res);
      }
    );
  };
}

module.exports = Reservation;
