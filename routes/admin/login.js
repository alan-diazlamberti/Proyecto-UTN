var express = require("express");
var router = express.Router();
var usuariosModel = require("../../database/usuariosModel");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layoutLogin",
  });
});

router.post("/", async (req, res, next) => {
  try {
    var usuario = req.body.username;
    var password = req.body.password;

    var data = await usuariosModel.getUserAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_user = data.ID;
      req.session.user = data.username;
      res.redirect("panel");
    } else {
      res.render("admin/login", {
        layout: "admin/layoutLogin",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
