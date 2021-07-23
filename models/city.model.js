const sqlConn = require("./db.js");

class City {
  constructor(city) {
    this.CityID = city.CityID;
    this.City = city.City;
    this.Country = city.Country;
    this.Popularity = city.Popularity;
  }

  static getAll = (result) => {
    sqlConn.query(
      `SELECT CityID, City, Country, Popularity
          FROM Cities
          ORDER BY Popularity DESC`,
      (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        result(null, res);
      }
    );
  };

  static findById = (cityId, result) => {
    sqlConn.query(
      `SELECT CityID, City, Country, Popularity
        FROM Cities 
        WHERE CityID = ${cityId}`,
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

  static updatePopularityById = (cityId, result) => {
    sqlConn.query(
      `UPDATE Cities, (SELECT Popularity FROM Cities WHERE CityID = ${cityId}) as P
        SET Cities.Popularity = P.Popularity + 1
        WHERE CityID = ${cityId};`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          result({ type: "not_found" }, null);
          return;
        }
        this.findById(cityId, (error, data) => {
          result(error, data);
        });
      }
    );
  };
}

module.exports = City;
