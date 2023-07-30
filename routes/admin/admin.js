var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("/admin", {
    layout: "admin/layoutAdmin",
    usuario: req.session.nombre,
  });
});

module.exports = router;
