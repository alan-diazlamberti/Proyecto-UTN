var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  req.session.destroy();
  res.render("admin/login", {
    layout: "admin/layoutLogin",
  });
});

module.exports = router;
