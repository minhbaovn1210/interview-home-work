var express = require("express");
var passport = require("passport");
var router = express.Router();

var postController = require("../controller/post");

router
  .post(
    "/",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    postController.create
  )
  .get(
    "/",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    postController.getAll
  )
  .post(
    "/add-comment",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    postController.addComment
  )
  .get(
    "/get-detail",
    passport.authenticate("blog-jwt-service", {
      session: false
    }),
    postController.getDetail
  );

module.exports = router;
