const User = require("../models/user.model.js");

exports.findAll = (req, res) => {
  User.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Error ocurred while retrieving users.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (error, data) => {
    if (error) {
      if (error.type === "not_found") {
        res.status(404).send({
          message: `Not found User with Id ${userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with Id ${userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.signIn = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Username and Password can not be empty!",
    });
  }

  const user = new User({
    Username: req.body.Username,
    Password: req.body.Password,
  });

  User.signIn(user, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(401).send({
          message: `User not found with these credentials`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while signing in the User.",
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

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(req.body.Password)) {
    res.status(406).send({
      message: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase",
    });
    return;
  }

  const user = new User({
    Username: req.body.Username,
    Password: req.body.Password,
    Name: req.body.Name,
    City: req.body.City,
    Country: req.body.Country,
    Description: req.body.Description,
    Email: req.body.Email,
    Number: req.body.Number,
  });
  
  User.create(user, (err, data) => {
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

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(req.body.NewPassword)) {
    res.status(406).send({
      message: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase",
    });
    return;
  }

  User.updateById(req.params.userId, req.body, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(401).send({
          message: `Password is incorrect.`,
        });
      } else {
        res.status(500).send({
          message: err || "Error updating User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
