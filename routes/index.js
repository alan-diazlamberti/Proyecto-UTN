var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var recetasModel = require("../database/recetasModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  recetasCol1 = await recetasModel.getRecetasCol1();
  recetasCol2 = await recetasModel.getRecetasCol2();
  recetasCol3 = await recetasModel.getRecetasCol3();
  recetasCol4 = await recetasModel.getRecetasCol4();
  res.render("index", { recetasCol1, recetasCol2, recetasCol3, recetasCol4 });
});

router.post("/", async (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "alan.diazlamberti@gmail.com",
    subject: "Contacto desde AyM",
    html:
      "Nombre:" +
      " " +
      nombre +
      "</br> Email:" +
      " " +
      email +
      "</br> Mensaje:" +
      " " +
      mensaje,
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var info = await transport.sendMail(obj);

  res.render("index", {
    sucess: "Mensaje enviado correctamente!",
    scrollToSection: true,
  });
});

module.exports = router;
