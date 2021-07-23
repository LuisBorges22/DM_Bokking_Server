const sqlConn = require("./db.js");

class Review {
  constructor(review) {
    this.ReviewID = review.ReviewID;
    this.Body = review.Body;
    this.Date = review.Date;
    this.HotelID = review.HotelID;
    this.UserID = review.UserID;
  }

  static getAllByHotelId = (hotelId, result) => {
    sqlConn.query(
      `SELECT *
        FROM Reviews
        WHERE HotelID = ${hotelId}`,
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

  static getAllByUserId = (userId, result) => {
    sqlConn.query(
      `SELECT *
        FROM Reviews
        WHERE UserID = ${userId}`,
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

  static findById = (reviewId, result) => {
    sqlConn.query(
      `SELECT *
      FROM Reviews 
      WHERE ReviewID = ${reviewId}`,
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

  static create = (review, result) => {
    sqlConn.query("INSERT INTO Reviews SET ?", review, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      this.findById(res.insertId, (error, data) => {
        result(error, data);
      });
    });
  };

  static updateBodyById = (reviewId, review, result) => {
    sqlConn.query(
      `UPDATE Reviews 
      SET Body = ? 
      WHERE ReviewID = ?`,
      [review.Body, reviewId],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          result({ type: "not_found" }, null);
          return;
        }
        this.findById(reviewId, (error, data) => {
          result(error, data);
        });
      }
    );
  };

  static remove = (reviewId, result) => {
    sqlConn.query("DELETE FROM Reviews WHERE ReviewID = ?", reviewId, (err, res) => {
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
    });
  };

}

module.exports = Review;
