require("dotenv").config();

var passport = require("passport");
var ExtractJwt = require("passport-jwt").ExtractJwt;
var Strategy = require("passport-jwt").Strategy;

var userModel = require("../models/user");

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRED
};

passport.use(
  "blog-jwt-service",
  new Strategy(jwtOptions, function(jwt_payload, done) {
    userModel.findOne({ _id: jwt_payload.id }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
