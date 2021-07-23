const sqlConn = require("./db.js");

class User {
  constructor(user) {
    this.UserID = user.UserID;
    this.Username = user.Username;
    this.Password = user.Password;
    this.Name = user.Name;
    this.City = user.City;
    this.Country = user.Country;
    this.Description = user.Description;
    this.Email = user.Email;
    this.Number = user.Number;
  }

  static getAll = (result) => {
    sqlConn.query(
      `SELECT UserID, Username, Name, City, Country, Description, Email, Number 
      FROM Users`,
      (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        result(null, res);
      }
    );
  };

  static findById = (userId, result) => {
    sqlConn.query(
      `SELECT UserID, Username, Name, City, Country, Description, Email, Number
      FROM Users 
      WHERE UserID = ${userId}`,
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

  static signIn = (userCredentials, result) => {
    const query = `SELECT UserID, Username, Name, City, Country, Description, Email, Number
    FROM Users 
    WHERE Username = '${userCredentials.Username}' AND Password = '${userCredentials.Password}'`;
    sqlConn.query(query, (error, res) => {
      if (error) {
        result(error, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      result({ type: "not_found" }, null);
    });
  };

  static create = (user, result) => {
    sqlConn.query("INSERT INTO Users SET ?", user, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      this.findById(res.insertId, (error, data) => {
        result(error, data);
      });
    });
  };

  static updateById = (userId, user, result) => {
    // nao mostra quando tem erro na pass antiga
    sqlConn.query(
      `UPDATE Users 
      SET Username = ?, Password = ?, Name = ?, City = ?, Country = ?, Description = ?, Email = ?, Number = ? 
      WHERE UserID = ? AND Password = ?`,
      [
        user.Username,
        user.NewPassword,
        user.Name,
        user.City,
        user.Country,
        user.Description,
        user.Email,
        user.Number,
        userId,
        user.OldPassword,
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
        this.findById(userId, (error, data) => {
          result(error, data);
        });
      }
    );
  };

  static remove = (userId, result) => {
    sqlConn.query("DELETE FROM Users WHERE UserID = ?", userId, (err, res) => {
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

module.exports = User;
