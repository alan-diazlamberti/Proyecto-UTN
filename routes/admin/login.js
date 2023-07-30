var express = require("express");
var router = express.Router();
var usuariosModel = require("../../database/usuariosModel");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layoutAdmin",
  });
});

router.post("/", async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword;

    if (data != undefined) {
      req.session.id_user = data.ID;
      req.session.nombre = data.username;
      res.redirect("admin/");
    } else {
      res.render("admin/login", {
        layout: "admin/layoutAdmin",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
