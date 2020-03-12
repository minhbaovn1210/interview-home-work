var express = require("express");
var passport = require("passport");
var router = express.Router();

var userController = require("../controller/user");

router
  .post("/login", userController.login)
  .post("/register", userController.register)
  .get(
    "/profile",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    userController.getUserProfile
  )
  .post(
    "/edit",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    userController.editUserProfile
  );

module.exports = router;
