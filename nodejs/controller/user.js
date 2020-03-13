var jwt = require("jsonwebtoken");
var moment = require("moment");
var userModel = require("../models/user");

exports.login = function(req, res) {
  const { username, password } = req.body;

  userModel.findOne({ username, password }, function(err, data) {
    if (err || !data) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    var token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED
    });

    res.status(200).json({
      accessToken: token
    });
  });
};

exports.register = function(req, res) {
  const { username, password, name, dob } = req.body;
  const formattedDOB = moment(dob, "DD/MM/YYYY").format("MM-DD-YYYY");

  userModel.create({ username, password, name, dob: formattedDOB }, function(
    err,
    data
  ) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    var token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED
    });

    res.status(200).json({
      accessToken: token
    });
  });
};

exports.getUserProfile = function(req, res) {
  const { _id } = req.user;

  userModel.findOne({ _id }, function(err, data) {
    if (err || !data) {
      return res.status(400).json({ message: "User is not found" });
    }

    res.status(200).json(data);
  });
};

exports.editUserProfile = function(req, res) {
  const { _id } = req.user;
  const formattedDOB = moment(req.body.dob, "DD/MM/YYYY").format("MM-DD-YYYY");

  userModel.findOneAndUpdate(
    { _id },
    { ...req.body, dob: formattedDOB },
    function(err, data) {
      if (err || !data) {
        return res.status(400).json({ message: "User is not found" });
      }

      res.status(200).json(data);
    }
  );
};
