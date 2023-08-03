var express = require("express");
var router = express.Router();
var recetasModel = require("../../database/recetasModel");

router.get("/", async function (req, res, next) {
  var recetas = await recetasModel.getRecetas();
  res.render("admin/panel", {
    layout: "admin/layoutPanel",
    usuario: req.session.user,
    recetas,
  });
});

router.get("/eliminar/:ID", async function (req, res, next) {
  var ID = req.params.ID;
  await recetasModel.deleteRecetaByID(ID);
  res.redirect("/admin/panel");
});

module.exports = router;
