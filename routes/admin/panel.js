var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin/panel", {
    layout: "admin/layoutAdmin",
    // usuario: req.session.username,
  });
});

module.exports = router;
