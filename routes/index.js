var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
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
