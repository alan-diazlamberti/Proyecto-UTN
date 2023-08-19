var express = require("express");
var router = express.Router();

var recetasModel = require("../../database/recetasModel");

var cloudinary = require("cloudinary").v2;
var util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var page1;
  if (req.query.q === undefined) {
    page1 = await recetasModel.getRecetasPage1();
  } else {
    page1 = await recetasModel.searchReceta(req.query.q);
  }
  res.render("admin/panel", {
    layout: "admin/layoutPanel",
    usuario: req.session.user,
    page1,
    is_search: req.query.q !== undefined,
    q: req.query.q,
  });
});

router.get("/page/2", async function (req, res, next) {
  var page2;
  if (req.query.q === undefined) {
    page2 = await recetasModel.getRecetasPage2();
  } else {
    page2 = await recetasModel.searchReceta(req.query.q);
  }
  res.render("admin/page/2", {
    layout: "admin/layoutPanel",
    page2,
    is_search: req.query.q != undefined,
    q: req.query.q,
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
    let imagen_ID = req.body.imagen_original;
    let eliminar_imagen_vieja = false;
    if (req.body.eliminar_imagen === "1") {
      imagen_ID = null;
      eliminar_imagen_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        imagen_ID = (await uploader(imagen.tempFilePath)).public_id;
        eliminar_imagen_vieja = true;
      }
    }

    if (eliminar_imagen_vieja && req.body.imagen_original) {
      await destroy(req.body.imagen_original);
    }

    var obj = {
      titulo: req.body.titulo,
      minutos: req.body.minutos,
      porciones: req.body.porciones,
      ingredientes: req.body.ingredientes,
      preparacion: req.body.preparacion,
      imagen_ID,
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
    var imagen_ID = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      imagen_ID = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.titulo != "" &&
      req.body.minutos != "" &&
      req.body.porciones != "" &&
      req.body.ingredientes != "" &&
      req.body.preparacion != ""
    ) {
      await recetasModel.addReceta({
        ...req.body,
        imagen_ID,
      });
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
