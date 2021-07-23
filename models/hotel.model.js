const sqlConn = require("./db.js");

class Hotel {
  constructor(hotel) {
    this.HotelID = hotel.HotelID;
    this.Name = hotel.Name;
    this.Rating = hotel.Rating;
    this.PriceNight = hotel.PriceNight;
    this.Description = hotel.Description;
    this.PriceAllInclusive = hotel.PriceAllInclusive;
    this.Popularity = hotel.Popularity;
    this.CityID = hotel.CityID;
  }

  static getAllByCityId = (cityId, result) => {
    sqlConn.query(
      `SELECT *
        FROM Hotels
        WHERE CityID = ${cityId}`,
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

  static findById = (hotelId, result) => {
    sqlConn.query(
      `SELECT *
        FROM Hotels 
        WHERE HotelID = ${hotelId}`,
      (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        if (res.length) {
          result(null, res);
          return;
        }
        result({ type: "not_found" }, null);
      }
    );
  };

  static updatePopularityById = (hotelId, result) => {
    sqlConn.query(
      `UPDATE Hotels, (SELECT Popularity FROM Hotels WHERE HotelID = ${hotelId}) as P
        SET Hotels.Popularity = P.Popularity + 1
        WHERE HotelID = ${hotelId};`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          result({ type: "not_found" }, null);
          return;
        }
        this.findById(hotelId, (error, data) => {
          result(error, data);
        });
      }
    );
  };
}

module.exports = Hotel;
