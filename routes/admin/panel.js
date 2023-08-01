var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin/panel", {
    layout: "admin/layoutPanel",
    usuario: req.session.user,
  });
});

module.exports = router;
