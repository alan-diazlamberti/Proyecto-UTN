var express = require("express");
var router = express.Router();
var recetasModel = require("../../database/recetasModel");

router.get("/", async function (req, res, next) {
  var recetas = await recetasModel.getAllRecetas();
  res.render("admin/panel", {
    layout: "admin/layoutPanel",
    usuario: req.session.user,
    recetas,
  });
});

router.get("/edit/:ID", async function (req, res, next) {
  var ID = req.params.ID;
  var receta = await recetasModel.getRecetaByID(ID);
  res.render("admin/edit", {
    layout: "admin/layoutPanel",
    receta,
  });
});

router.post("/edit", async function (req, res, next) {
  try {
    let obj = {
      titulo: req.body.titulo,
      minutos: req.body.minutos,
      porciones: req.body.porciones,
      ingredientes: req.body.ingredientes,
      preparacion: req.body.preparacion,
    };

    if (
      req.body.titulo != "" &&
      req.body.minutos != "" &&
      req.body.porciones != "" &&
      req.body.ingredientes != "" &&
      req.body.preparacion != ""
    ) {
      await recetasModel.editRecetaByID(obj, req.body.ID);
      res.redirect("/admin/panel");
    } else {
      res.render("admin/edit", {
        layout: "admin/layoutPanel",
        error: true,
        errorMessage: "Todos los campos son requeridos.",
      });
    }
  } catch (error) {
    res.render("admin/edit", {
      layout: "admin/layoutPanel",
      error: true,
      errorMessage: "No se edito la receta",
    });
  }
});

router.get("/delete/:ID", async function (req, res, next) {
  var ID = req.params.ID;
  await recetasModel.deleteRecetaByID(ID);
  res.redirect("/admin/panel");
});

router.get("/new", async function (req, res, next) {
  res.render("admin/new", {
    layout: "admin/layoutPanel",
  });
});

router.post("/new", async function (req, res, next) {
  try {
    if (
      req.body.titulo != "" &&
      req.body.minutos != "" &&
      req.body.porciones != "" &&
      req.body.ingredientes != "" &&
      req.body.preparacion != ""
    ) {
      await recetasModel.addReceta(req.body);
      res.redirect("/admin/panel");
    } else {
      res.render("admin/new", {
        layout: "admin/layoutPanel",
        error: true,
        errorMessage: "Todos los campos son requeridos.",
      });
    }
  } catch (error) {
    res.render("/admin/new", {
      layout: "/admin/layoutPanel",
      error: true,
      errorMessage: "No se pudo crear la receta.",
    });
  }
});

module.exports = router;
